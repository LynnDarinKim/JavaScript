"use strict";
var readlineSync = require('readline-sync');

/*
    Author: Darin Kim
    Date: Sept. 28, 2018
    Description: 

*/

function main()
{
    // Input and variables
    var pounds = parseFloat(readlineSync.question("How many pounds of oranges do you want? "));
    var cost_per_pound = 1.99;
    var flat_shipping_cost = 7.50;
    var shipping_discount = 1.50;
    var user_location = readlineSync.question("Where are you from? ");

    // Processing
    var final_cost = pounds * cost_per_pound + flat_shipping_cost;
    var discounted_shipping_cost = flat_shipping_cost - shipping_discount;

    if (pounds >= 100 || user_location.toUpperCase() == "HALIFAX")
    {
        final_cost = pounds * cost_per_pound + discounted_shipping_cost;
    }

    // Output
    console.log(`Your final cost is: $${final_cost.toFixed(2)}`)

}
	
if (require.main === module)
{
    main();
}