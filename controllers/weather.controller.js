import fetch from "node-fetch";

const BASE_URL = process.env.WEATHERLINK_BASE_URL;
const API_KEY = process.env.WEATHERLINK_API_KEY;
const API_SECRET = process.env.WEATHERLINK_API_SECRET;

/**
 * Consultar todas las estaciones
 */
export const getStations = async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/stations?api-key=${API_KEY}`, {
      headers: {
        "X-Api-Secret": API_SECRET,
      },
    });

    const data = await response.json();

    //  Limpieza 
    const clean = data.stations?.map((station) => ({
      station_id: station.station_id,
      name: station.station_name,
    }));

    res.json(clean);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo estaciones" });
  }
};


/**
 * Obtener datos actuales por estación
 */
export const getCurrentByStation = async (req, res) => {
  try {
    const { stationId } = req.params;

    const response = await fetch(
      `${BASE_URL}/current/${stationId}?api-key=${API_KEY}`,
      {
        headers: {
          "X-Api-Secret": API_SECRET,
        },
      }
    );

    const data = await response.json();

    //  Extraer datos reales
    const sensorClima = data.sensors.find(s => s.sensor_type === 50);
    const sensorBar = data.sensors.find(s => s.sensor_type === 242);

    const clima = sensorClima?.data[0];
    const bar = sensorBar?.data[0];

    // Transformación limpia
    const result = {
      temperatura: `${clima?.temp} °F`,
      humedad: `${Math.round(clima?.hum)} %`,
      viento: `${Math.round(clima?.wind_speed_last)} mph ${getWindDirection(clima?.wind_dir_last)} (${clima?.wind_dir_last}°)`,
      barometro: `${bar?.bar_sea_level?.toFixed(2)} inHg (${getBarTrend(bar?.bar_trend)})`,
      lluvia: `${clima?.rainfall_day_in?.toFixed(2)} in`,
    };

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo datos de estación" });
  }
};


/**
 * Helpers
 */
function getWindDirection(deg) {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function getBarTrend(trend) {
  if (trend > 0.02) return "Subiendo";
  if (trend < -0.02) return "Bajando";
  return "Estable";
}