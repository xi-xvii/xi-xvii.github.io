// map.js

// 1) Zoom & full-size (11 008×11 008px) of your image
const nativeZoom = 8;
const imgW = 11008, imgH = 11008;

// 2) Init a Simple-CRS map (zoom 0→8)
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// 3) Compute the LatLngBounds of the full image at z=8
const sw = map.unproject([0,    imgH], nativeZoom);  // bottom-left
const ne = map.unproject([imgW, 0   ], nativeZoom);  // top-right
const bounds = L.latLngBounds(sw, ne);

// 4) Fit the map to show the entire image area
map.fitBounds(bounds);

// 5) Add your tile layer as before
const tiles = L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);

// 6) **Then** overlay your low-res PNG in front (zIndex=1000)
const overlay = L.imageOverlay('lowres/map-lowres.png', bounds, {
  zIndex: 1000
}).addTo(map);

// 7) Make absolutely sure it’s on top
overlay.bringToFront();
tiles.bringToBack();
