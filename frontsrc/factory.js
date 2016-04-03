const app = require('./app.js');

app
.factory('Scaffold', ($rootScope, $http) => {
  const _this = {};
  _this.getConfig = $http.get('./?type=json');
  /* .then(function(a){
    $rootScope.models = a;
    _this.models = a;
  }); */
  _this.getModelpage = (name, page) => {
    const promise = $http.get(`./?model=${name}&page=${page}&type=json`);
    return promise;
  };


  return _this;
});
