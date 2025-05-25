// 1) Define your image’s pixel size and bounds as a LatLngBounds
const imgWidth  = 11000;
const imgHeight = 11000;
const bounds    = L.latLngBounds([0,     0     ], 
                                 [imgHeight, imgWidth]);

// 2) Init the map with those bounds and your zoom range
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 6,
  zoomSnap:  1,
  zoomDelta: 1,
  zoomControl: true,

  // clamp panning/zooming so the view never drifts outside your image
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,

  // turn off animations for best perf
  zoomAnimation:       false,
  fadeAnimation:       false,
  markerZoomAnimation: false,
  inertia:             false
});

// 3) Add a standard tileLayer that only loads inside your bounds
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  tms:       true,          // match GDAL’s TMS output
  noWrap:    true,          // don’t repeat outside the image
  bounds:    bounds,        // only fetch tiles intersecting these coords
  minZoom:   0,
  maxZoom:   6,
  errorTileUrl: ''          // blank image for any truly missing tiles
}).addTo(map);

// 4) Zoom/pan so the full map is visible
map.fitBounds(bounds);

// 5) (Re-)add your markers as before
L.marker([600, 800]).addTo(map).bindPopup(`
  <h3>Location Alpha</h3>
  <img src="photos/alpha.jpg" width="200"><br>
  <video width="240" controls>
    <source src="videos/alpha.mp4" type="video/mp4">
    Your browser doesn't support video.
  </video>
`);
