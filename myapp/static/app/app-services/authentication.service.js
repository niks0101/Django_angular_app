(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService', 'Base64Service'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService, Base64Service) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = {success: true};
                        } else {
                            response = {success: false, message: 'Username or password is incorrect'};
                        }
                        callback(response);
                    });
            }, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        function SetCredentials(username, password) {
            var authdata = Base64Service.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, {expires: cookieExp});
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }


})();