'use strict';

var app=angular.module('myApp.gallery', ['ngRoute']);
app.controller('GalleryCtrl', ['$scope','$rootScope','$location',function($scope,$rootScope,$location) {

    $scope.mediaObjectList=$rootScope.mediaobject.media;

}]);