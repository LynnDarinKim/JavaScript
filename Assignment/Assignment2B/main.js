'use strict';

    // create variable to use built-in methods in XMLHttpRequest()
    var xhr = new XMLHttpRequest();

    // create array to store parsed json information
    var infoArray;

    // use open method. get json from url and make it asynchronous with 'true' (can be omitted) 
    xhr.open('GET', 'https://api.coinlore.com/api/tickers/', true);

    // when server respond, check what kind of event is happening 
    xhr.onreadystatechange = function() {
        // if it is ready or not modified and the operation is complete,
        if( (xhr.status === 200 || xhr.status === 304) && xhr.readyState === 4 ) {

            // parse JSON text into an array
            infoArray = JSON.parse(xhr.responseText);

            // to check if it works
            console.log(infoArray);

            // initiate variables for information in the array
            var infoCoinNum = 0;
            var infoTimes = 0;
            var infoName = "";
            var infoRank = 0;
            var infoPrice = 0;
            var infoSupply = 0;

            // get information from array and convert it into integer
            infoCoinNum = parseInt(infoArray.info.coins_num);
            infoTimes = parseInt(infoArray.info.time);

            // write to html and display
            document.write("<h2>" +"Total number of coins: " +infoCoinNum + "<br>" + "Total number of transcations: " + infoTimes + "<br>" + "</h2>")

            document.write("<h2>"+"Coins rank from 1 to 100: " + "<br>" + "</h2>")

            // iterate through data in parsed array to check information and display
            for(var i = 0; i < infoArray.data.length; i++) {
                
                // get information 
                infoName = infoArray.data[i].name;
                infoRank = parseInt(infoArray.data[i].rank);
                infoPrice = parseFloat(infoArray.data[i].price_usd);

                //add up the number of supplies and add up to calculate total
                infoSupply += parseInt(infoArray.data[i].tsupply);

                // write to html and display
                document.write(infoRank + ". " + infoName + ": $" + infoPrice + "<br>")
            } 
            // write to html and display
            document.write("<br>" + "<h2>" + "Total supply: " + infoSupply + "</h2>")
            
        } 
    };

    // request to server
    xhr.send();
