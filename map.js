console.log("▶️ map.js loaded");

const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZoom = 8;
const tileCount = 1 << maxZoom;

const scaledW = imgW / tileSize;
const scaledH = imgH / tileSize;
const mapW = tileCount * tileSize;
const mapH = tileCount * tileSize;

// Leaflet pixel bounds (in CRS.Simple space)
const bounds = [[0, 0], [mapH, mapW]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).fitBounds(bounds);

console.log("🗺️ map initialized");

L.tileLayer('', {
  tileSize: tileSize,
  minZoom: 0,
  maxZoom: maxZoom,
  noWrap: true,
  bounds: bounds,
  getTileUrl: function (coords) {
    const maxY = (1 << coords.z) - 1;
    const yFlipped = maxY - coords.y;
    const url = `tiles/${coords.z}/${coords.x}/${yFlipped}.png`;
    console.log("🧭 requesting tile:", url);
    return url;
  }
}).addTo(map);

console.log("🧱 tileLayer added");

map.on('tileerror', e => console.warn("❌ error loading:", e.tile.src));
map.on('tileload', e => console.log("✅ loaded:", e.tile.src));
