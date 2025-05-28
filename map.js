// map.js

// 1) Your highest-res zoom and image size
const nativeZoom = 8;
const imgW       = 11008;
const imgH       = 11008;

// 2) Init the map
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// 3) Figure out our full-image bounds at z = 8
const sw     = map.unproject([0,    imgH], nativeZoom);
const ne     = map.unproject([imgW, 0   ], nativeZoom);
const bounds = L.latLngBounds(sw, ne);
map.fitBounds(bounds);

// 4) Make a new pane for the low-res base
map.createPane('lowresPane');
// put it *below* the tilePane (which is at z-index 200)
map.getPane('lowresPane').style.zIndex        = 100;
// clicks/drag should go through it
map.getPane('lowresPane').style.pointe