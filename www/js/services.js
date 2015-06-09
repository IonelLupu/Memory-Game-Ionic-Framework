angular.module('starter.services', [])

.service('Game', function() {
	
	return {
		time: 0,
		score: 0,

		icons: [],

		levels : [
			{
				name:        "Usor",
				time:        "180",
				description: "Description Usor",
				priceOff:    "20",
				boardSize:   4
			},
			{
				name:        "Mediu",
				time:        "120",
				description: "Description Medi",
				priceOff:    "30",
				boardSize:   6
			},
			{
				name:        "Greu",
				time:        "60",
				description: "Description Greu",
				priceOff:    "45",
				boardSize:   8
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

		for( var i = 1; i <= level.boardSize ; i++ ){
			var row = [];
			for( var j = 1; j <= level.boardSize / 2; j++ ){
				var icon = Math.floor((Math.random() * this.icons.length) + 1);
				row.push({
					icon : this.icons[ icon ],
					tog: 0
				})

				row.push({
					icon : this.icons[ icon ],
					tog: 0
				})
			}
			cards.push( row )
		}


		return cards;

	},

	};
});
