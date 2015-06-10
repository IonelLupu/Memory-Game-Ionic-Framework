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

.controller('GameController', function($scope, $ionicHistory, $state, $window, Game) {

	//////////////
	// THE GAME //
	//////////////
	$ionicHistory.nextViewOptions({
	   disableBack: true
	});


	$scope.showMenu = function(){

		clearInterval( count );
		$state.go('main');
	}

	$scope.newBoard = function(){

		if( $scope.cards != undefined)
			setTimeout(function(){

				for(r in $scope.cards){
					for(c in $scope.cards[r]){
						$scope.cards[r][c].show = false;
					}
				}
				$scope.$apply();

			},300)

		setTimeout(function(){

			$scope.cards     = Game.getCards();
			$scope.$apply();
		},700)
		
		lastCard         = undefined;
		$scope.cardStyle = $scope.getCardStyle()
		hiddenCards      = ($scope.level.boardSize * $scope.level.boardSize) / 2;

	}

	$scope.newGame = function(){
		$scope.level = Game.startLevel( $state.params.level );

		$scope.score     = 0;
		$scope.gameStop  = false;
		$scope.time      = $scope.level.time;

		var wait        = false;

		clearInterval(count);

		$scope.newBoard();

		// update the game's timer
		count = setInterval(function(){

			$scope.time = Game.updateTime();

			if( $scope.time == 0 ){
				$scope.gameStop = true;
				clearInterval(count);
			}

			$scope.$apply();
		},1000)

	}

	$scope.getCardStyle = function (){
		var width  = window.innerWidth;
		var height = window.innerHeight;

		var low = Math.min(width,height)

		console.log(low,width,height);

		return {
			width:  ( ( low / $scope.level.boardSize ) - 20 ) +"px",
			height: ( ( low / $scope.level.boardSize ) - 20 ) +"px"
		}
	}

	Game.setIcons([
		'red',
		'blue',
		'yellow',
		'cyan',
		'black',
		'magenta',
		'pink',
		'purple',
		'green',
		'brown',
		'navy',
		'silver',

	]);

	$scope.newGame();

	$scope.level = Game.startLevel( $state.params.level );

	var wait        = false;
	var count;

	// setTimeout(function(){
	// 	$scope.gameStop = true;
	// 	$scope.$apply();
	// },1600)

	$scope.checkCard = function(row,col){

		// we have to stop the player for clicking
		// on card so we can finish all the actions
		if( wait )
			return;

		var card = $scope.cards[row][col];

		// if the card is already visible we will just
		// return because this card was already checked
		if( card.show == true )
			return;

		// show the card to the player
		card.show = true;

		// we can't check the current card against and
		// undefined card so we will just return here
		// and save the card as the last card
		if( lastCard == undefined ){

			lastCard = card;
			return;
		}

		
		// if the player didn't guess the card we will 
		// toggle back the last and the current cards
		if( card.icon != lastCard.icon ){

			wait = true;
			setTimeout(function(){
				wait      = false;
				card.show = lastCard.show = false;
				$scope.$apply();
				lastCard = undefined;
			},500)
			return ;
		}

		// if the current picked card has the same icon with
		// the last picked card we will submit the changes
		// and reset the lastCard to undefined so the 
		// player can start again guessing another cards
		lastCard            = undefined;

		// Also increase the player's score
		$scope.score       += $scope.level.points;

		// Decrease the number of hidden cards so we ca show the
		// finish splash screen after the player finished the game
		hiddenCards -- ;
		console.log( hiddenCards );
		if( hiddenCards <= 0 )
			$scope.newBoard();

	}

})
