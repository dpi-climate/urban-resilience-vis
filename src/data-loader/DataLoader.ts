import axios from "axios"

const serverUrl = import.meta.env.VITE_SERVER_URL as string

export abstract class DataLoader {
  static async getPolygonLayer(varId: string, timeStamp: string, sLevel: string) {
    const url = `${serverUrl}/polygon_layer`

    const response = await axios.get(url, {
      params: { var_name: varId, timeStamp: timeStamp, s_agg: sLevel },
      responseType: 'arraybuffer',
    })

    const buffer = response.data
    const dataView = new DataView(buffer)

    let offset = 0
      
      const numFeatures = dataView.getUint32(offset, true)
      offset += 4

      const minVal = dataView.getFloat32(offset, true)
      offset += 4

      const maxVal = dataView.getFloat32(offset, true)
      offset += 4
    
      const features = []
    
      for (let i = 0; i < numFeatures; i++) {
        // 2a) GEOID length
        const geoIdLen = dataView.getUint32(offset, true)
        offset += 4
    
        // 2b) GEOID bytes
        const geoIdBytes = new Uint8Array(buffer, offset, geoIdLen)
        offset += geoIdLen
        const geoId = new TextDecoder("utf-8").decode(geoIdBytes)
    
        // 2c) average_value (float32)
        const avgVal = dataView.getFloat32(offset, true)
        offset += 4
    
        // 2d) color (4 bytes)
        const r = dataView.getUint8(offset)
        const g = dataView.getUint8(offset + 1)
        const b = dataView.getUint8(offset + 2)
        const a = dataView.getUint8(offset + 3)
        offset += 4
    
        // 2e) geometry JSON length
        const geomLen = dataView.getUint32(offset, true)
        offset += 4
    
        // 2f) geometry bytes
        const geomBytes = new Uint8Array(buffer, offset, geomLen)
        offset += geomLen
    
        // parse geometry
        const geomStr = new TextDecoder("utf-8").decode(geomBytes)
        const geometry = JSON.parse(geomStr)
    
        features.push({
          UNITID: geoId,
          value: avgVal,
          color: [r, g, b, a],
          geometry: geometry,
        })
      }
    
    return {
      geojson: {
        type: "FeatureCollection",
          features: features.map((t) => ({
            type: "Feature",
            properties: {
              UNITID: t.UNITID,
              value: t.value,
              // color: t.color,
            },
            geometry: t.geometry,
          })),
        },
        minVal: minVal, 
        maxVal: minVal
      }
    }}