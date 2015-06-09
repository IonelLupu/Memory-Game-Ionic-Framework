angular.module('starter.directives', [])

.directive('card', function() {
	return {
		scope: {
			icon: '=',
		},
		// template: '<span class="gameCard-back"></span> <span><img src="{{ icon }}"/></span>'
		template: '<span class="gameCard-back"></span> <span style="background:{{ icon }}"></span>'
 	};
});