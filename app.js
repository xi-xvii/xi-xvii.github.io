console.log("▶️ app.js loaded");

// 1) Image and tile settings
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZ = 8;

// 2) Define bounds using real pixel coords
const bounds = [[0, 0], [imgH, imgW]];

// 3) Init map with real pixel CRS
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 8,
  zoomControl: true
}).setView([imgH / 2, imgW / 2], 5);

console.log("🗺️ map initialized");

// 4) Tile layer with fixed zoom and visible range
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: 8,
  noWrap: true,
  bounds: L.latLngBounds([0, 0], [imgH, imgW]),
  errorTileUrl: '',
  // Optional debug
  getTileUrl: function (coords) {
    const yFlipped = Math.pow(2, coords.z) - coords.y - 1;
    const url = `tiles/${coords.z}/${coords.x}/${yFlipped}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileload', e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror', e => console.warn("❌ error:", e.tile.src));

