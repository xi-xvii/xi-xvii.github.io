console.log("▶️ map.js loaded");

// 1) Map size and tile settings
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 8;

// 2) Bounds for full image in pixels
const bounds = [[0, 0], [imgH, imgW]];

// 3) Init the map with flat CRS
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZ
}).fitBounds(bounds);

console.log("🗺️ map initialized and fit to bounds");

// 4) Add custom tile layer (NO Y-FLIP)
L.tileLayer('', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: maxZ,
  noWrap: true,
  bounds: bounds,
  errorTileUrl: '',
  getTileUrl: function (coords) {
    const url = `tiles/${coords.z}/${coords.x}/${coords.y}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

// 5) Optional debug logs
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error:", e.tile.src));