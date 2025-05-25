// 1) Initialize the map in the #map div, matching your tile zoom range
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,       // lowest tile zoom
  maxZoom: 6,       // highest tile zoom (you generated 0–6)
  zoomControl: true,

  // disable animations for best performance
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false
});

// 2) Specify your image’s pixel dimensions and bounds
const imgWidth  = 11000;
const imgHeight = 11000;
const bounds    = [[0, 0], [imgHeight, imgWidth]];

// 3) Add the tile layer instead of a single overlay
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tms:     true,    // GDAL’s default scheme
  noWrap:  true,    // prevents repeating outside the image
  minZoom: 0,
  maxZoom: 6
}).addTo(map);

// 4) Zoom/pan the map to show the full extent of your image
map.fitBounds(bounds);

// ——————————————
// 5) (Re-)add your markers/popups below
//    Format: pixelY, pixelX as [lat, lng]
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn't support video.
  </video>
`);
