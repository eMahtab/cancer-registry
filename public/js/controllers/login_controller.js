var appControllers=angular.module('appControllers',['appConstants']);


appControllers.controller('LoginController',function($rootScope,$scope,UserFactory,$http,$state,toaster,$window){

     $scope.loginData={};

     $scope.login=function login(){
             console.log("Logging in "+$scope.loginData.username+"  -  "+$scope.loginData.password);
             UserFactory.login($scope.loginData.username,$scope.loginData.password)
             .then(function success(response) {
               console.log("Login was successfull "+response.data.username);
               $window.localStorage.setItem('username',response.data.username);
               $rootScope.loggedUser=response.data.username;
               $state.go('form');
             }, handleError);
           }
    function handleError(response) {
          toaster.pop('error',"Invalid username or password");
    }
});
