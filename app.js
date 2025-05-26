// 1) Debug
console.log("▶️ app.js loaded");

// 2) Your image’s dimensions & zoom range
const imgW  = 11000;
const imgH  = 11000;
const maxZ  = 8;        // assuming you bumped to 8
const center = [imgH/2, imgW/2];

// 3) Make the map in flat CRS and set initial view
const map = L.map('map', {
  crs:       L.CRS.Simple,
  minZoom:   0,
  maxZoom:   maxZ,
  zoomControl: true
}).setView(center, 0);   // start zoomed in two levels

console.log("🗺️ map initialized at", center);

// 4) Define your bounds once and reuse
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);

// 5) Add your XYZ tiles
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  minZoom:        0,
  maxZoom:        maxZ,
  noWrap:         true,
  continuousWorld:false,
  errorTileUrl:   ''
}).addTo(map);

console.log("🖼️ tileLayer added");

// 6) Fit *and lock* the map to those exact pixel-bounds
map.fitBounds(bounds);
map.setMaxBounds(bounds);

console.log("🔒 panning locked to image bounds");