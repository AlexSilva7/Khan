
var swap = function(array, firstIndex, secondIndex) {
    
    var temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
    
};


var indexOfMinimum = function(array, startIndex) {
    var minValue = array[startIndex];
    var minIndex = startIndex;

    for(var i = minIndex + 1; i < array.length; i++) {
        if(array[i] < minValue) {
            minIndex = i;
            minValue = array[i];
        }
    } 
    return minIndex;
}; 


var selectionSort = function(array) {
    var menor;
    for(var x = 0; x < array.length; x++){
        
        menor = indexOfMinimum(array, x);

        swap(array, x, menor);
    }
};



//primeiro array
var array = [22, 11, 99, 88, 9, 7, 42];
selectionSort(array);

Program.assertEqual(array, [7, 9, 11, 22, 42, 88, 99]);


//segundo array
var array2 = [-5, 8, 55, 250, -40, 99, 420];
selectionSort(array2);

Program.assertEqual(array2, [-40, -5, 8, 55, 99, 250, 420]);


