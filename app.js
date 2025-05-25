// 🍃 Debug
console.log("app.js running");

// 1) Image size & initial center
const imgWidth  = 11000;
const imgHeight = 11000;
// Center the view on the middle of your image:
const startLatLng = [imgHeight/2, imgWidth/2];  

// 2) Make the map, set its view *first*
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 6
}).setView(startLatLng, 0);

console.log("Map initialized at", startLatLng);

// 3) Add your tile layer (TMS = true flips Y for you)
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tms:       true,
  noWrap:    true,
  minZoom:   0,
  maxZoom:   6,
  errorTileUrl: ''  // empty tile instead of 404
}).addTo(map);

console.log("Tile layer added");
