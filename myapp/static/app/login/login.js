'use strict';


app.controller('LoginCtrl', ['$scope','$location','$rootScope','AuthenticationService','FlashService',function($scope,$location,$rootScope,AuthenticationService,FlashService) {
    $scope.user={};
    $scope.submitted=false;
    console.log("LoginCtrl intialized");
    $scope.login = function() {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);
                $location.path('/');
            } else {
                FlashService.Error(response.message);
                $scope.dataLoading = false;
            }
        });

    };

}]);
