/**
 * Created by Apple on 2/2/17.
 */
/**
 * Created by Apple on 1/31/17.
 */
(function () {
    'use strict';
     'use strict';

    angular.module('myApp').service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl){
               var fd = new FormData();
               fd.append('file', file);

               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })

               .success(function(){
               })

               .error(function(){
               });
            }
         }]);

})()