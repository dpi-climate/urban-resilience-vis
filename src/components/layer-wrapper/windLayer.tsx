import {PathLayer} from '@deck.gl/layers';


function createArrowPath({speed, direction}) {
  // Scale arrow length by wind speed
  const length = speed * 0.01;
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

export default function buildWindLayer(data: any, timeStamp: number) {
  return new PathLayer({
    id: 'wind-path-layer',
    data: data.features,
    pickable: true,
    widthScale: 200,
    getPath: (feature) => {
      // Read geometry + properties from the feature
      const [longitude, latitude] = feature.geometry.coordinates;
      const {speed, direction} = feature.properties[String(timeStamp)];

      // Build arrow geometry
      const rawArrow = createArrowPath({
        speed: speed,
        direction: direction
      });
      const rotatedArrow = rotatePath(rawArrow, direction);

      // Translate to the point’s location
      return translatePath(rotatedArrow, [longitude, latitude]);
    },
    getColor: (feature) => {
      // You can color by speed, direction, etc.
      // For simplicity, we’ll just return red here
      return [20, 0, 0];
    },
    getWidth: 2,

    updateTriggers: {
      getPath: timeStamp
    }
  });
}
