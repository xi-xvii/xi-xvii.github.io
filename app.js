// 0) Debug
console.log("▶️ app.js loaded");

// 1) Minimal map init (flat CRS, no wrap)
const map = L.map('map', {
  crs:       L.CRS.Simple,
  minZoom:   0,
  maxZoom:   6,
  zoomControl:true
}).setView([0,0], 0);
console.log("🗺️ map initialized at [0,0], zoom 0");

// 2) Full XYZ tile layer (Step 1)
// (you’ll see your tiles appear as you pan/zoom)
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tileSize:       256,
  noWrap:         true,
  continuousWorld:false,
  minZoom:        0,
  maxZoom:        6,
  errorTileUrl:   ''
}).addTo(map);
console.log("🖼️ full XYZ tileLayer added");

// 3) Define and apply your image bounds (Step 2)
const bounds = L.latLngBounds([0, 0], [11000, 11000]);
map.fitBounds(bounds);
map.setMaxBounds(bounds);
console.log("🔒 map fit & bounded to", bounds);

// 4) Re-add the tile layer, now bounded
map.eachLayer(layer => { if (layer instanceof L.TileLayer) map.removeLayer(layer); });
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  bounds:          bounds,
  noWrap:          true,
  continuousWorld: false,
  minZoom:         0,
  maxZoom:         6,
  errorTileUrl:    ''
}).addTo(map);
console.log("🖼️ bounded tileLayer added");

// 5) Zoom in two levels
map.setView(bounds.getCenter(), 2);
console.log("🔍 zoomed in to level 2");
