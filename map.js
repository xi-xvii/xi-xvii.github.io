// 1) Your highest-res zoom level and full-image pixel dimensions:
const nativeZoom = 8;
const imgW       = 11008;
const imgH       = 11008;

// 2) Initialize a CRS.Simple map (zoom 0…8):
const map = L.map('map', {
  crs:                L.CRS.Simple,
  minZoom:            0,
  maxZoom:            nativeZoom,
  zoomSnap:           1,
  zoomDelta:          1,
  zoomControl:        true,
  attributionControl: false
});

// 3) Compute the map’s bounds in LatLng space at z = nativeZoom:
const southWest = map.unproject([0,    imgH], nativeZoom);
const northEast = map.unproject([imgW, 0   ], nativeZoom);
const bounds     = L.latLngBounds(southWest, northEast);

// 4) Fit the map to show the entire image on load:
map.fitBounds(bounds);

// 5) Add your tiles (one 256×256 tile per {z}/{x}/{y} folder):
L.tileLayer('tiles/{z}/{x}/{y}.png', {
  noWrap:          true,
  continuousWorld: false,
  tileSize:        256,
  maxNativeZoom:   nativeZoom
}).addTo(map);

// 6) Add the flat, image-based scale control
//    Suppose in your fantasy world 1 km = 100 px at zoom 8:
//      ⇒ 1 px = 0.01 km ⇒ 1000 px = 10 km
L.control.graphicScale({
  doubleLine:    true,    // mimic Leaflet's default style
  fill:          'hollow',// or 'solid'
  showSubunits:  true,    // show smaller graduations
  unitsPer1000px: 10,      // 10 km per 1000 px at maxZoom
  scaleUnit:     'km'     // label the unit “km”
}).addTo(map);
