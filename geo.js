//Calculate distance from a list of cities

var csv = require('csv');
var fs = require('fs');

var calcDistance = function(lat1,lon1,lat2,lon2){
  //haversine formula borrow from http://www.movable-type.co.uk/scripts/latlong.html

  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  lat1 = lat1.toRad();
  lat2 = lat2.toRad();

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
};


//Real CSV parsing done here
csv().from.stream(fs.createReadStream('/Users/jakeseip/Desktop/zip_codes_states.csv'))//__dirname+
.to.path(__dirname+'/loadsWithDistance.csv').on('record', function(row){
  console.log(row);
}).on('end', function(count){
  console.log('Number of lines: '+count);
}).on('error', function(err){console.log("Error:", err);});
