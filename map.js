console.log("▶️ map.js loaded");

// 1) Set image dimensions
const imgW = 11000;
const imgH = 11000;

// 2) Define bounds in pixel space (bottom-left origin)
const bounds = [[0, 0], [imgH, imgW]];

// 3) Init map using L.CRS.Simple
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 5
}).fitBounds(bounds);

console.log("🗺️ map initialized and fit to image bounds");

// 4) Add the image as an overlay
L.imageOverlay('map.png', bounds).addTo(map);
console.log("🖼️ imageOverlay added");