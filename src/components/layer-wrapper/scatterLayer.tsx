import { ScatterplotLayer } from "@deck.gl/layers"
import * as d3 from "d3"
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'

const buildScatterLayer = (data: any, id: string, timeStamp: number, handleClick: any, fillOpacity: number) => {

  const colorScale = typeof(colors[id]) === "string"      
      ? d3.scaleSequential()
          .domain([0, 1])
          .interpolator((d3 as any)[colors[id]])
  
      : d3.scaleQuantize<number[]>()
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
      const yearKey = String(timeStamp);
      const value = Number(f.properties[yearKey] ?? f.properties.value)

      if (value === null || isNaN(value)) {
        return [160, 160, 180]
      
      } else if (typeof colors[id] === "string") {
        const hexColor = (colorScale as d3.ScaleSequential<string>)(value) as string
        const { r, g, b } = d3.rgb(hexColor)
        return [r, g, b]
      
      } else {
        return colorScale(value) as [number, number, number]
      }
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