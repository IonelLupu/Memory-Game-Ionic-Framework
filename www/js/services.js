angular.module('starter.services', [])

.service('Game', function() {
	
	return {
		time:  0,
		icons: [],

		levels : [
			{
				name:        "Usor",
				time:        60,
				description: "Description Usor",
				points:      20,
				boardSize:   4
			},
			{
				name:        "Mediu",
				time:        200,
				description: "Description Medium",
				points:      30,
				boardSize:   5
			},
			{
				name:        "Greu",
				time:        300,
				description: "Description Greu",
				points:      45,
				boardSize:   6
			}
		],

	startLevel: function( level ){

		this.level        = this.levels[level];
		this.time         = this.level.time;

		return this.level;
	},
	setIcons: function( icons ){

		this.icons        = icons;
	},

	updateTime: function(){

		return this.time -= 1;
	},
	getCards: function(){

		var level = this.level;

		var cards = [];
		// build the matrix
		var icons = [];
		for( var i = 1; i <= (level.boardSize * level.boardSize) / 2 ; i++ ){

			var icon = Math.floor((Math.random() * this.icons.length));
			icons.push(icon);
			icons.push(icon);
		}
		for( var i = 1; i <= level.boardSize ; i++ ){

			var row = [];
			for( var j = 1; j <= level.boardSize ; j++ ){

				var icon = Math.floor(Math.random()*icons.length);

				row.push({
					icon : this.icons[ icons[icon] ],
					show : false
				})

				// delete found icon
				var index = icons.indexOf(icons[icon]);
    			icons.splice(index, 1);
			}

			cards.push( row )
		}

		return cards;

	},

	};
});
