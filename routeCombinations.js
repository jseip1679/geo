//Calculate distance from a list of cities
var csv = require('csv');
var fs = require('fs');
var _ = require ('underscore');


var cities = [];
var combinations = [];
var loadTypes = ["Van", "Reefer", "Flatbed"];

var createCombinations = function(){
  _.each(cities, function(originCity){
    _.each(cities, function(endCity){
      if(originCity != endCity){
        _.each(loadTypes, function(loadType){
          combinations.push([originCity,endCity,loadType]);
        });
      }
    });
  });
  console.log(combinations);
};


//Code enty point. Read the CSV, do the data transformation, and then write the results to a new file.
csv().
  from.stream(fs.createReadStream('/Users/jakeseip/Desktop/target_cities.csv')).on('record', function(row){
    cities.push(row[0]);
  }).on('end', function(count){
    console.log('Parsed ', count, 'lines');
    console.log(cities);
    createCombinations();

  ///Write the results
    csv().
      from(combinations).to(fs.createWriteStream('/Users/jakeseip/Desktop/routeCombinations.csv')).
      on('error', function(err){console.log("ERROR:", err);});
  }).on('error', function(err){console.log("ERROR:", err);});

