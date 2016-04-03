/*jslint node: true */
'use strict';
var Q = require('q');

var mysql = require('mysql');
var _config;
_config = {
  host     : 'localhost',
  user     : 'root',
  charset : 'latin1',
  password : '123456',
  database : 'test',
  connectionLimit: 10
};

var _pool = mysql.createPool(_config);

var runquery = function() {
  var deferred = Q.defer();
  var args = Array.prototype.slice.call(arguments);

  //console.log(args);
  args.push(function(err, results){
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(results);
    }
  });

  _pool.query.apply(_pool, args);

  return deferred.promise;
};


module.exports = runquery;
