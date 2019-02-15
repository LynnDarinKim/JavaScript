(function(){

    var DATA_URL = "https://mikecaines.com/api/map.json";
    var DNA_SEQUENCE = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";
    
    // Extract Codons as JavaScript Array from a DNA Sequence String.
    var extractCodonsFromDNA = function(dnaSequence)
    {
      var codons = [];

      var codonEach = [];

      var separatedSequence = [];


      for (var i = 0; i < dnaSequence.length; i++) {
        codonEach.push(dnaSequence[i]);
      }

      for (var i = 0; i < codonEach.length; i+=3) {
        separatedSequence.push(codonEach.slice(i, i+3));
      }

      for(var i = 0; i < separatedSequence.length; i++) {
        codons.push(separatedSequence[i].join(""))
      }

      // ADD CODE TO COMPLETE THE FUNCTION HERE...
      // you will get a console.assert error until the function is coded correctly
  
      return codons;
    }
    
    // Compare the Codons array with the map of Amino Acids found in the json data. Add any matches to the aminos array.
    var translateCodonsToAminos = function(codons, jsonLookupData) 
    {

      var aminos = [];

      for(var i = 0; i < jsonLookupData.length; i++){
        if(jsonLookupData[i].codons.includes(codons[i])){
          aminos.push(jsonLookupData[i].abbr);
        }
      }

      // ADD CODE TO COMPLETE THE FUNCTION HERE...
      // you will get a console.assert error until the function is coded correctly
    
      return aminos;
    }
    
    var runProgram = function () {
      var codons = extractCodonsFromDNA(DNA_SEQUENCE); //DO NOT MODIFY
      testExtractCodonsFromDNAFunction(codons);        //DO NOT MODIFY...this will cause an assertion error if function is incorrect
      console.log(codons)
  
      // ENTER CODE TO LOAD DATA FROM API HERE.
      // REPLACE THIS console.assert CALL WITH YOUR CODE THAT RETRIEVES THE REQUIRED JSON DATA
      // console.assert(false, "Replace this console.assert with your API call.");
      fetch(DATA_URL)
      .then(response => response.json())
      .then(json => {

      console.log(json)
      //ONCE YOU HAVE YOUR API CALL WORKING, UNCOMMENT AND APPLY THESE THREE LINES OF CODE AND PLACE THEM IN THE LOCATION 
      //WHERE YOU RECEIVE YOUR JSON DATA...DO NOT MODIFY THESE LINES EXCEPT FOR UNCOMMENTING THEM
      var aminos = translateCodonsToAminos(codons, json); //DO NOT MODIFY
      testTranslateCodonsToAminosFunction(aminos);        //DO NOT MODIFY...this will cause an assertion error if function is incorrect
      displayConvertedAminoSequence(aminos);              //DO NOT MODIFY

      })


  

    
    }
    
  
    //DO NOT MODIFY THE REMAINING CODE BELOW - HOWEVER FEEL FREE TO TAKE A LOOK TO GIVE SOME ADDED HINTS

    //THIS IS A FUNCTION TO TEST YOUR extractCodonsFromDNA FUNCTION ... DO NOT MODIFY
    var testExtractCodonsFromDNAFunction = function(codons){
      var correctResult = ["GTG", "CCA", "ATG", "TTA", "CTG", "CTA", "AAT", "CTC", "TAT", "ATA", "CAG", "TGG", "CTT", "AAG", "GAT", "GGG", "GGG", "CCC", "AGC", "AGC", "GGC", "CGA", "CCC", "CCC", "CCC", "TCA", "GTG", "TGG", "AAT", "CAA", "CCG", "GAA", "TTG", "AGG"];
      function matchesCorrectResult (codon, index) { 
        return correctResult[index] === codon;
      };
      //confirm that the contents of the codons array matches the contents of the correctResult array.
      if(codons.length > 0 && codons.every(matchesCorrectResult)){
        console.log("FUNCTION extractCodonsFromDNA is CORRECT");
      } else {
        console.assert(false, "Error in extractCodonsFromDNA Function - Extracted codon sequence doesn't match.");
      }
    }

    //THIS IS A FUNCTION TO TEST YOUR translateCodonsToAminos FUNCTION ... DO NOT MODIFY
    var testTranslateCodonsToAminosFunction = function(aminos){
      var correctResult = ["Val", "Pro", "Met", "Leu", "Leu", "Leu", "Asn", "Leu", "Tyr", "Ile", "Gln", "Trp", "Leu", "Lys", "Asp", "Gly", "Gly", "Pro", "Ser", "Ser", "Gly", "Arg", "Pro", "Pro", "Pro", "Ser", "Val", "Trp", "Asn", "Gln", "Pro", "Glu", "Leu", "Arg"];
      function matchesCorrectResult (amino, index) { 
        return correctResult[index] === amino; 
      };
      //confirm that the contents of the passed in aminos array matches the contents of the correctResult array.
      if(aminos.length > 0 && aminos.every(matchesCorrectResult)){
        console.log("FUNCTION translateCodonsToAminos is CORRECT");
      } else {
        console.assert(false, "Error in translateCodonsToAminos Function - Final Amino array doesn't match..");
      }
    }

    //THIS FUNCTION WILL DISPLAY THE DESIRED AMINO SEQUENCE ON THE WEB PAGE...DO NOT MODIFY
    var displayConvertedAminoSequence = function(aminos){
      document.write(aminos.join('-'));
    }

    runProgram(); // DO NOT MODIFY
  
  })();