// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Your image’s pixel size and max zoom
const imgW = 11000;
const imgH = 11000;
const maxZ = 6;

// 2) Define the map bounds in Leaflet's top-left origin format
const bounds = L.latLngBounds([imgH, 0], [0, imgW]);

// 3) Init the map, snap zooms to integers, and fit to those bounds
const map = L.map('map', {
  crs:        L.CRS.Simple,
  minZoom:    0,
  maxZoom:    maxZ,
  zoomSnap:   1,
  zoomDelta:  1,
  zoomControl:true
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds:", bounds);

// 4) Add your XYZ tiles, constrain to bounds
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  bounds:           bounds,
  noWrap:           true,
  continuousWorld:  false,
  minZoom:          0,
  maxZoom:          maxZ,
  errorTileUrl:     ''
}).addTo(map);

console.log("🖼️ tileLayer added");

// 5) (Optional) debug tile loads
map.on('tileload',  e => console.log("✅", e.tile.src));
map.on('tileerror', e => console.warn("❌", e.tile.src));