'use strict';

/* Controllers */


function MobileController($scope, $routeParams, $location) {
    //TODO: Create directive for this !
    jQuery('[data-hover="dropdown"]').dropdownHover();

    if ($location.search()['url']) {
        $scope.frame_url = $location.search()['url'];
        $scope.preview_url = $scope.frame_url;
    } else {
        $scope.frame_url = "http://twitter.github.com/bootstrap/";
    }
    //$scope.frame_url = $scope.preview_url;
    //$location.search('url', $scope.frame_url);

    //Init screen size
    if ($location.search()['width'] && $location.search()['height']) {
        $scope.preview_width = parseInt($location.search()['width']);
        $scope.preview_height = parseInt($location.search()['height']);
    } else {
        $scope.preview_width = 320;
        $scope.preview_height = 480;
    }

    // 1 - landscape
    // 0 - portrait
    $scope.active = 1;
    $scope.preview_class = "landscape";

    var buil_attrs = function(attr) {
        return attr + "px";
    }

    $scope.preview_styles = function() {
        return {
            "width": buil_attrs($scope.preview_width),
            "height": buil_attrs($scope.preview_height)
        };
    }

    $scope.apply_changes = function(width, height, reset_rotate) {

        if (width && height) {
            $scope.preview_width = width;
            $scope.preview_height = height;
        }

        if (reset_rotate) {
            if (!$scope.active) {
                $scope.preview_height = width;
                $scope.preview_width = height;
            }
        }

        if($scope.preview_url) {
            if($scope.preview_url.substring(0, 4) != "http") {
                $scope.preview_url = "http://" + $scope.preview_url;
            }
            if($scope.frame_url != $scope.preview_url) {
                $scope.frame_url = $scope.preview_url;
                $location.search('url', $scope.frame_url);
            }
        }

        $scope.preview_styles['width'] = buil_attrs($scope.preview_width);
        $scope.preview_styles['height'] = buil_attrs($scope.preview_height);

    }

    $scope.apply_rotate = function(){
        if($scope.active) {
            $scope.active = 0;
            $scope.preview_class = "portrait";
        } else {
            $scope.active = 1;
            $scope.preview_class = "landscape";
        }
        $scope.apply_changes($scope.preview_height, $scope.preview_width);
    }

}

