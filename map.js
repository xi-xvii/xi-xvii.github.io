console.log("▶️ map.js loaded");

// 1) Real image size
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZoom = 8;
const scale = Math.pow(2, maxZoom); // 256 tiles at zoom 8

// 2) Scaled size for zoom 0
const scaledW = imgW / scale;
const scaledH = imgH / scale;
const bounds = [[0, 0], [scaledH, scaledW]];

// 3) Init map with scaled bounds
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).setView([scaledH / 2, scaledW / 2], maxZoom);

console.log("🗺️ map initialized");

// 4) TileLayer using default XYZ pattern
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  noWrap: true,
  minZoom: 0,
  maxZoom: maxZoom,
  // Don't restrict bounds — let Leaflet tile freely
}).addTo(map);

console.log("🧱 tileLayer added");
