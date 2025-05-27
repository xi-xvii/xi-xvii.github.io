// 🍃 Debug
console.log("▶️ app.js loaded");

// 1) Image size in pixels
const imgW = 11000;
const imgH = 11000;

// 2) Define map bounds using CRS.Simple (0,0 is bottom-left)
const bounds = [[0, 0], [imgH, imgW]];

// 3) Init the map and fit to image bounds
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 2,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true
}).fitBounds(bounds);

console.log("🗺️ map initialized & fit to bounds:", bounds);

// 4) Add the static image as an overlay
L.imageOverlay('map.png', bounds).addTo(map);

console.log("🖼️ imageOverlay added");