import { IconLayer } from "@deck.gl/layers"


const buildIconLayer = () => {
    return new IconLayer({
        id: 'IconLayer',
        data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
        getColor: (d) => [Math.sqrt(d.exits), 140, 0],
        getIcon: (d) => 'marker',
        getPosition: (d) => d.coordinates,
        getSize: 40,
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
        pickable: true
      }) 
}

export default buildIconLayer