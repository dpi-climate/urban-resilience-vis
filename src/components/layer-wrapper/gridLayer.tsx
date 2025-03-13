import { ScatterplotLayer } from "@deck.gl/layers"
import * as d3 from "d3"
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'

const buildGridLayer = (data: any, id: string, timeStamp: number, handleClick: any, fillOpacity: number) => {

  const colorScale = typeof(colors[id]) === "string"
      ? d3.scaleSequential()
          .domain([0, 1])
          .interpolator((d3 as any)[colors[id]])
  
      : d3.scaleQuantize<number[]>()
          .domain(domains[id])
          .range(colors[id])

  const scatterLayer = new ScatterplotLayer({
    id: `grid-plot-${id}-${timeStamp}`,
    data: data.features,
    // getRadius: 500,
    getRadius: 10,
    radiusScale: 1,
    radiusMinPixels: 2,
    radiusMaxPixels: 500,

    getPosition: d => d.geometry.coordinates,
    
    getFillColor: (f): [number, number, number] | [number, number, number, number] => {
      const yearKey = String(timeStamp);
      const value = Number(f.properties[yearKey] ?? f.properties.value)

      if (value === null || isNaN(value)) {
        return [160, 160, 180]
        // return [0, 0, 0, 0]
      
      } else if (typeof colors[id] === "string") {
        const hexColor = (colorScale as d3.ScaleSequential<string>)(value) as string
        const { r, g, b } = d3.rgb(hexColor)
        return [r, g, b]
      
      } else {
        return colorScale(value) as [number, number, number]
      }
    },

    opacity: 1,//fillOpacity,
    pickable: true,
    stroked: false,

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

export default buildGridLayer