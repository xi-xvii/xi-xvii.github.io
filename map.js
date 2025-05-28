// 1) Your highest-res zoom
const nativeZoom = 8;

// 2) Your full-image dimensions in pixels
const imgW = 11008;
const imgH = 11008;

// 3) Init a CRS.Simple map that can zoom 0…8
//    and clamp panning to the image’s footprint:
const map = L.map('map', {
  crs:               L.CRS.Simple,
  minZoom:           0,
  maxZoom:           nativeZoom,
  zoomSnap:          1,
  zoomDelta:         1,
  zoomControl:       true,
  attributionControl:false,
})

// 4) Compute the LatLng-bounds of the full image at z=8:
const sw     = map.unproject([0,    imgH], nativeZoom);
const ne     = map.unproject([imgW, 0   ], nativeZoom);
const bounds = L.latLngBounds(sw, ne);

// 5) Show the whole image on load, and prevent dragging outside it:
map.fitBounds(bounds);

// 6) Add a low-res tile layer (2 zoom levels down) as background
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxZoom:         nativeZoom - 2,
  opacity:         1,
  zIndex:          0,
  className:       'low-res-tiles'
}).addTo(map);

// 7) Add a high-res tile layer with fade-in effect
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom,
  errorTileUrl:    '',
  opacity:         1,
  zIndex:          1,
  className:       'high-res-tiles'
}).addTo(map);