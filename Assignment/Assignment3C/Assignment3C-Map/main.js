(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([42, -80]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.')
        .openPopup();


        //test
      
        var geojsonFeature2 = {"type": "Feature","geometry": {"type": "Point","coordinates": [-104.99404, 50]},"properties": {"name": "null island"}}

        L.geoJSON(geojsonFeature2).addTo(map);
        //test

        // 5, 6, 2nd 
        // `{"type": "Feature","geometry": {"type": "Point","coordinates": [${x[5]}, ${x[6]}]},"properties": {"name": ${x[2]}}}`

        var getLongitudeLatitudeName = function(jsonInput) {
            return jsonInput.states.map(function(x){
                // return {"type": "Feature","geometry": {"type": "Point","coordinates": [parseFloat(`${(x[5])}`), parseFloat(`${x[6]}`)]},"properties": {"name": `${x[2]}`}};

                    if(x[5] !== null && x[6] !== null && x[2] !== null) {
                        return {"type": "Feature","geometry": {"type": "Point","coordinates": [parseFloat(`${(x[5])}`), parseFloat(`${x[6]}`)]},"properties": {"name": `${x[2]}`}};   
                    } else {return 0}

                
            });
        }

    fetch('https://opensky-network.org/api/states/all')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json)
            console.log(getLongitudeLatitudeName(json))

            L.geoJSON(getLongitudeLatitudeName(json)).addTo(map);














        }) // end of fetch 

})()



