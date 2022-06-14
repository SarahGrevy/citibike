mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhncmV2eSIsImEiOiJjbDFwZHg2YzkwMTVqM2lzeTgxa29waDNnIn0.8fJhOwF_qreAF9cEeVNUMw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sarahgrevy/cl4cy02wm006z14mzkmuzflxq',
    zoom: 10.5,
    maxZoom: 14,
    minZoom: 10.5,
    center: [-73.978016, 40.768246],
    maxBounds: [[-74.9, 40.9], [-73.3, 40.6]]
});


map.on("load", function () {
  map.addLayer(
    {
      id: "citibike_points",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/2020_start.geojson",
      },
      paint: {
        "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "tripCount"],
            10, 2,
            15000, 10
        ],
        "circle-color": "red",
        "circle-stroke-color": "#000000",
        "circle-opacity": 0.5,
      },
    },
    "waterway-label"
  );
});

map.on("click", "citibike_points", function (e) {
  var tripCount = e.features[0].properties.tripCount;
  var name = e.features[0].properties.start_station_name;

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
        <h6>
            ${name} Station
        </h6>
        <p>
            <b>${tripCount}</b> trips started here
        </p>

    `
    )
    .addTo(map);
})

map.on("mouseenter", "citibike_points", function () {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "citibike_points", function () {
  map.getCanvas().style.cursor = "";
});
