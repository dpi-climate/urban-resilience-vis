import { GeoJsonLayer } from '@deck.gl/layers'
import * as d3 from "d3"
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'
// import { PickingInfo } from 'deck.gl'

const buildPolygonLayer = (
    data: any, 
    id: string, 
    timeStamp: number, 
    handleClick: any, 
    fillOpacity: number, 
    strokeOpacity: number,
    selectedFeature: any,
  ) => {
  
  const colorScale = typeof(colors[id]) === "string"
    ? d3.scaleSequential()
        .domain([0, 1])
        .interpolator((d3 as any)[colors[id]])

    : d3.scaleQuantize<number[]>()
        .domain(domains[id])
        .range(colors[id])
    
  // const tooltip: HTMLDivElement = document.createElement('div');
  // tooltip.style.position = 'absolute';
  // tooltip.style.zIndex = 9999;
  // tooltip.style.pointerEvents = 'none';
  // document.body.append(tooltip)

  // function updateTooltip({object, x, y}: PickingInfo<DataType>) {
  //   if (object) {
  //     tooltip.style.display = 'block';
  //     tooltip.style.left = `${x}px`;
  //     tooltip.style.top = `${y}px`;
  //     tooltip.innerText = `Unit ID: ${object.properties["UNITID"]} value: ${object.properties[String(timeStamp)]}`;
  //   } else {
  //     tooltip.style.display = 'none';
  //   }
  // }

  return new GeoJsonLayer({
    id: `GeoJsonLayer-${id}`,
    data: data,
    stroked: true,
    filled: true,
    pointType: 'circle+text',
    pickable: true,


    getFillColor: (f): [number, number, number] => {
      const yearKey = String(timeStamp)
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
    
    getLineColor: (f) => {
      return String(selectedFeature) === String(f.properties.UNITID) ? [52, 235, 36, 255] : [0, 0, 0, 150 * strokeOpacity]
    },
    getLineWidth: (f) => {
      return String(selectedFeature) === String(f.properties.UNITID) ? 5.0 : 0.8
    },

    lineWidthMinPixels: 0,
    lineWidthUnits: 'pixels',

    autoHighlight: true, 
    onClick: (d) => { handleClick(d.object.properties)},
    // onHover: updateTooltip,//(d) => console.log(d.object.properties),

    updateTriggers: {
      getFillColor: timeStamp,
      getLineColor: [strokeOpacity, selectedFeature],
      getLineWidth: selectedFeature
    },
  })
}

export default buildPolygonLayer

