console.log("▶️ map.js loaded");

const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZoom = 8;
const scale = Math.pow(2, maxZoom);

const tileCount = {
  x: Math.ceil(imgW / tileSize),
  y: Math.ceil(imgH / tileSize)
};

const scaledW = imgW / scale;
const scaledH = imgH / scale;
const bounds = [[0, 0], [scaledH, scaledW]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).setView([scaledH / 2, scaledW / 2], maxZoom);

console.log("🗺️ map initialized");

L.tileLayer('', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: maxZoom,
  noWrap: true,
  getTileUrl: function (coords) {
    const yFlipped = (1 << coords.z) - 1 - coords.y;
    const url = `tiles/${coords.z}/${coords.x}/${yFlipped}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));
map.on('tileload', e => console.log("✅ loaded:", e.tile.src));