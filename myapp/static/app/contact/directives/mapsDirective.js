/**
 * Created by Apple on 1/29/17.
 */
    'use strict';

var app= angular.module('myApp.contact',[]);
app.directive('mapsDirective', function() {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {
            function init_map1(elem) {
                var myLocation = new google.maps.LatLng(attrs.latitude, attrs.longitude);
                var mapOptions = {
                    center: myLocation,
                    zoom: 16
                };
                var marker = new google.maps.Marker({
                    position: myLocation,
                    title: "Property Location"
                });

                var map = new google.maps.Map(elem[0].parentElement,
                    mapOptions);
                marker.setMap(map);
            }
            init_map1(elem);
        }
    };
});