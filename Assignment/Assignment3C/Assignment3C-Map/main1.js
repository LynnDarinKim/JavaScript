/*
Author: Wendy Du
Date: Feb 27,2019
Detail:
•	Display a map of the world. (You’ll be given starter files for this)
•	Fetch real-time flight information data from a publicly available API.
•	Filter the raw data to a subset with specific criteria.
•	Convert the filtered API data into GeoJSON format.
•	Plot markers on the map to display the current position of a subset of aircraft.
•	Add functionality that will cause the map to auto refresh after a certain interval of time.
*/

(function(){    
    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);   

    var markers = new L.LayerGroup().addTo(map);

    // every 7 seconds will reload the API data and refresh the planes
    function timer() {

        // get the API data
        fetch('https://opensky-network.org/api/states/all')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            // display raw data
            console.log(json);
            // Filter the data which origin country is "Canada" and their longitude and latitude are not null
            var CanadaJson = json["states"]
                            .filter(x1 => (x1[2] == "Canada") && (x1[5] != null) && (x1[6] != null));
            // display filtered data
            console.log(CanadaJson);

            // Transformation of filtered data into GeoJSON format
            var geojsonFeature = CanadaJson.map(item => ({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [item[5],item[6]]
                },
                "properties": {
                    "callsign": item[1],
                    "origin_country": item[2],
                    "velocity": item[9],
                    "rotationAngle": item[10]
                }
            }));

            // display GeoJSON format data
            console.log(geojsonFeature);

            // custom my own plane icon
            var planeIcon = L.icon({
                iconUrl: 'plane2.png',    
                iconSize:  [40, 40], // size of the icon
            });

            // clear old markers
            markers.clearLayers();

            // Display each aircraft and their popup
            L.geoJSON(geojsonFeature, {
                pointToLayer: function(feature,latlng){
                    
                    var marker = L.marker(latlng,{icon: planeIcon, rotationAngle: feature.properties.rotationAngle}).addTo(markers);
                    marker.bindPopup(
                        "callsign:" +
                        feature.properties.callsign + '<br/>' + 
                        "origin_country:" +
                        feature.properties.origin_country + '<br/>' +
                        "velocity:" +
                        feature.properties.velocity
                        );
                }
                
            });
        })
    }
          
    // every 7 seconds reload data and refresh the aircrafts
    window.setInterval(timer, 7000);
})()