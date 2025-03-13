import {BitmapLayer} from '@deck.gl/layers'

function buildRasterTileLayer(timeStamp: number, id: string, fillOpacity: number) {
  return new BitmapLayer({
    id: 'BitmapLayer',
    // bounds: [-97.78, 34.894, -77.69, 48.57],
    // bounds: [-97.78048706054688, 34.89439392089844, -77.68508911132812, 48.56875991821289],
    bounds: [-91.5135183, 36.9699719, -87.4952139, 42.508347900000004],
    image: `http://localhost:5000/png_layer?timeStamp=${timeStamp}&varId=${id}`,
    pickable: true,
    onClick: d => console.log(d),
    opacity: fillOpacity
  })
}
  

export default buildRasterTileLayer
