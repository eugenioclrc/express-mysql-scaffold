var inflect = require('i')();
var q = require('q');

var runquery = require('./mysql.js');

function scaffoldActions (model) {
  return {
    index: function (req, res) {
      q.all([
        runquery('SELECT * FROM ?? ORDER BY id DESC LIMIT 30', req.query.model),
        runquery('SELECT count(*) FROM ??', req.query.model)
      ])
      .spread(function (rows, totalResults) {
        res.json({ rows: rows, totalResults: totalResults[0] });
      });
    },
    view: function(req, res, next) {},
    add: function(req, res, next) {},
    edit: function(req, res, next) {},
    delete: function(req, res, next) {},
  }
};

var getDbConfig = function () {
  var objects = [];
  return runquery('show tables')
  .then(function (answer) {
    answer.forEach(function (r) {
      var table = r[Object.keys(r)[0]];
      objects.push({
        model: inflect.classify(table),
        table: table,
        foreign_key: inflect.foreign_key(table),
        fields: []
      });
    });
    return objects;
  })
  .then(function () {
    var _promises = objects.map(function (e) {
      return runquery('DESCRIBE ??', e.table)
      .then(function (fields) {
        e.fields = fields;
      });
    });

    return q.all(_promises);
  })
  .then(function () {
    return q(objects);
  });
};

var index = function (req, res, next) {
  getDbConfig().then(function (schema) {
    res.render('scaffold', {
      title: 'Express',
      schema: schema
    });
  });
};

var scaffoldMiddleware = function (req, res, next) {
  var query = req.query;
  if (Object.keys(req.query).length === 0) {
    res.render('scaffold');
  }

  if (!query.model) {
    getDbConfig().then(function (schema) {
      res.json(schema);
    });
  } else {
    var actions = scaffoldActions(query.model);
    var action = query.action || 'index';
    action = !actions[action] ? 'index' : action;

    actions[action](req, res, next);
    // res.end();
  }
};

module.exports = scaffoldMiddleware;
