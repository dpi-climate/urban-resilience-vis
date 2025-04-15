import { GeoJsonLayer } from '@deck.gl/layers'

const buildRouteLayer = (routeGeojson: any) => {
  return new GeoJsonLayer({
    id: 'routeLayer',
    data: routeGeojson,

    stroked: true,
    filled: false,
    
    getLineColor: [0, 56, 255],
    getLineWidth: 8,
    
    lineWidthScale: 1,
    lineWidthMinPixels: 8,
    
    pickable: false,
  })
}

export default buildRouteLayer