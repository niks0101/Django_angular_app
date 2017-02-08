/**
 * Created by Apple on 1/27/17.
 */
/**
 * Created by Apple on 1/27/17.
 */
'use strict';
var app=angular.module('myApp.login', []);
app.factory('loginService',['httpServerService' ,function(httpServerService) {
    return {
        authenticateUser: function (userObject) {
            return httpServerService.postData(userObject);
        }
    }

}]);