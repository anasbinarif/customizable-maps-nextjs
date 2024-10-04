export const haversineDistance = (loc1, loc2) => {
  const R = 3958.8;
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const dLat = toRadians(loc2.lat - loc1.lat);
  const dLon = toRadians(loc2.lng - loc1.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(loc1.lat)) *
      Math.cos(toRadians(loc2.lat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const getMarkerIcon = (color, scale) => {
  if (!color) return null;

  return {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 3.25 2.83 7.44 7.11 11.54.49.47 1.29.47 1.78 0C16.17 16.44 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 1,
    scale: scale,
    anchor: new window.google.maps.Point(12, 24),
  };
};
