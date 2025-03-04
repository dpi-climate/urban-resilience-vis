import { ScatterplotLayer } from "@deck.gl/layers"
import { scaleQuantize } from 'd3-scale'
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'

const buildScatterLayer = (data: any, id: string, timeStamp: number, handleClick: any, fillOpacity: number) => {

  const colorScale = scaleQuantize<number[]>()
    .domain(domains[id])
    .range(colors[id])

  const scatterLayer = new ScatterplotLayer({
    id: 'scatter-plot',
    data: data.features,
    getRadius: 10,
      radiusScale: 0.001,
      radiusMinPixels: 5,
      radiusMaxPixels: 1000,
    // radiusMinPixels: 2,
    // radiusMaxPixels: 2,
    // radiusScale: 20,

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
    pickable: true,

    onClick: d => {
      // console.log(d)
      // console.log(d.object.properties)
      handleClick(d.object.properties)

    },

    updateTriggers: {
      getFillColor: timeStamp,
    },
  })

  return scatterLayer
}

export default buildScatterLayer