// 1) Image dimensions and max zoom
const imgW    = 11000;
const imgH    = 11000;
const maxZoom = 6;

// 2) Custom CRS that doesn’t flip Y
const myCRS = Object.assign({}, L.CRS.Simple, {
  transformation: new L.Transformation(1, 0, 1, 0)
});

// 3) Define your image bounds in “pixel” units (lat=y, lng=x)
const imageBounds = [[0, 0], [imgH, imgW]];

// 4) Init the map with that CRS and fit to bounds
const map = L.map('map', {
  crs:       myCRS,
  minZoom:   0,
  maxZoom:   maxZoom,
  zoomControl: true
}).fitBounds(imageBounds);

// 5) Add your tiles via standard XYZ (no negatives!)
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:         true,
  continuousWorld:false,
  bounds:         imageBounds,
  minZoom:        0,
  maxZoom:        maxZoom,
  errorTileUrl:   ''   // blank instead of 404s
}).addTo(map);

// 6) (Optional) lock panning so you never drift outside
map.setMaxBounds(imageBounds);