import { GeoJsonLayer } from '@deck.gl/layers'
import { scaleQuantize } from 'd3-scale'
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
    setSelectedFeature: any
  ) => {
  
  const colorScale = scaleQuantize<number[]>()
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
      const value = f.properties[yearKey] || f.properties.value
      return value === null || isNaN(value)
        ? [160, 160, 180]
        : (colorScale(value) as [number, number, number])
    },
    opacity: fillOpacity,
    
    getLineColor: () => {
      return [0, 0, 0, 150 * strokeOpacity]
    },
    lineWidthMinPixels: 0.8,
    autoHighlight: true, 
    onClick: (d) => { handleClick(d.object.properties) },
    // onHover: updateTooltip,//(d) => console.log(d.object.properties),

    updateTriggers: {
      getFillColor: timeStamp,
      getLineColor: [strokeOpacity, selectedFeature]
    },
  })
}

export default buildPolygonLayer

