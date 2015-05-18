var timerApp = angular.module("timerApp", ["ngRoute"]);
			
timerApp.config(function($routeProvider) {
	$routeProvider.
		when("/", {
			templateUrl : "select.html",
			controller : "SelectController"
		}).
		when("/displayCount", {
			templateUrl : "displayCount.html",
			controller : "DisplayCountController"
		}).
        otherwise({
            redirectTo: '/'
        });
});

timerApp.controller("SelectController", function($scope) {
	$scope.seconds = 0;
	$scope.minutes = 0;
	$scope.hours = 0;
	
	$scope.secondArray = [];
	$scope.minuteArray = [];
	$scope.hourArray = [];
	
	for (var i = 0; i < 60; i++){
		$scope.secondArray.push(i);
		$scope.minuteArray.push(i);
		if (i < 24) {
			$scope.hourArray.push(i);
		};
	};
});

timerApp.controller("DisplayCountController", function($scope) {
	console.log($scope.hours);
});
