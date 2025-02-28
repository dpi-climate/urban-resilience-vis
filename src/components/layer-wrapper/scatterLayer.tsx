import { ScatterplotLayer } from "@deck.gl/layers"
import { scaleQuantize } from 'd3-scale'
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'

const buildScatterLayer = (data: any, id: string, timeStamp: number, handleClick: any, fillOpacity: number, strokeOpacity: number) => {

  const colorScale = scaleQuantize<number[]>()
    .domain(domains[id])
    .range(colors[id])

  const scatterLayer = new ScatterplotLayer({
    id: 'scatter-plot',
    data: data.features,

    radiusMinPixels: 2,
    radiusMaxPixels: 2,
    // radiusScale: 20,
    // radiusMinPixels: 2,
    // getRadius: (d) => 20,
    getPosition: d => d.geometry.coordinates,
    
    getFillColor: (f): [number, number, number] => {
      const yearKey = String(timeStamp)
      const value = f.properties[yearKey] || f.properties.value
      return value === null || isNaN(value)
        ? [160, 160, 180]
        : (colorScale(value) as [number, number, number])
    },

    opacity: fillOpacity,

    updateTriggers: {
      getFillColor: timeStamp,
      getLineColor: strokeOpacity
    },
  })

  return scatterLayer
}

export default buildScatterLayer