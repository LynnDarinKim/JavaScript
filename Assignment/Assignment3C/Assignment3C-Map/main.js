(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    // create LayerGroup and add to map. this will be the map layer which markers are being stored. 
    var markers = new L.LayerGroup().addTo(map);

    function update() {
        fetch('https://opensky-network.org/api/states/all')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            // reference: https://stackoverflow.com/questions/38925157/proper-way-to-update-data-using-setinterval
            setTimeout(update, 300);
            console.log(json)
            console.log(convertToGeojson(json))

            var myLayerOptions = {
                onEachFeature: onEachFeature,
                pointToLayer : createCustomIcon
            }

        markers.clearLayers()

        L.geoJSON(convertToGeojson(json), myLayerOptions)
        .addTo(markers).on(onclick);

        }).catch(function(err){
            setTimeout(update, 300);})
    }// end of fetch 

    update(); // call update function


    // functions ------------------------------------------------------------------------------------

    // convert json data into Geojson format
    var convertToGeojson = function(jsonInput) {
        return jsonInput.states.filter(function(str){return str[2] === "Canada"}).map(function(x){
            if(x[5] !== null && x[6] !== null && x[2] !== null) {
                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point","coordinates": [parseFloat(`${(x[5])}`), parseFloat(`${x[6]}`)]
                    },
                    "properties": {
                        "name": `${x[2]}`, "angle": `${x[10]}`,// include angle
                        //include popup content
                        "popupContent" : `Callsign : ${x[1]}` + "<br>" +`ICAO24 : ${x[0]}`   + "<br>" +`Longitude : ${x[5]}`  + "<br>" +`Latitude : ${x[6]}`  + "<br>" +`Velocity : ${x[9]}`  + "<br>" +`Altitude : ${x[13]}`  + "<br>" + `Heading  : ${x[10]}`
                    }
                };   
            } else {return 0} // so that it won't be displayed
        });
    }

    // function to create rotating icon
    // reference: https://gist.github.com/geog4046instructor/80ee78db60862ede74eacba220809b64 (icon)
    // reference: https://gis.stackexchange.com/questions/245583/rotate-point-markers-geojson-leaflet (angle)
    function createCustomIcon(feature, latlng) {
        var planeIcon = L.icon({
            iconUrl: 'plane2.png',
            iconSize: [20, 20]
        })
        return L.marker(latlng, {icon: planeIcon, rotationAngle: feature.properties.angle})
    }

    // function to bind popup
    function onEachFeature(feature, layer) {
        // if this feature have a property named popupContent, bindpopup
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }
    
})()



