// 1) Debug
console.log("▶️ app.js loaded");

// 2) Image dimensions & zoom range
const imgW = 11000, imgH = 11000, maxZ = 6;

// 3) Compute the flat “world” bounds in pixel units
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);
const center = bounds.getCenter();

// 4) Initialize the map in CRS.Simple & immediately fit to bounds
const map = L.map('map', {
  crs:          L.CRS.Simple,
  minZoom:      0,
  maxZoom:      maxZ,
  zoomControl:  true,
  // this makes Leaflet clamp tile requests to only the area inside `bounds`
  maxBounds:    bounds,
  maxBoundsViscosity: 1.0
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds:", bounds);

// 5) Add your XYZ tiles, *with* the same bounds option
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  minZoom:         0,
  maxZoom:         maxZ,
  noWrap:          true,
  continuousWorld: false,
  bounds:          bounds,
  errorTileUrl:    ''    // blank instead of 404
}).addTo(map);

console.log("🖼️ tileLayer added");

// 6) (Optional) start zoomed in two levels
map.setView(center, 2);
console.log("🔍 zoomed in to level 2 at", center);