import {PathLayer} from '@deck.gl/layers';


export default function buildWindLayer(data: any, timeStamp: number, spatialLevel: string, fillOpacity: number) {
  // const arrowSizeInDegreesAtZoom0 = 0.03

  // function createArrowPath({speed, direction}) {
    
  //   const baseLength = arrowSizeInDegreesAtZoom0 * speed
  //   const length = baseLength / Math.pow(2, zoom)

  //   return [
  //     [0, 0],
  //     [length, 0],
  //     [length - 0.002, 0.002],
  //     [length, 0],
  //     [length - 0.002, -0.002]
  //   ]
  // }

  // const filteredFeatures = data.features 
  console.log(spatialLevel)
  const filteredFeatures =
    spatialLevel == "pt"
      ? data.features.filter((_, i) => i % 5 === 0)
      : spatialLevel == "co"
        ? data.features.filter((_, i) => i % 4 === 0)
        : spatialLevel == "ct"
          ? data.features.filter((_, i) => i % 2 === 0)
          : data.features

  const rate = spatialLevel == "pt"
    ? 0.02
    : spatialLevel == "co"
      ? 0.01
      : spatialLevel == "ct"
        ? 0.006
        : 0.003

  

  function createArrowPath({speed}) {  
    const length = speed * rate;
    return [
      [0, 0],
      [length, 0],
      [length - 0.002, 0.002], // arrowhead top
      [length, 0],
      [length - 0.002, -0.002] // arrowhead bottom
    ];
  }
  
  function rotatePath(path, angleDegrees) {
    const angle = (angleDegrees * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return path.map(([x, y]) => [
      x * cos - y * sin,
      x * sin + y * cos
    ]);
  }
  
  function translatePath(path, [originX, originY]) {
    return path.map(([x, y]) => [x + originX, y + originY]);
  }

  if (Object.keys(data).length > 0) {
    return new PathLayer({
      id: `wind-path-layer-${timeStamp}`,
      data: filteredFeatures,
      pickable: true,
      widthScale: 200,
      getPath: (feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        const {speed, direction} = feature.properties[String(timeStamp)];  
        const rawArrow = createArrowPath({
          speed: speed,
        });
        const rotatedArrow = rotatePath(rawArrow, direction);
  
        // Translate to the point’s location
        return translatePath(rotatedArrow, [longitude, latitude]);
      },
      getColor: () => [20, 0, 0],
      getWidth: 200 * rate,
      opacity: fillOpacity,
  
      updateTriggers: {
        // getPath: [zoom, timeStamp]
        getPath: [timeStamp, spatialLevel],
        getWidth: spatialLevel
      }
    })
  } else {
    return null
  }

}
