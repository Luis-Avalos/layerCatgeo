
import fetch from "node-fetch";
import xml2js from "xml2js";

//  get Todos los workspaces
export const listWorkspaces = async (req, res) => {
  try {
    const geoserverHost = process.env.GEOSERVER_HOST;

    if (!geoserverHost) {
      return res.status(500).json({ error: "GeoServer no está configurado" });
    }

    const url = `${geoserverHost}/rest/workspaces`;

    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(
          `${process.env.GEOSERVER_USER}:${process.env.GEOSERVER_PASSWORD}`
        ).toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    
    if (!response.ok) {
      return await getWorkspacesFromCapabilities(req, res);
    }

    const data = await response.json();

    const workspaces = data?.workspaces?.workspace || [];

    
    const formatted = workspaces.map(ws => ({
      name: ws.name,
      href: ws.href
    }));

    res.json({
      success: true,
      total: formatted.length,
      workspaces: formatted
    });

  } catch (err) {
    console.error("Error listWorkspaces:", err);
    await getWorkspacesFromCapabilities(req, res);
  }
};

const getWorkspacesFromCapabilities = async (req, res) => {
  try {
    const geoserverHost = process.env.GEOSERVER_HOST;
    const url = `${geoserverHost}/wms?service=WMS&version=1.1.1&request=GetCapabilities`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al consultar GeoServer: ${response.status}`);
    }

    const xml = await response.text();
    const parser = new xml2js.Parser({ explicitArray: true });
    const result = await parser.parseStringPromise(xml);

    const layers =
      result?.WMS_Capabilities?.Capability?.[0]?.Layer ||
      result?.WMT_MS_Capabilities?.Capability?.[0]?.Layer ||
      result?.Capability?.[0]?.Layer ||
      result?.Layer;

    const workspacesSet = new Set();

    const extractWorkspaces = (node) => {
      if (!node) return;

      if (node.Name && Array.isArray(node.Name)) {
        const name = node.Name[0];

        if (name && name.includes(':')) {
          const workspace = name.split(':')[0];
          workspacesSet.add(workspace);
        }
      }

      if (node.Layer) {
        const layerArray = Array.isArray(node.Layer)
          ? node.Layer
          : [node.Layer];

        layerArray.forEach(layer => extractWorkspaces(layer));
      }
    };

    if (Array.isArray(layers)) {
      layers.forEach(layer => extractWorkspaces(layer));
    } else if (layers) {
      extractWorkspaces(layers);
    }

    
    const workspaces = Array.from(workspacesSet).map(name => ({
      name,
      href: `${geoserverHost}/rest/workspaces/${name}`
    }));

    res.json({
      success: true,
      total: workspaces.length,
      workspaces,
      source: "GetCapabilities"
    });

  } catch (err) {
    console.error("Error getWorkspacesFromCapabilities:", err);

    res.status(500).json({
      error: "Error al listar workspaces",
      details: err.message
    });
  }
};

//listar layers por workspace
//listar layers por workspace
export const listLayers = async (req, res) => {
  try {
    const { workspace } = req.params;
    const geoserverHost = process.env.GEOSERVER_HOST;

    if (!geoserverHost) {
      return res.status(500).json({ error: "GeoServer no está configurado" });
    }

    const auth = "Basic " + Buffer.from(
      `${process.env.GEOSERVER_USER}:${process.env.GEOSERVER_PASSWORD}`
    ).toString("base64");

    // 1. Listar datastores del workspace
    const dsUrl = `${geoserverHost}/rest/workspaces/${workspace}/datastores.json`;
    const dsRes = await fetch(dsUrl, { headers: { Authorization: auth } });

    if (!dsRes.ok) {
      return res.status(dsRes.status).json({
        error: `Error listando datastores: ${dsRes.status}`,
        workspace
      });
    }

    const dsData = await dsRes.json();
    const datastores = dsData?.dataStores?.dataStore || [];

    if (datastores.length === 0) {
      return res.json({ success: true, count: 0, workspace, layers: [] });
    }

    // 2. Para cada datastore, listar featuretypes
    const layers = [];

    for (const ds of datastores) {
      const ftUrl = `${geoserverHost}/rest/workspaces/${workspace}/datastores/${ds.name}/featuretypes.json`;
      const ftRes = await fetch(ftUrl, { headers: { Authorization: auth } });

      if (!ftRes.ok) {
        console.warn(`No se pudieron leer featuretypes de ${ds.name}`);
        continue;
      }

      const ftData = await ftRes.json();
      const featureTypes = ftData?.featureTypes?.featureType || [];

      for (const ft of featureTypes) {
        layers.push({
          name: ft.name,
          fullName: `${workspace}:${ft.name}`,
          title: ft.name,   // REST no da título directamente
          workspace
        });
      }
    }

    layers.sort((a, b) => a.name.localeCompare(b.name));

    res.json({
      success: true,
      count: layers.length,
      workspace,
      layers
    });

  } catch (err) {
    console.error("Error listLayers:", err);
    res.status(500).json({
      error: "Error al listar capas",
      details: err.message
    });
  }
};
//listar capas de los workspaces
export const listAllLayers = async (req, res) => {
  try {
    const geoserverHost = process.env.GEOSERVER_HOST;

    const auth = "Basic " + Buffer.from(
      `${process.env.GEOSERVER_USER}:${process.env.GEOSERVER_PASSWORD}`
    ).toString("base64");

    // 1. Todos los workspaces
    const wsRes = await fetch(`${geoserverHost}/rest/workspaces.json`, {
      headers: { Authorization: auth }
    });

    if (!wsRes.ok) {
      return res.status(wsRes.status).json({ error: "Error listando workspaces" });
    }

    const wsData = await wsRes.json();
    const workspaces = wsData?.workspaces?.workspace || [];

    const result = [];
    let totalLayers = 0;

    for (const ws of workspaces) {
      // datastores
      const dsRes = await fetch(
        `${geoserverHost}/rest/workspaces/${ws.name}/datastores.json`,
        { headers: { Authorization: auth } }
      );
      if (!dsRes.ok) continue;

      const dsData = await dsRes.json();
      const datastores = dsData?.dataStores?.dataStore || [];

      const wsLayers = [];

      for (const ds of datastores) {
        const ftRes = await fetch(
          `${geoserverHost}/rest/workspaces/${ws.name}/datastores/${ds.name}/featuretypes.json`,
          { headers: { Authorization: auth } }
        );
        if (!ftRes.ok) continue;

        const ftData = await ftRes.json();
        const fts = ftData?.featureTypes?.featureType || [];

        for (const ft of fts) {
          wsLayers.push({
            name: ft.name,
            fullName: `${ws.name}:${ft.name}`,
            title: ft.name,
            workspace: ws.name
          });
        }
      }

      wsLayers.sort((a, b) => a.name.localeCompare(b.name));
      totalLayers += wsLayers.length;

      result.push({
        name: ws.name,
        layers: wsLayers,
        layerCount: wsLayers.length
      });
    }

    result.sort((a, b) => a.name.localeCompare(b.name));

    res.json({
      success: true,
      totalWorkspaces: result.length,
      totalLayers,
      workspaces: result,
      allLayers: result.flatMap(w => w.layers)
    });

  } catch (err) {
    console.error("Error listAllLayers:", err);
    res.status(500).json({ error: err.message });
  }
};

// WFS
export const getWFS = async (req, res) => {
  try {
    const { workspace, layer } = req.params;

    if (!workspace || !layer) {
      return res.status(400).json({
        error: "Debes especificar workspace y capa"
      });
    }

    const geoserverHost = process.env.GEOSERVER_HOST;

    const url = `${geoserverHost}/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=${workspace}:${layer}&outputFormat=application/json`;

    console.log("WFS URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error WFS para ${workspace}:${layer}:`, response.status, errorText);
      return res.status(response.status).json({
        error: "No se pudo obtener el WFS",
        details: errorText.substring(0, 200)
      });
    }

    const data = await response.json();
    return res.json(data);

  } catch (error) {
    console.error("Error WFS:", error);
    res.status(500).json({
      error: "Error al obtener datos WFS",
      details: error.message
    });
  }
};

//WMS
export const getWMS = async (req, res) => {
  try {
    const { workspace, layer } = req.params;
    const geoserverHost = process.env.GEOSERVER_HOST;

    if (!workspace || !layer) {
      return res.status(400).json({ error: "Workspace y capa requeridos" });
    }

    const queryParams = new URLSearchParams(req.query);

    const requestType =
      queryParams.get("REQUEST") ||
      queryParams.get("request");

    if (!requestType) {
      queryParams.set("SERVICE", "WMS");
      queryParams.set("VERSION", "1.1.1");
      queryParams.set("REQUEST", "GetCapabilities");
    }

    if (
    requestType?.toUpperCase() === "GETMAP" &&
      !queryParams.has("LAYERS")
    ) {
      queryParams.set("LAYERS", `${workspace}:${layer}`);
    }

    const url = `${geoserverHost}/${workspace}/wms?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        'Accept-Encoding': 'identity' 
      }
    });

    res.status(response.status);

    response.headers.forEach((value, name) => {
      if (name.toLowerCase() !== 'content-encoding') {
        res.setHeader(name, value);
      }
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);

  } catch (err) {
    console.error("WMS proxy error:", err);
    res.status(500).json({ error: "Error proxy WMS" });
  }
};
