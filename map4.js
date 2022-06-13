mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWhncmV2eSIsImEiOiJjbDFwZHg2YzkwMTVqM2lzeTgxa29waDNnIn0.8fJhOwF_qreAF9cEeVNUMw';
var map4 = new mapboxgl.Map({
    container: 'map4',
    style: 'mapbox://styles/sarahgrevy/cl4cy02wm006z14mzkmuzflxq',
    zoom: 10.5,
    maxZoom: 14,
    minZoom: 10.5,
    center: [-73.84, 40.755],
    maxBounds: [[-74.9, 40.9], [-73.3, 40.6]]
});

map4.on("load", function () {
  map4.addLayer(
    {
      id: "citibike_points",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/citibike_2021_end.geojson",
      },
      paint: {
        "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "tripCount"],
            10, 2,
            15000, 10
        ],
        "circle-color": "orange",
        "circle-stroke-color": "#000000",
        "circle-opacity": 0.5,
      },
    },
    "waterway-label"
  );
});

map4.on("click", "citibike_points", function (e) {
  var tripCount = e.features[0].properties.tripCount;
  var name = e.features[0].properties.start_station_name;

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
        <h6>
        ${name} Station
        </h6>
        <p>
            <b>${tripCount}</b> trips from this end station
        </p>

    `
    )
    .addTo(map4);
})

map4.on("mouseenter", "citibike_points", function () {
  map4.getCanvas().style.cursor = "pointer";
});
map4.on("mouseleave", "citibike_points", function () {
  map4.getCanvas().style.cursor = "";
});
