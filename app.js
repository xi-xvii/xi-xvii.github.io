// 1) Initialize the map
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 6,
  zoomControl: true,
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false
});

// 2) Define image pixel dimensions & overall bounds
const imgWidth  = 11000;
const imgHeight = 11000;
const bounds    = [[0, 0], [imgHeight, imgWidth]];

// 3) Load only the tiles that exist
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tms:     true,
  noWrap:  true,
  bounds:  bounds,      // ← here’s the magic line
  minZoom: 0,
  maxZoom: 6
}).addTo(map);

// 4) Fit the map to your full image
map.fitBounds(bounds);

// 5) Re-add your markers/popups as before
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn't support video.
  </video>
`);
