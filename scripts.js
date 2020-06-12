var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5
});

var bounds = [[0,0], [1024,1024]];
var image = L.imageOverlay('Split_mini-map.png', bounds).addTo(map);

var sol = L.latLng([ 0, 0 ]);
L.marker(sol).addTo(map);

map.fitBounds(bounds);