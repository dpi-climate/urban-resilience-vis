import { ScatterplotLayer } from "@deck.gl/layers"
import { scaleQuantize } from 'd3-scale'
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'

const buildScatterLayer = (data:any) => {

  const colorScale = scaleQuantize<number[]>()
    .domain(domains["o3"])
    .range(colors["o3"])

  const scatterLayer = new ScatterplotLayer({
    id: 'scatter-plot',
    data: data.features,
    // radiusScale: 20,
    radiusMinPixels: 2,
    // getRadius: (d) => 20,
    getPosition: d => d.geometry.coordinates,
    getFillColor: (f): [number, number, number] => {
      const yearKey = "T2"//String(1980 + timeStamp)
      const value = f.properties[yearKey]
      return value === null || isNaN(value)
        ? [160, 160, 180]
        : (colorScale(value) as [number, number, number])
    },
  })

  return scatterLayer
}

export default buildScatterLayer