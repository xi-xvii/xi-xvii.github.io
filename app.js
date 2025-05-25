// 1) Image dimensions & map bounds
const imgWidth  = 11000;
const imgHeight = 11000;
const bounds    = L.latLngBounds([0, 0], [imgHeight, imgWidth]);

// 2) Initialize the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 6,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: true,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false
});

// 3) Load your pre-generated tiles (0–6)  
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:      true,
  bounds:      bounds,
  minZoom:     0,
  maxZoom:     6,
  errorTileUrl: ''   // blank instead of 404
}).addTo(map);

// 4) Fit the view to show the entire map
map.fitBounds(bounds);

// 5) Add any markers/popups
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn't support video.
  </video>
`);
