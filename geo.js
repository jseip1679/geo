//Calculate distance from a list of cities

var csv = require('csv');
var fs = require('fs');

var calcDistance = function(lat1,lon1,lat2,lon2){
  
};

csv().from.stream(fs.createReadStream(__dirname+'/loads.csv'))
.to.path(__dirname+'/loadsWithDistance.csv').on('record', function(row){

});