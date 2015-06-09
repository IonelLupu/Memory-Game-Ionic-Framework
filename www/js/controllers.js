angular.module('starter.controllers', [])

.controller('MainController', function($scope, $ionicHistory, $state, Game) {

	
	/////////////////
	// MENU SCREEN //
	/////////////////

	$ionicHistory.nextViewOptions({
	   disableBack: true
	});

	

	$scope.gameLevels = Game.levels;

	$scope.startGame = function(level){
		$state.go('game',{level: level});
	}
})

.controller('GameController', function($scope, $ionicHistory, $state, Game) {

	//////////////
	// THE GAME //
	//////////////
	$ionicHistory.nextViewOptions({
	   disableBack: true
	});

	Game.setIcons([
		"red",
		"blue",
		"yellow",
		"cyan",
		"black",
		"magenta",
		"pink",
		"purple"
	]);

	$scope.level = Game.startLevel( $state.params.level );
	$scope.score = Game.score;
	$scope.time  = Game.time;
	$scope.cards = Game.getCards();

	setInterval(function(){
		$scope.time = Game.updateTime();
		$scope.$apply();
	},1000)

	$scope.newGame = function(){
		$state.go('main');
	}


	$scope.checkCard = function(row,card){

		console.log(row,card);
	}

})
