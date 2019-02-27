(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([42, -80]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
        .on(onclick);




        // //test
      
        // var geojsonFeature2 = {"type": "Feature","geometry": {"type": "Point","coordinates": [-104.99404, 50]},"properties": {"name": "null island"}}

        // L.geoJSON(geojsonFeature2).addTo(map);
        // //test

        var getLongitudeLatitudeName = function(jsonInput) {
            return jsonInput.states.filter(function(str){return str[2] === "Canada"}).map(function(x){
                if(x[5] !== null && x[6] !== null && x[2] !== null) {
                    return {"type": "Feature","geometry": {"type": "Point","coordinates": [parseFloat(`${(x[5])}`), parseFloat(`${x[6]}`)]},"properties": {
                        "name": `${x[2]}`, 
                        "popupContent" : 
                            `Callsign : ${x[1]}` + "<br>" +
                            `ICAO24 : ${x[0]}`   + "<br>" +
                            `Longitude : ${x[5]}`  + "<br>" +
                            `Latitude : ${x[6]}`  + "<br>" +
                            `Velocity : ${x[9]}`  + "<br>" +
                            `Altitude : ${x[13]}`  + "<br>" +
                            `Heading  : ${x[10]}`}};   
                } else {return 0} 
            });
        }

        

        // reference: https://gist.github.com/geog4046instructor/80ee78db60862ede74eacba220809b64
        function createCustomIcon(Feature, latlng) {
            var planeIcon = L.icon({
                iconUrl: 'plane2.png',
                iconSize:     [20, 20], 
                iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, 0], // point from which the popup should open relative to the iconAnchor
            })
            return L.marker(latlng, {icon: planeIcon})
        }


        function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.popupContent) {
                layer.bindPopup(feature.properties.popupContent);
            }
        }


    function update() {fetch('https://opensky-network.org/api/states/all')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            setTimeout(update, 30000);// reference: https://stackoverflow.com/questions/38925157/proper-way-to-update-data-using-setinterval
            console.log(json)
            console.log(getLongitudeLatitudeName(json))

            var myLayerOptions = {
                onEachFeature: onEachFeature,
                pointToLayer : createCustomIcon
            }


        L.geoJSON(getLongitudeLatitudeName(json), myLayerOptions).addTo(map).on(onclick);












        }).catch(function(err){
            setTimeout(update, 30000);
        })// end of fetch 
        }
        update();

})()



