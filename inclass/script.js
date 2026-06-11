let numbers= [1,2,3,2,4,2,5,1,1,1];

let a= numbers.reduce(function(acc, val){
    acc[val]= (acc[val] || 0) +1;
    return acc;
},{})

console.log(a);
