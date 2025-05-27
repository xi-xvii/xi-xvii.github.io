// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Tile and zoom settings
const tileSize = 256;
const maxZ = 0;

// 2) Bounds matching 1 tile at zoom level 0
const bounds = L.latLngBounds([0, 0], [tileSize, tileSize]);

// 3) Init the map with zoom locked to 0
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).fitBounds(bounds);

console.log("🗺️ map initialized & zoom fixed at 0");

// 4) Add tile layer for just that tile
L.tileLayer('', {
  noWrap: true,
  minZoom: 0,
  maxZoom: 0,
  tileSize: tileSize,
  bounds: bounds,
  errorTileUrl: '',

  getTileUrl: function (coords) {
    const yFlipped = Math.pow(2, coords.z) - coords.y - 1;
    const url = `tiles/${coords.z}/${coords.x}/${yFlipped}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

// 5) Debug events
map.on('tileloadstart', e => console.log("🌀 loading:", e.tile.src));
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error:", e.tile.src));
