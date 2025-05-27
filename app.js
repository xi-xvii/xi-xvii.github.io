console.log("▶️ app.js loaded");

const tileSize = 256;
const bounds = L.latLngBounds([0, 0], [tileSize, tileSize]);

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 0
}).fitBounds(bounds);

L.imageOverlay('tiles/0/0/0.png', bounds).addTo(map);
console.log("🖼️ imageOverlay fallback added");
