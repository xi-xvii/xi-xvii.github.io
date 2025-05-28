// map.js

// 1) The zoom level you generated your highest-res tiles at:
const nativeZoom = 8;

// 2) Your image’s full pixel dimensions:
const imgW = 11008;
const imgH = 11008;

// 3) Init a Simple CRS map that can zoom 0…8:
const map = L.map('map', {
  crs:             L.CRS.Simple,
  minZoom:         0,
  maxZoom:         nativeZoom,
  zoomSnap:        1,
  zoomDelta:       1,
  zoomControl:     true,
  attributionControl: false
});

// 4) Convert the image’s corners into Leaflet lat-lng at z=8:
const sw = map.unproject([0,    imgH], nativeZoom); // bottom-left pixel → latlng
const ne = map.unproject([imgW, 0   ], nativeZoom); // top-right pixel → latlng
const bounds = L.latLngBounds(sw, ne);

// 5) Fit the map to show the whole image on load:
map.fitBounds(bounds);

// 6) Tell Leaflet to always request z=8 tiles and simply scale  
//    them for zooms <8 (so you get your entire image at any zoom):
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  bounds:          bounds,
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  minNativeZoom:   0, // if user zooms out below 8, still fetch z=8
  maxNativeZoom:   8  // if user zooms in above 8, still fetch z=8
}).addTo(map);
