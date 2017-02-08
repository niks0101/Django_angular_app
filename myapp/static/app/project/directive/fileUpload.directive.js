/**
 * Created by Apple on 2/2/17.
 */
(function () {
    'use strict';

    angular.module('myApp.project', [])
        .directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])

})()