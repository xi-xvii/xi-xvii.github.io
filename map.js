console.log("▶️ map.js loaded");

// 1) Initialize map and set view to London
var map = L.map('map').setView([51.505, -0.09], 13);
console.log("🗺️ map initialized at London");

// 2) Add OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
console.log("🧱 OSM tile layer added");
