// Say "Hello."
document.write("Hello.<br/>");
// Say "Goodbye" two seconds from now.
setTimeout(
    function() {
        // callback function 
        // frees up the program to do other things
        document.write("Goodbye!<br/>");
    }
, 15000);
// Say "Hello again!"
document.write("Hello again!<br/>");