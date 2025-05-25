// 1) Initialize a simple (flat) map in the #map div
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
  zoomControl: true
});

// 2) Set these to your PNG's pixel dimensions:
const imgWidth = 11000;
const imgHeight = 11000;

// 3) Define map bounds in pixel coordinates [y, x]
const bounds = [[0, 0], [imgHeight, imgWidth]];

// 4) Add the image overlay
L.imageOverlay('map.png', bounds).addTo(map);

// 5) Zoom the map to show the whole image
map.fitBounds(bounds);

// ——————————————
// 6) Add your clickable markers below.
//    Format: L.marker([pixelY, pixelX]).addTo(map).bindPopup(`...HTML...`);

// Example reference at pixel (800, 600):
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200" alt="Alpha Photo"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn't support video.
  </video>
`);
