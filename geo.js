//Calculate distance from a list of cities

var csv = require('csv');
var fs = require('fs');
var _ = require ('underscore');


var citiesToMapTo = [];
var mappings = [];


//Calculate the distance between two coordinates (http://www.movable-type.co.uk/scripts/latlong.html)
var calcDistance = function(lat1,lon1,lat2,lon2){
  var R = 3949.99; // pulled from http://en.wikipedia.org/wiki/Earth_physical_characteristics_tables
  var dLat = (lat2-lat1)*(Math.PI/180);
  var dLon = (lon2-lon1)*(Math.PI/180);
  lat1 = lat1*(Math.PI/180);
  lat2 = lat2*(Math.PI/180);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
Iterate through all cities, map them to the closest city that's already been mapped

If a city doesn't map to another city in the list it maps to itself.
**/
var mapAllCities = function(){
  var distanceThreshold = 50; //miles

  _.each(citiesToMapTo, function(city,index){
    var closestCity = city.name;
    var closestCityDistance = 1000;
    _.each(mappings, function(mapTo){
      if(mapTo.name === mapTo.closestCity){
        var distance = calcDistance(city.coords[0], city.coords[1], mapTo.coords[0],mapTo.coords[1]);

        if(distance < distanceThreshold && distance < closestCityDistance ){
          closestCity = mapTo.name;
          closestCityDistance = distance;
        }
      }
    });
    mappings.push({name:city.name, coords:city.coords, closestCity:closestCity});
  });
  console.log(mappings);
  return mappings;
};

//Code enty point. Read the CSV, do the data transformation, and then write the results to a new file.
csv().from.stream(fs.createReadStream('/Users/jakeseip/Desktop/locations.csv')).on('record', function(row){
  citiesToMapTo.push({coords:[row[2]*1,row[3]*1], name: row[1]});
}).on('end', function(count){
  console.log('Parsed ', count, 'lines');
  mapAllCities();

  ///Write the results
  csv().from(mappings).to(fs.createWriteStream('/Users/jakeseip/Desktop/locationMappings.csv'));
}).on('error', function(err){console.log("ERROR:", err);});

