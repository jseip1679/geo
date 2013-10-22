//Calculate distance from a list of cities

var csv = require('csv');
var fs = require('fs');


var comparisonCoordinates = {"San Francisco" : [37.7756, -122.4193]};//WIP

var calcDistance = function(lat1,lon1,lat2,lon2){
  //haversine formula borrowed from http://www.movable-type.co.uk/scripts/latlong.html

  var R = 6371; // km
  var dLat = (lat2-lat1)/(Math.PI/180);
  var dLon = (lon2-lon1)/(Math.PI/180);
  lat1 = lat1/(Math.PI/180);
  lat2 = lat2/(Math.PI/180);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d*0.621371;
};

//Real CSV parsing done here
csv().from.stream(fs.createReadStream('/Users/jakeseip/Desktop/zip_codes_states.csv'))//__dirname+
.to.path(__dirname+'/loadsWithDistance.csv').transform(function(row){
  var dist = calcDistance(row[1],row[2], 37.765704,-122.442069); //WIP
  row.push(dist);
  return row;
}).on('record', function(row){
  console.log(row); //let us see what we parsed through
}).on('end', function(count){
  console.log('Number of lines: '+count);
}).on('error', function(err){console.log("ERROR:", err);});