/* Returns either the index of the location in the array,
  or -1 if the array did not contain the targetValue */
  
var doSearch = function(array, targetValue) {
	var min = 0;
	var max = array.length - 1;
    var guess;
    var palpites = 0;
    
    while(min < max + 1){
        
        guess = floor((min + max)/2);
        
        palpites = palpites +1;

        if(array[guess] === targetValue){
            println(array[guess]);
            println("Numero total de palpites: " + palpites);
            return guess;
        }
        
        else if(array[guess] < targetValue){
            println(array[guess]);
            min = guess + 1;
        }
        
        else{
            println(array[guess]);
            max = guess -1;
        }
        
    }

	return -1;
};

var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
		41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];


//var result = doSearch(primes, 59);

//println("Found prime at index " + result);

Program.assertEqual(doSearch(primes, 73), 20);
Program.assertEqual(doSearch(primes, 41), 12);
Program.assertEqual(doSearch(primes, 59), 16);