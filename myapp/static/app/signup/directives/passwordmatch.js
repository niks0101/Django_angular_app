/**
 * Created by Apple on 1/27/17.
 */
'use strict';
var app=angular.module('myApp.signup', []);
app.directive('passwordMatch', function() {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, elem, attrs) {
            elem.bind("change", function() {
                console.log("change event");
                if(scope.user.password==scope.user.confirmpassword)
                {
                    scope.passwordmatch=true;
                }else
                {
                    scope.passwordmatch=false;
                }
                scope.$apply()
            });

        }
    };
});