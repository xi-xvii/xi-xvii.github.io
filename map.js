// map.js

// 1) Your top zoom & full-pixel dims
const nativeZoom = 8;
const imgW = 11008, imgH = 11008;

// 2) Init a Simple-CRS map zoomable 0…8
const map = L.map('map', {
  crs:             L.CRS.Simple,
  minZoom:         0,
  maxZoom:         nativeZoom,
  zoomSnap:        1,
  zoomDelta:       1,
  zoomControl:     true,
  attributionControl: false
});

// 3) Compute the LatLng bounds of your 11 008×11 008 image at z=8
const sw = map.unproject([0,    imgH], nativeZoom); // bottom-left
const ne = map.unproject([imgW, 0   ], nativeZoom); // top-right
const bounds = L.latLngBounds(sw, ne);

// 4) Fit the map so you start seeing the entire image
map.fitBounds(bounds);

// 5) **Overlay your 2 048×2 048 PNG in the _tilePane_** so it’s
//    panned & zoomed just like your tiles:
L.imageOverlay('lowres/map-lowres.png', bounds, {
  pane: 'tilePane'    // default TileLayer pane
}).addTo(map);

// 6) Finally add your tiles on top of it
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);