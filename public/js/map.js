mapboxgl.accessToken = mapToken;
console.log(mapboxgl.accessToken)
const map = new mapboxgl.Map({
    container: "map", // container ID
    center: listing.geometry.coordinates, //starting position [lng, lat].
    zoom: 9,
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates) //listing geometry. cordinates
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4><p>Exact location well be  provided after booking!</p>`
        )
    )
    .addTo(map);