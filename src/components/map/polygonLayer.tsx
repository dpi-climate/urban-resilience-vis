import { GeoJsonLayer } from '@deck.gl/layers';
import { scaleQuantize } from 'd3-scale';
import { colors } from '../../utils/colors';
import { domains } from '../../utils/domains';




const buildPolygonLayer = (data: any, id: string, timeStamp: number) => {
  const colorScale = scaleQuantize()
    .domain(domains[id])
    .range(colors[id])

  return new GeoJsonLayer({
      id: 'GeoJsonLayer',
      data: data,

      stroked: true,
      filled: true,
      pointType: 'circle+text',
      pickable: true,

      getFillColor: (f) => {
        // const value = f.properties.values[timeStamp]
        const t = `${1980+timeStamp}`
        const value = f.properties[t]

        if (value === null || isNaN(value)) return [160, 160, 180, 200]
        return colorScale(value).concat(Math.floor(255 * 1))
        // return [160, 160, 180, 200]
      },
      getLineColor: () => [0, 0, 0, Math.floor(150 * 1)],
      lineWidthMinPixels: 0.8,
      autoHighlight: true, 
  });
};

export default buildPolygonLayer;

