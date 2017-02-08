/**
 * Created by Apple on 2/6/17.
 */
(function () {
    'use strict';

    angular
        .module('myApp').directive('ngTranslateLanguageSelect', function (LocaleService) {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            template: '' +
            '<div class="language-select" ng-if="visible">' +
            '<label style="color: yellow">' +
            '{{"directives.language-select.Language" | translate}}:' +
            '</label> ' +
            '<select  style="color: green;" ng-model="currentLocaleDisplayName"' +
            'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"' +
            'ng-change="changeLanguage(currentLocaleDisplayName)">' +
            '</select>' +
            '</div>' +
            '',
            controller: function ($scope) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                    $scope.localesDisplayNames.length > 1;

                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };
            }
        };
    });
})()