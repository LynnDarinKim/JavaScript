//JQUERY AJAX CALL
$(document).ready(function(){
    $("button").click(function(){
        alert('clicked')
        $.ajax(
            {
                url: "https://jsonplaceholder.typicode.com/users", 
                success: function(result)
                    {
                        var listOfNames = '';
                        // loop through each object and write out something
                        result.forEach(element => {
                            //append name to string
                            console.log(element.name);
                            // document.write(element.name);
                            $("#names").html(element.name);
                        });

                        //


                        // console.log(result);
                        // $("body").html(JSON.stringify(result));
                    }
            });
      });
});



  //ajax : send request to somewhere


/*
  result.array.forEach(element => {
    //append name to string

});
= 

result.array.forEach(function(element) {
    //append name to string

});
*/