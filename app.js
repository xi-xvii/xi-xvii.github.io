// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Image size in pixels
const imgW = 11000;
const imgH = 11000;
const maxZ = 6;

// 2) Define bounds in pixel space (bottom-left origin)
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 3) Init the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds:", bounds);

// 4) Add XYZ tile layer
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap: true,
  minZoom: 0,
  maxZoom: maxZ,
  bounds: bounds,
  tileSize: 256,
  errorTileUrl: '' // suppress 404 images
}).addTo(map);

console.log("🧱 tileLayer added");

// 5) Debug events
map.on('tileload', e => console.log("✅", e.tile.src));
map.on('tileerror', e => console.warn("❌", e.tile.src));
