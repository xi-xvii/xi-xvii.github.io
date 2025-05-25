// 🍃 0) Sanity check
console.log("app.js running");

// 1) Constants for your map
const imgWidth  = 11000;
const imgHeight = 11000;
const maxZoom   = 6;
// center of your image in [lat, lng] = [y, x]
const center    = [imgHeight/2, imgWidth/2];

// 2) Create the map & set its initial view
//    - CRS.Simple treats our image as a flat plane
//    - minZoom/maxZoom restrict zoom levels
const map = L.map('map', {
  crs:       L.CRS.Simple,
  minZoom:   0,
  maxZoom:   maxZoom,
  zoomControl: true
}).setView(center, 0);

console.log("Map initialized at", center, "zoom 0");

// 3) Add your TMS tile layer
//    - `tms: true` flips the Y so it matches your `raster` profile
//    - `noWrap: true` prevents infinite world wrapping
//    - `continuousWorld: false` confines to our single image
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tms:             true,
  noWrap:          true,
  continuousWorld: false,
  minZoom:         0,
  maxZoom:         maxZoom,
  errorTileUrl:    ''   // blank tile instead of 404
}).addTo(map);

console.log("TileLayer added");

// 4) Optionally, lock panning to the image bounds so you never drag off-map
const southWest = map.unproject([0, imgHeight], maxZoom);
const northEast = map.unproject([imgWidth, 0],  maxZoom);
map.setMaxBounds([southWest, northEast]);

// 5) Debug events: watch tile loads/fails and view changes
map.on('tileload',   (e) => console.log("✅ tileload", e.tile.src));
map.on('tileerror',  (e) => console.warn("❌ tileerror", e.tile.src));
map.on('zoomend',    ()  => console.log("Zoom →", map.getZoom()));
map.on('moveend',    ()  => console.log("Center →", map.getCenter()));
