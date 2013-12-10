'use strict';


// Declare app level module which depends on filters, and services
angular.module('siteApp', ['siteServices', 'directives', 'ui']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when(
            '/',
            {
                templateUrl: 'partials/home_1.html',
                controller: MobileController
            }
        );
    }
]);
