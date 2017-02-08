/**
 * Created by Apple on 1/27/17.
 */
'use strict';
app.factory('signupService',['httpServerService' ,function(httpServerService) {
    return {
        registerUser: function (userObject) {
            return httpServerService.postData(userObject);
        }
    }

}]);