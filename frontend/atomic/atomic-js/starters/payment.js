let test = 
require.ensure([], function(require){
    require('../config/config.js');
});


console.log('***** I AM a *****');

console.log("testTwo.myUtil" , test);