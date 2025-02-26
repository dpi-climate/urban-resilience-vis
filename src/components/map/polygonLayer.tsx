import { GeoJsonLayer } from '@deck.gl/layers'
import { scaleQuantize } from 'd3-scale'
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'

const buildPolygonLayer = (data: any, id: string, timeStamp: number, handleClick: any, fillOpacity: number, strokeOpacity: number) => {
  const colorScale = scaleQuantize<number[]>()
    .domain(domains[id])
    .range(colors[id])

  return new GeoJsonLayer({
    id: `GeoJsonLayer-${id}`,
    data: data,
    stroked: true,
    filled: true,
    pointType: 'circle+text',
    pickable: true,

    // getFillColor: (f) => {
    //   const yearKey = String(1980 + timeStamp)
    //   const value = f.properties[yearKey]
    //   if (value === null || isNaN(value)) return [160, 160, 180, 200]
    //   return colorScale(value).concat(Math.floor(255 * fillOpacity))
    // },
    getFillColor: (f): [number, number, number] => {
      const yearKey = String(1980 + timeStamp)
      const value = f.properties[yearKey]
      return value === null || isNaN(value)
        ? [160, 160, 180]
        : (colorScale(value) as [number, number, number])
    },
    opacity: fillOpacity,
    

    getLineColor: () => [0, 0, 0, 150 * strokeOpacity],
    lineWidthMinPixels: 0.8,
    autoHighlight: true, 
    onClick: (info) => {console.log(info); handleClick(true)},

    updateTriggers: {
      getFillColor: timeStamp,
    },
  })
}

export default buildPolygonLayer

