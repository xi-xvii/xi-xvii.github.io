console.log("▶️ map.js loaded");

// 1) Image and tile size
const imgW = 11000;
const imgH = 11000;
const tileSize = 256;
const maxZoom = 8;

// 2) Full image bounds in pixels
const bounds = [[0, 0], [imgH, imgW]];

// 3) Init map with L.CRS.Simple and center
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: maxZoom
}).fitBounds(bounds);

console.log("🗺️ map initialized");

// 4) Use tile layer with standard XYZ indexing
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tileSize: tileSize,
  noWrap: true,
  bounds: bounds,
  minZoom: 0,
  maxZoom: maxZoom,
}).addTo(map);

console.log("🧱 tileLayer added");