console.log("▶️ map.js loaded");

const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZoom = 8;

const bounds = [[0, 0], [imgH, imgW]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).fitBounds(bounds);

console.log("🗺️ map initialized");

L.tileLayer('', {
  tileSize: tileSize,
  noWrap: true,
  bounds: bounds,
  minZoom: 0,
  maxZoom: maxZoom,
  getTileUrl: function (coords) {
    const url = `tiles/${coords.z}/${coords.x}/${coords.y}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileloadstart', e => console.log("🌀 loading:", e.tile.src));
map.on('tileload',     e => console.log("✅ loaded:", e.tile.src));
map.on('tileerror',    e => console.warn("❌ error loading:", e.tile.src));