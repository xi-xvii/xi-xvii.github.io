// map.js

// 1) Your highest-res zoom and full image pixel size
const nativeZoom = 8;
const imgW = 11008;
const imgH = 11008;

// 2) Initialize the map (CRS.Simple, zoomable 0…8)
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// 3) Compute the LatLng bounds of your 11 008×11 008 image at zoom 8
const sw = map.unproject([0,    imgH], nativeZoom);   // bottom-left
const ne = map.unproject([imgW, 0   ], nativeZoom);   // top-right
const bounds = L.latLngBounds(sw, ne);

// 4) Fit to those bounds so you start zoomed out
map.fitBounds(bounds);

// 5) Create a custom pane for your overlay, above the default tilePane
map.createPane('overlayPane');
// default tilePane z-index is 200, so pick something higher
map.getPane('overlayPane').style.zIndex        = 300;
map.getPane('overlayPane').style.pointerEvents = 'none';  // let clicks through

// 6) Add your low-res image into that pane (stretched to the full bounds)
const overlay = L.imageOverlay('lowres/map-lowres.png', bounds, {
  pane: 'overlayPane',
  opacity: 1
}).addTo(map);
overlay.bringToFront();  // ensure it’s topmost in its pane

// 7) Finally, add your tile layer on the default tilePane
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);