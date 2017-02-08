'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', [
  'ngRoute',
    'ngCookies',
    'myApp.home',
  'myApp.login',
  'myApp.signup',
    'myApp.project',
    'myApp.contact',
    'myApp.booking',
    'myApp.gallery',
  'myApp.version',
 'pascalprecht.translate',// angular-translate
 'tmh.dynamicLocale'// angular-dynamic-locale
])
app.constant('LOCALES', {
    'locales': {
        'ru_RU': 'Русский',
        'en_US': 'English'
    },
    'preferredLocale': 'en_US'
})
app.config(['$locationProvider', '$routeProvider','$interpolateProvider','$translateProvider','tmhDynamicLocaleProvider', function($locationProvider, $routeProvider,$interpolateProvider,$translateProvider,tmhDynamicLocaleProvider) {

    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useStaticFilesLoader({
        prefix: static_url+'app/resources/locale-',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('en_US');// is applied on first load
    $translateProvider.useLocalStorage();//saves selected language to localStorag
    tmhDynamicLocaleProvider.localeLocationPattern(static_url+'bower_components/angular-i18n/angular-locale_[[locale]].js');


    $locationProvider.hashPrefix('!');

    $interpolateProvider.startSymbol('[[').endSymbol(']]');
    $routeProvider
        .when("/", {
            templateUrl : static_url + "app/gallery/gallery.html",
            controller:'GalleryCtrl'
        })
        .when("/gallery", {
            templateUrl : static_url + "app/gallery/gallery.html",
            controller:'GalleryCtrl'
        })
         .when("/project/:id", {
            templateUrl : static_url + "app/project/project.html",
            controller:'ProjectCtrl'
        })
        .when("/booking", {
            templateUrl : static_url + "app/booking/booking.html",
            controller:'BookingCtrl'
        })
        .when("/contact", {
            templateUrl : static_url + "app/contact/contact.html",
            controller:'ContactCtrl'
        })
        .when("/login", {
            templateUrl : static_url + "app/login/login.html",
            controller:'LoginCtrl'
        })
        .when("/signup", {
            templateUrl : static_url + "app/signup/signup.html",
            controller:'SignUpCtrl'
        }).otherwise({redirectTo: '/'});
}]);
app.run(function ($rootScope,$location,$cookies ,$http) {
    // keep user logged in after page refresh
    //$location.path('/signup');
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        $rootScope.activetab=$location.$$path;
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/!/login', '/signup']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });

   /* $rootScope.user = {};
    $rootScope.userloggedin=false;
    $rootScope.logoutUser=function () {
        $rootScope.userloggedin=false;
        $location.path("/login");
    }*/
    $rootScope.mediaobject={"media":[
        { "mediaheading":"John Doe","mediacontent":"Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "mediaimgsrc":"http://www.w3schools.com/bootstrap/img_avatar3.png" },
        { "mediaheading":"John Doe","mediacontent":"Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "mediaimgsrc":"http://www.w3schools.com/bootstrap/img_avatar3.png" },
        { "mediaheading":"John Doe","mediacontent":"Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "mediaimgsrc":"http://www.w3schools.com/bootstrap/img_avatar3.png" },
    ]};
});


// I act a repository for the remote friend collection.
app.service(
    "httpServerService",
    function( $http, $q ) {

        var rootURL = 'https://jsonplaceholder.typicode.com';

        // Return public API.
        return({
            postData: postData,
            get: get,
            remove: remove
        });
        // ---
        // PUBLIC METHODS.
        // ---
        // I add a friend with the given name to the remote collection.
        function postData(obj) {
            var request = $http({
                method: "post",
                url: rootURL+"/posts",
                data: {
                    obj: obj
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        // I get all of the friends in the remote collection.
        function get(obj) {
            var request = $http({
                method: "get",
                url: rootURL+"/posts/1",
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        // I remove the friend with the given ID from the remote collection.
        function remove( obj ) {
            var request = $http({
                method: "delete",
                url: rootURL+"/posts/1",
                params: {
                    action: "delete"
                },
                data: {
                    id: obj
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        // ---
        // PRIVATE METHODS.
        // ---
        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (! angular.isObject( response.data ) || ! response.data.message) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
            return( response.data );
        }
    }
);

app.controller('headerCtrl', ['UserService', 'ProjectService','$rootScope','$scope',function (UserService, ProjectService,$rootScope,$scope) {
    console.log("header controller initialised");
    $scope.user = null;
    $scope.allUsers = [];
    $scope.deleteUser = deleteUser;
    initController();
    function initController() {
        loadCurrentUser();
        loadAllUsers();
        loadProjects();
    }
    function  loadProjects() {
        ProjectService.GetAllProjects()
            .then(function (projectList) {
                $scope.projects = projectList;
            });
    }
    function loadCurrentUser() {
        UserService.GetByUsername($rootScope.globals.currentUser.username)
            .then(function (user) {
                $scope.user = user;
            });
    }

    function loadAllUsers() {
        UserService.GetAll()
            .then(function (users) {
                $scope.allUsers = users;
            });
    }

    function deleteUser(id) {
        UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
    }
}

]);