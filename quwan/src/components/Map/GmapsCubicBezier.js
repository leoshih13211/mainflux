function GmapsCubicBezier(
  startPoint,
  controlPoint1,
  controlPoint2,
  endPoint,
  resolution,
) {
  const points = [];
  for (let it = 0; it <= 100; it += resolution) {
    points.push(this.getBezier(
      { x: startPoint.lat, y: startPoint.lng },
      { x: controlPoint1.lat, y: controlPoint1.lng },
      { x: controlPoint2.lat, y: controlPoint2.lng },
      { x: endPoint.lat, y: endPoint.lng },
      (it / 100).toFixed(2),
    ));
  }

  return points;
}

GmapsCubicBezier.prototype = {

  B1(t) { return t * t * t; },
  B2(t) { return 3 * t * t * (1 - t); },
  B3(t) { return 3 * t * (1 - t) * (1 - t); },
  B4(t) { return (1 - t) * (1 - t) * (1 - t); },
  getBezier(C1, C2, C3, C4, percent) {
    const pos = {};
    pos.lat = (C1.x * this.B1(percent)) +
        (C2.x * this.B2(percent)) +
        (C3.x * this.B3(percent)) +
        (C4.x * this.B4(percent));

    pos.lng = (C1.y * this.B1(percent)) +
        (C2.y * this.B2(percent)) +
        (C3.y * this.B3(percent)) +
        (C4.y * this.B4(percent));
    return pos;
  },
};

export default GmapsCubicBezier;

