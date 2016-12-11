var app=angular.module('cancerRegistryApp',
['mgcrea.ngStrap','ngMessages','angular-ladda','toaster','ngAnimate','ui.router',
'appDirectives','appConstants','appFactory','appControllers']);

app.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {dateFormat: 'dd-MM-yyyy',autoclose: true });
});

app.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html'
        })
        .state('form', {
            url: '/form',
            templateUrl: 'templates/form.html',
            controller:function($window,$state){
              console.log("Form State controller is called ");
              console.log("Getting username from local storage "+$window.localStorage.getItem('username'));
              if($window.localStorage.getItem('username') == null){
                console.log("NOT LOGGED IN REDIRECTING TO LOGIN ");
                $state.go('login');
              }
            }
        });
});
