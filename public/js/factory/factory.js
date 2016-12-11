var appFactory=angular.module('appFactory',['appConstants']);

appFactory.factory('UserFactory', function UserFactory($http,CONSTANT, AuthTokenFactory, $q) {
  'use strict';
  return {
    login: login,
    getUser: getUser
  };

  function login(username, password) {
    return $http.post(CONSTANT.API_URL + '/login', {
      username: username,
      password: password
    },{headers:{'Content-Type': 'application/json'}}).then(function success(response) {
      AuthTokenFactory.setToken(response.data.token);
      return response;
    });
  }

  function getUser() {
    if (AuthTokenFactory.getToken()) {
      return $http.get(CONSTANT.API_URL + '/me');
    } else {
      return $q.reject({ data: 'client has no auth token' });
    }
  }
});



appFactory.factory('AuthTokenFactory', function AuthTokenFactory($window) {
  'use strict';
  var store = $window.localStorage;
  var key = 'auth-token';

  return {
    getToken: getToken,
    setToken: setToken
  };

  function getToken() {
    return store.getItem(key);
  }

  function setToken(token) {
    if (token) {
      store.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  }

});


appFactory.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
  'use strict';
  return {
    request: addToken
  };

  function addToken(config) {
    var token = AuthTokenFactory.getToken();
    if (token) {
      console.log("Adding auth token to request");
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }
});
