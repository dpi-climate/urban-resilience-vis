import { ScatterplotLayer } from "@deck.gl/layers"


const buildScatterLayer = () => {
  const MALE_COLOR = [0, 128, 255]
  const FEMALE_COLOR = [255, 0, 128]

  const scatterLayer = new ScatterplotLayer({
    id: 'scatter-plot',
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json',
    radiusScale: 10,
    radiusMinPixels: 0.5,
    getPosition: d => [d[0], d[1], 0],
    getFillColor: d => (d[2] === 1 ? MALE_COLOR : FEMALE_COLOR)
  })

  return scatterLayer
}

export default buildScatterLayer