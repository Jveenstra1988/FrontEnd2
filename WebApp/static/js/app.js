

//namespace
var webApp = webApp || {};

//self executing anonymous function
(function(){
	
	//controller object (literal)
	webApp.controller = {
		init: function(){
			webApp.router.init()
		}
	}
	
	//router object (literal)
	webApp.router = {
		init: function(){
			routie({
				'about': function() {
					console.log('You clicked about')
				},
				'movies': function() {
					console.log('You clicked movies')
				}
			})
		}
	}
	
	//execute
	webApp.controller.init()
	
//end of self executing anonymous function
})();


