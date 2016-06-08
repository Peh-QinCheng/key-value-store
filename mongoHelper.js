var mongoose = require('mongoose');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/keyvalue';
var keyValue = mongoose.model('keyValue', {key: String, values: Array});



function findDocument(query,callback) {
  mongoose.connect(url);
  keyValue.findOne({key: query.key}, function (err, Obj) {
    if (err) {
      console.log(err);
    } else if (Obj) {
      if (query.timestamp) { // if timestamp provided
        var value = findValue(query.timestamp,Obj.values);
        // var values = Obj.values.filter(function(x){return x.timestamp <= parseInt(query.timestamp)});
        // var bestValue = Math.max.apply(Math,values.map(function(o){return o.timestamp;}));
        // var doc = Obj.values.find(x=> x.timestamp === bestValue);
        // var value = doc ? doc.value : "No value assigned to this key at this time"
      } else { //if no timestamp
        var value = Obj.values.slice(-1).pop().value;
      }
      callback(value)
    } else {
      callback('Object not found!');
    }
    mongoose.connection.close();
  });
}
exports.findDocument = findDocument;


function updateInsertDocument(data,callback) {
  mongoose.connect(url);
  keyValue.findOne({key: data.key}, function (err, document) {
    var timestamp = Date.now();
    if (err) {
      console.log(err);
      mongoose.connection.close();
    } else if (document) {
      document.values.push({value:data.value,timestamp:timestamp});
      saveDocument(document);
      callback(timestamp);
    } else {
      var newEntry = new keyValue({key:data.key,values:[{value:data.value,timestamp:timestamp}]});
      saveDocument(newEntry);
      callback(timestamp);
    }
  });


}
exports.updateInsertDocument = updateInsertDocument;



function findValue(timestamp, values) {
  var filteredValues = values.filter(function(x){return x.timestamp <= parseInt(timestamp)});
  var bestValue = Math.max.apply(Math,filteredValues.map(function(o){return o.timestamp;}));
  var doc = values.find(x=> x.timestamp === bestValue);
  var value = doc ? doc.value : "No value assigned to this key at this time";
  return value
}

function saveDocument(document) {
  document.save(function (err, userObj) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved successfully:', userObj);
    }
    mongoose.connection.close();
  });
}
