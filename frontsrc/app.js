const angular = require('angular');
require('angular-ui-router');


function modelIndexCtrl($scope, $state, $stateParams, Scaffold) {
  const vm = this;
  vm.state = $state.current;
  vm.params = $stateParams;
  Scaffold.getConfig.then(models => {
    vm.model = models.data.find(m => m.model === $stateParams.name);
    vm.models = models;

    vm._page = $stateParams.page || 0;
    Scaffold.getModelpage(vm.model.table, vm._page)
    .then((resp) => {
      vm.totalResults = resp.data.totalResults['count(*)'];
      vm.totalPages = Math.floor(vm.totalResults / 10);
      vm.pages = [];
      const _from = Math.max(0, vm._page - 5);
      const _to = Math.min(vm.totalPages, _from + 10);
      for (let p = _from; p < _to; p += 1) {
        vm.pages.push(p);
      }

      vm.rows = resp.data.rows.map(r => Object.keys(r).map(k => r[k]));
    });
  });
}

const app = angular.module('mysqlScaffold', ['ui.router']);
app
.config(($stateProvider, $urlRouterProvider) => {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/state1');
  //
  // Now set up the states

  $stateProvider
  .state('state1', {
    url: '/state1',
    template: 'dsd',
  });
  $stateProvider
  .state('modelIndex', {
    controller: modelIndexCtrl,
    controllerAs: 'vm',
    url: '/model/:name?:page',
    template: require('./model.index.html'),
  });
});

module.exports = app;
