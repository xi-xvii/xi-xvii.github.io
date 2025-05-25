// 🍃 Quick debug to confirm we’re running the right file
console.log("▶️ app.js running");

// 1) Your map image’s dimensions and max zoom
const imgW = 11000;
const imgH = 11000;
const maxZ = 6;

// 2) Compute the image center in [lat, lng] = [y, x]
const center = [imgH / 2, imgW / 2];

// 3) Initialize the map (flat CRS) and set initial view
const map = L.map('map', {
  crs:        L.CRS.Simple,
  minZoom:    0,
  maxZoom:    maxZ,
  zoomControl: true
}).setView(center, 0);

console.log("🗺️ Map initialized at", center, "zoom 0");

// 4) Add your TMS-numbered tiles
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tms:             true,   // flip Y to match bottom-left origin
  noWrap:          true,
  continuousWorld: false,
  minZoom:         0,
  maxZoom:         maxZ,
  errorTileUrl:    ''      // blank tile instead of 404
}).addTo(map);

console.log("🖼️ TileLayer added");

// 5) Lock panning to the image bounds
const southWest = map.unproject([0,    imgH], maxZ);
const northEast = map.unproject([imgW, 0   ], maxZ);
map.setMaxBounds([southWest, northEast]);

console.log("🔒 Panning locked to bounds");

// 6) Optional: watch tile load/fail events
map.on('tileload',   e => console.log("✅ tileload",   e.tile.src));
map.on('tileerror',  e => console.warn("❌ tileerror",  e.tile.src));
map.on('zoomend',    ()  => console.log("🔍 Zoom →",     map.getZoom()));
map.on('moveend',    ()  => console.log("📍 Center →",   map.getCenter()));
