// file: controllers/geoserver.controller.js
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
    const workspaces = data.workspaces.workspace || [];

    const workspace = workspaces.find(ws => ws.name === "wms_catastro");

if (!workspace) {
  return res.status(404).json({
    success: false,
    message: "Workspace wms_catastro no encontrado"
  });
}

res.json({
  success: true,
  workspace: {
    name: workspace.name,
    href: workspace.href
  }
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

    const layers = result?.WMS_Capabilities?.Capability?.[0]?.Layer || 
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
        const layerArray = Array.isArray(node.Layer) ? node.Layer : [node.Layer];
        layerArray.forEach(layer => extractWorkspaces(layer));
      }
    };

    if (Array.isArray(layers)) {
      layers.forEach(layer => extractWorkspaces(layer));
    } else if (layers) {
      extractWorkspaces(layers);
    }

    const workspaceName = "wms_catastro";

if (!workspacesSet.has(workspaceName)) {
  return res.status(404).json({
    success: false,
    message: "Workspace wms_catastro no encontrado (GetCapabilities)"
  });
}

res.json({
  success: true,
  workspace: {
    name: workspaceName,
    href: `${geoserverHost}/rest/workspaces/${workspaceName}`
  },
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
export const listLayers = async (req, res) => {
  try {
    const { workspace } = req.params; 
    const geoserverHost = process.env.GEOSERVER_HOST;

    if (!geoserverHost) {
      return res.status(500).json({ error: "GeoServer no está configurado" });
    }

    if (!workspace) {
      return res.status(400).json({ error: "Workspace no especificado" });
    }

    const url = `${geoserverHost}/wms?service=WMS&version=1.1.1&request=GetCapabilities`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Error al consultar GeoServer: ${response.status} ${response.statusText}` 
      });
    }

    const xml = await response.text();

    const parser = new xml2js.Parser({ 
      explicitArray: true,
      mergeAttrs: true,
      explicitRoot: false
    });
    
    const result = await parser.parseStringPromise(xml);
    const layers = [];

    const findLayers = (node) => {
      if (!node) return;

      if (node.Name && node.Title) {
        const name = Array.isArray(node.Name) ? node.Name[0] : node.Name;
        const title = Array.isArray(node.Title) ? node.Title[0] : node.Title;
        
        if (name && name.startsWith(`${workspace}:`)) {
          layers.push({ 
            name: name.replace(`${workspace}:`, ''),
            fullName: name,
            title: title || 'Sin título',
            workspace: workspace
          });
        }
      }

      const subLayers = node.Layer || node.layer;
      if (subLayers) {
        const layerArray = Array.isArray(subLayers) ? subLayers : [subLayers];
        layerArray.forEach(layer => findLayers(layer));
      }
    };

    const possiblePaths = [
      result?.WMS_Capabilities?.Capability?.[0]?.Layer,
      result?.WMT_MS_Capabilities?.Capability?.[0]?.Layer,
      result?.Capability?.[0]?.Layer,
      result?.Layer
    ];

    for (const path of possiblePaths) {
      if (path) {
        const layerArray = Array.isArray(path) ? path : [path];
        layerArray.forEach(layer => findLayers(layer));
        break;
      }
    }


    if (layers.length === 0) {
      const traverseObject = (obj) => {
        if (!obj || typeof obj !== 'object') return;

        if (obj.Name && obj.Title) {
          const name = Array.isArray(obj.Name) ? obj.Name[0] : obj.Name;
          const title = Array.isArray(obj.Title) ? obj.Title[0] : obj.Title;
          
          if (name && name.startsWith(`${workspace}:`)) {
            layers.push({ 
              name: name.replace(`${workspace}:`, ''),
              fullName: name,
              title: title || 'Sin título',
              workspace: workspace
            });
          }
        }
        
        Object.values(obj).forEach(value => {
          if (Array.isArray(value)) {
            value.forEach(item => traverseObject(item));
          } else if (typeof value === 'object') {
            traverseObject(value);
          }
        });
      };
      
      traverseObject(result);
    }

    if (layers.length === 0) {
      return res.status(404).json({ 
        error: "No se encontraron capas para el workspace especificado",
        workspace,
        suggestion: "Verifica que el workspace exista y tenga capas publicadas"
      });
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
    const url = `${geoserverHost}/wms?service=WMS&version=1.1.1&request=GetCapabilities`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Error al consultar GeoServer: ${response.status} ${response.statusText}` 
      });
    }

    const xml = await response.text();
    const parser = new xml2js.Parser({ explicitArray: true });
    const result = await parser.parseStringPromise(xml);

    const allLayers = [];
    const workspacesMap = {};

    const findLayers = (node) => {
      if (!node) return;

      if (node.Name && node.Title) {
        const name = Array.isArray(node.Name) ? node.Name[0] : node.Name;
        const title = Array.isArray(node.Title) ? node.Title[0] : node.Title;
        
        if (name && name.includes(':')) {
          const [workspace, layerName] = name.split(':');
          
          if (!workspacesMap[workspace]) {
            workspacesMap[workspace] = [];
          }
          
          workspacesMap[workspace].push({
            name: layerName,
            fullName: name,
            title: title || 'Sin título',
            workspace: workspace
          });
        }
      }

      const subLayers = node.Layer || node.layer;
      if (subLayers) {
        const layerArray = Array.isArray(subLayers) ? subLayers : [subLayers];
        layerArray.forEach(layer => findLayers(layer));
      }
    };

    const possiblePaths = [
      result?.WMS_Capabilities?.Capability?.[0]?.Layer,
      result?.WMT_MS_Capabilities?.Capability?.[0]?.Layer,
      result?.Capability?.[0]?.Layer,
      result?.Layer
    ];

    for (const path of possiblePaths) {
      if (path) {
        const layerArray = Array.isArray(path) ? path : [path];
        layerArray.forEach(layer => findLayers(layer));
        break;
      }
    }

    const workspaces = Object.keys(workspacesMap).map(workspaceName => ({
      name: workspaceName,
      layers: workspacesMap[workspaceName],
      layerCount: workspacesMap[workspaceName].length
    }));


    workspaces.sort((a, b) => a.name.localeCompare(b.name));

    Object.values(workspacesMap).forEach(layerArray => {
      allLayers.push(...layerArray);
    });

    res.json({
      success: true,
      totalWorkspaces: workspaces.length,
      totalLayers: allLayers.length,
      workspaces,
      allLayers
    });

  } catch (err) {
    console.error("Error listAllLayers:", err);
    res.status(500).json({ 
      error: "Error al listar todas las capas",
      details: err.message 
    });
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

    if (!geoserverHost) {
      return res.status(500).json({ error: "GeoServer no está configurado" });
    }

    const url = `${geoserverHost}/${workspace}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${workspace}:${encodeURIComponent(layer)}&outputFormat=application/json`;

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
    res.json(data);

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
      return res.status(400).json({ 
        error: "Debes especificar workspace y capa" 
      });
    }

    if (!geoserverHost) {
      return res.status(500).json({ error: "GeoServer no está configurado" });
    }

    const queryParams = new URLSearchParams(req.query);

    if (!queryParams.has("request")) {
      queryParams.set("service", "WMS");
      queryParams.set("version", "1.1.1");
      queryParams.set("request", "GetCapabilities");

      const url = `${geoserverHost}/${workspace}/wms?${queryParams.toString()}`;
      const response = await fetch(url);
      const xml = await response.text();
      return res.type("application/xml").send(xml);
    }

    const requestType = queryParams.get("request");


    if (requestType === "GetMap") {
      queryParams.set("layers", `${workspace}:${layer}`);
    }


    if (requestType === "GetFeatureInfo") {
      queryParams.set("layers", `${workspace}:${layer}`);
      queryParams.set("query_layers", `${workspace}:${layer}`);
      queryParams.set("info_format", "application/json");
    }


    const url = `${geoserverHost}/${workspace}/wms?${queryParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }


    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);

    if (contentType?.includes("image")) {
      const buffer = Buffer.from(await response.arrayBuffer());
      return res.send(buffer);
    }

    const text = await response.text();
    return res.send(text);

  } catch (error) {
    console.error("Error WMS:", error);
    res.status(500).json({ 
      error: "Error al procesar petición WMS",
      details: error.message 
    });
  }
};