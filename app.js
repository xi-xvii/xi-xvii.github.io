// 1) Your image’s pixel bounds
const imgWidth  = 11000;
const imgHeight = 11000;
const bounds    = [[0, 0], [imgHeight, imgWidth]];

// 2) Init Leaflet in “flat” mode
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -5,    // let you zoom out plenty
  maxZoom:  2,    // cap zoom-in so it doesn’t pixel-blow
  zoomSnap:    0.5,
  zoomDelta:   0.5,
  zoomControl: true,

  // performance tweaks
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false,

  // disable scroll wheel if it feels too laggy
  scrollWheelZoom: true
});

// 3) Overlay your one giant PNG
L.imageOverlay('map.png', bounds, {
  interactive: false
}).addTo(map);

// 4) Fit to bounds
map.fitBounds(bounds);

// 5) Add a test marker
L.marker([600, 800]).addTo(map).bindPopup('Location Alpha');