var zombie = angular.module("Zombie", ["validateForm"]);

zombie.controller("createAccount", function($scope,$http,$timeout,$window) {
	$scope.createAccount = function(valid) {
		$scope.title = ": Creating Account...";
		if (valid) {
			$http.post("/createAccount", $scope.form)
				.success(function(data){
					$scope.errorFlag = data.flag;
					$scope.errorMsg = data.msg;
					$scope.title = data.title;
					if (!data.flag) {
						$timeout(function() {
							$window.location.href = "/";
	    					$scope.$apply();
						},2000);
					}
				})
				.error(function(data,status){
					$scope.errorFlag = true;
					$scope.errorMsg = "There was an error... your account was not created.";
				});
		}
	}
});

zombie.controller("login", function($scope,$http,$timeout,$window) {
	$scope.login = function(valid) {
		$scope.title = ": Logging In...";
		if (valid) {
			$http.post("/login", $scope.form)
				.success(function(data) {
					$scope.errorFlag = data.flag;
					$scope.errorMsg = data.msg;
					$scope.title = data.title;
					if (!data.flag) {
						$timeout(function() {
							$window.location.href = "/";
	    					$scope.$apply();
						},2000);
					}
				})
				.error(function(data,status) {
					$scope.errorFlag = true;
					$scope.errorMsg = "There was an error... you were not logged in.";
				});
		}
	}
});

function init($scope) {
	io.on("coords", function(data) {
		var list = [];
		for (var i=0; i<data.name.length; i++) {
			list.push({name:data.name[i].name});
		}
		$scope.getPlayer = function(obj) {
			return obj.name;
		}
		$scope.players = list;
		$scope.$apply();
	});
}

zombie.controller("move", function($scope,$window) {
	io.on("updateHP", function(data) {
		$scope.hpBar = {width:((data.hp / data.maxHP)*100)+"%"}
		$scope.currentHP = data.hp;
		$scope.maxHP = data.maxHP;
		$scope.$apply();
	});
	io.on("location", function(data) {
		if (data.check == null) {
			$window.location.href = "/logout";
		}
		$scope.location = data.loc;
		$scope.$apply();
	});
	io.on("coords", function(data) {
		var list = [];
		for (var i=0; i<data.name.length; i++) {
			list.push({name:data.name[i].name});
		}
		$scope.getPlayer = function(obj) {
			return obj.name;
		}
		$scope.players = list;
		$scope.$apply();
	});
	$scope.move = function(direction) {
		$scope.title = ": Traveling";
		io.emit("move", {direction:direction});
	}
});

angular.module('validateForm', []).directive('validMatchingPassword', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.createForm.password.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            });
        }
    }
});