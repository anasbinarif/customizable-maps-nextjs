function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const h =
    max === min
      ? 0
      : max === r
      ? (60 * ((g - b) / (max - min)) + 360) % 360
      : max === g
      ? 60 * ((b - r) / (max - min)) + 120
      : 60 * ((r - g) / (max - min)) + 240;
  const l = (max + min) / 2;
  const s =
    max === min ? 0 : (max - min) / (l > 0.5 ? 2 - max - min : max + min);

  return { h, s, l };
}

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function adjustToNeon(r, g, b) {
  const { h, s, l } = rgbToHsl(r, g, b);
  const neonSaturation = Math.min(100, s * 1.5);
  const neonLightness = Math.min(100, l * 1.5);

  return hslToRgb(h, neonSaturation, neonLightness);
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function generateTextColor(pastelColor) {
  const { r, g, b } = hexToRgb(pastelColor);
  const neonColor = adjustToNeon(r, g, b);

  return rgbToHex(neonColor.r, neonColor.g, neonColor.b);
}
