var app = require('./app.js');

app
.component('modelsNav', {
    controller: function($rootScope, $scope, $http, $state) {
      $http.get('./?type=json')
      .then(function(a){
        $scope.models = a.data;
      });
      // $scope.selectedModel = $stateParams.name;
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        debugger;
      });
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    debugger;
    });

    },
    template: `
      <ul class="nav nav-sidebar">
        <li ng-repeat="item in models" ui-sref-active="active"
        ui-sref="modelIndex({name:item.model})">
          <a>{{item.model}}</a>
        </li>
      </ul>
    `
});
/*
ul.nav.nav-sidebar
  each e in schema
    li
      a(ui-sref="modelindex")= e.model
*/
