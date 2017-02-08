'use strict';

var app=angular.module('myApp.booking', ['ngRoute']);
app.controller('BookingCtrl', ['$scope','$rootScope','$location',function($scope,$rootScope,$location) {
$scope.user={};
$scope.bookRoom=function () {


    console.log($scope.user);
}


}]);