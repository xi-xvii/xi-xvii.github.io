// 1) Debug
console.log("▶️ app.js loaded");

// 2) Image & zoom config
const imgW = 11000;
const imgH = 11000;
const maxZ = 8;                 // or whatever your highest zoom now is

// 3) Compute the pixel‐bounds and center
const bounds = L.latLngBounds([0, 0], [imgH, imgW]);
const center = bounds.getCenter();

// 4) Initialize map in flat CRS, fit to bounds
const map = L.map('map', {
  crs:        L.CRS.Simple,
  minZoom:    0,
  maxZoom:    maxZ,
  zoomControl:true
});
// Fit full image into view
map.fitBounds(bounds);
console.log("🗺️ map fit to bounds:", bounds);

// 5) Add XYZ tiles
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  minZoom:         0,
  maxZoom:         maxZ,
  errorTileUrl:    ''
}).addTo(map);
console.log("🖼️ tileLayer added");

// 6) Now zoom in two levels (you can pan freely)
map.setView(center, 2);
console.log("🔍 zoomed in to level 2 at", center);

// 7) Debug events
map.on('tileload',   e => console.log("✅ tileload",   e.tile.src));
map.on('tileerror',  e => console.warn("❌ tileerror",  e.tile.src));
map.on('zoomend',    ()  => console.log("🔄 zoom →",     map.getZoom()));
map.on('moveend',    ()  => console.log("➡️ center →",   map.getCenter()));
