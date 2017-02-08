'use strict';
app.controller('SignUpCtrl', ['$scope','$rootScope','$location','UserService','FlashService',function($scope,$rootScope,$location,UserService,FlashService) {
    $scope.user={};
    $scope.register=function () {
            if($scope.registerform.$valid)
            {
                $scope.dataLoading = true;
                UserService.Create($scope.user)
                    .then(function (response) {
                        if (response.success) {
                            FlashService.Success('Registration successful', true);
                            $location.path('/login');
                        } else {
                            FlashService.Error(response.message);
                            $scope.dataLoading = false;
                        }
                    });
            }

 }
}]);
