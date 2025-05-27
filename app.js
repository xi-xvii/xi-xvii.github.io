// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Image size of one tile
const tileSize = 256;

// 2) Define bounds matching tile size
const bounds = L.latLngBounds([0, 0], [tileSize, tileSize]);

// 3) Init map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).fitBounds(bounds);

console.log("🗺️ map initialized & bounds set");

// 4) Add a single image overlay (this is tile 0/0/0)
L.imageOverlay('tiles/0/0/0.png', bounds).addTo(map);

console.log("🖼️ imageOverlay for 0/0/0 added");