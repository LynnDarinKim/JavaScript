(function() {

    console.log(this);

    function hey() {
    
        console.log('hey ' + name);
        console.log(this);
    };
    this.hey();
    var name = 'Steve';
})();

// output -> hey undefind