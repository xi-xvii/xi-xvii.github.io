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
map.setMaxBounds(bounds);

// 6) Add your tileLayer **without** the `bounds:` option
//    so Leaflet will load every tile for the current zoom+view:
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,         // don’t wrap world-map style
  continuousWorld: false,        // same
  tileSize:        256,
  maxNativeZoom:   nativeZoom,   // never ask for z>8
  errorTileUrl:    ''            // hide broken-image icons
}).addTo(map);