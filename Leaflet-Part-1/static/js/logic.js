


// Assemble the API query URL.
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";


function displayMap(inputData) {
    // Puts the place and time in a popup for the feature
    function onEachFeature(feature, layer) {
        // add a popup to each marker
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) +
            "</p><br><p>Magnitude:" + feature.properties.mag + "</p>");
    }

    // function to get the color of the marker based on the magnitude of the earthquake
    function createCircles(feature) {
        magnitude = feature.properties.mag
        console.log("createCircles")

        var color = "";

        if (magnitude >= 5) {
            color = '#FF0000';
        }
        else if (magnitude >= 4) {
            color = '#FF6600';
        }
        else if (magnitude >= 3) {
            color = '#FF9900';
        }
        else if (magnitude >= 2) {
            color = '#FFCC00';
        }
        else if (magnitude >= 1) {
            color = '#FFFF00';
        }
        else if (magnitude < 1) {
            color = '#00FF00';

        }
        // set the style settings for the markers
        var geojsonMarkerOptions = {
            radius: magnitude * 5,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        // get the latitude and longitude of the earthquake
        var latlng = L.latLng([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
        console.log(latlng);
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
    // create GeoJSON layer
    var earthquakes = L.geoJSON(inputData, {
        onEachFeature: onEachFeature,
        pointToLayer: createCircles
    });
    // Creating the map object
    var myMap = L.map("map", {
        center: [37.0902, -95.7129],
        zoom: 5,
        layers: [earthquakes]
    });

    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    /*
    var legend = L.control({})
    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');
        labels = ['<strong>Categories</strong>'],
            categories = ['Road Surface', 'Signage', 'Line Markings', 'Roadside Hazards', 'Other'];

        for (var i = 0; i < categories.length; i++) {

            div.innerHTML +=
                labels.push(
                    '<i class="circle" style="background:red"></i> ' +
                    (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);

    */


}
fetch(url).then(response => {
    response.json().then(jsonRes => {
        displayMap(jsonRes.features);
    }).catch(jsonErr => {
        console.log(jsonErr)
    })

}).catch(err => {
    console.log(err)
})

