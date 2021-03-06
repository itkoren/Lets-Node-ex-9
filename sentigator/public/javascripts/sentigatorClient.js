var app = angular.module("SentigatorApp", []);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $rootScope) {
        return {
            "request": function(config) {
                $rootScope.$broadcast("loading-started");
                return config || $q.when(config);
            },
            "response": function(response) {
                $rootScope.$broadcast("loading-complete");
                return response || $q.when(response);
            }
        };
    });

});

app.directive("loadingIndicator", function() {
    return {
        restrict : "A",
        template: "<div>Loading...</div>",
        link : function(scope, element, attrs) {
            scope.$on("loading-started", function(e) {
                element.css({"display" : ""});
            });

            scope.$on("loading-complete", function(e) {
                element.css({"display" : "none"});
            });
        }
    };
});

app.controller("SentigatorCtrl", function($scope, $sce, $http) {
    $scope.items = [];
    $scope.sentigator = function() {
        $scope.items.length = 0;
        $http.get("./content?term=" + encodeURIComponent($scope.searchText))
            .success(function(data, status, headers, config) {
                if (data) {
                    $scope.items = $scope.items.concat(data);
                }
            })
            .error(function(data, status, headers, config) {
                
            });
            
        $scope.prevSearchText = $scope.searchText;
        $scope.searchText = "";
    };
    
    $scope.getUtube = function(url) {
        if (url) {
            return $sce.trustAsHtml("<iframe width=\"560\" height=\"315\" src=\"" + url.replace("watch?v=", "embed/").replace("&", "?") + "&html5=1\" frameborder=\"0\" allowfullscreen></iframe>\
                <p>\
                <strong>Download Video:</strong>\
                <a href=\"" + url + "\">Video</a>\
                </p>");
        }

        return;
    };
    
    $scope.getITunes = function(url) {
        if (url) {
            return $sce.trustAsHtml("<audio controls preload=\"none\" style=\"width:480px;\">\
                <source src=\"" + url + "\" type=\"audio/mp4\" />\
                <p>Your browser does not support HTML5 audio.</p>\
                </audio>\
                <p>\
                <strong>Download Audio:</strong>\
                <a href=\"" + url + "\">M4A</a>\
                </p>");
        }

        return;
    };
    
    $scope.getGiphy = function(url) {
        if (url) {
            return $sce.trustAsHtml("<a href=\"" + url + "\">\
                <img src=\"" + url + "\"></img>\
                </a>\
                <p>\
                <strong>Download Image:</strong>\
                <a href=\"" + url + "\">Video</a>\
                </p>");
        }

        return;
    };
    
    $scope.markType = function(item) {
        switch (item.src) {
            case "Twitter":
                return "list-group-item well well-sm";
            case "Google":
                return "list-group-item list-group-item-success";
            case "ITunes":
                return "list-group-item list-group-item-info";
            case "UTube":
                return "list-group-item list-group-item-warning";
            case "Giphy":
                return "list-group-item list-group-item-danger";
            default:
                return "list-group-item";
        }
    };
});