

//namespace
var favMovApp = favMovApp || {};

//self executing anonymous function
(function(){
		
	//controller object (literal)
	favMovApp.controller = {
		init: function(){
			favMovApp.router.init()
			favMovApp.sections.init()
		}
	}
	
	//router object (literal)
	favMovApp.router = {
		init: function(){
			routie({
				'': function(){
					document.querySelector('nav a').classList.remove('active');
					document.querySelector('.home').classList.add('active');
					
					// change url to / and render content
					favMovApp.sections.toggle('welkom');
				},
				'about': function() {
					document.querySelector('a').classList.remove('active');
					document.querySelector('.about').classList.add('active');
					
					// change url to /#about and render content
					favMovApp.sections.toggle('about');
				},
				'movies': function() {
					document.querySelector('a').classList.remove('active');
					document.querySelector('.movies').classList.add('active');
					
					// change url to /#movies and render content
					favMovApp.sections.toggle('movies');
				},
				'snow': function() {
					document.querySelector('a').classList.remove('active');
					document.querySelector('.snow').classList.add('active');
					document.querySelector('table').classList.add('hidden');
					
					// change url to /#movies and render content
					favMovApp.sections.toggle('snow');
				},
				'snow/:id': function(id){
					favMovApp.sections.toggle('detail-page');
					favMovApp.sections.toggle(id);
					//document.getElementById(id).classList.remove('hidden');
					console.log(id)
				}
			})
		}
	}
	
	//sections object literal
	favMovApp.sections = {
		// init render functions
		init: function(){
			var data = JSON.parse(localStorage.getItem('localData'));
			if(data == null) {
				console.log('loading api data')
				favMovApp.xhr.trigger('GET', 'http://api.worldweatheronline.com/free/v1/ski.ashx?q=45.318538%2C%206.539578&format=json&includelocation=yes&lang=lang%3DNL&key=1b864d071bccc955a047934b035f3d393bf128f3', this.snow);
				document.getElementById('dataFeedback').innerHTML = "API data (updated "+ new Date() +")";
				
			} else {
				console.log('loading local data')
				this.snow(data);
				document.getElementById('dataFeedback').innerHTML = "Local data (old)";
			}

			this.about()
			this.movies()
			//this.detail()
		},
		about: function(){
			// render with transparency
			Transparency.render(document.getElementById('about'), favMovApp.content.about);
		},
		movies: function(){
			// render with transparency
			Transparency.render(document.getElementById('renderSnowMovies'), favMovApp.content.snowmovies, directives);
		},
		snow: function(obj, filter){
			localStorage.setItem('localData', JSON.stringify(obj));
			
			
			obj = JSON.parse(obj);
			//console.log(obj);
			
			
			_.map(obj, function(obj){
				//console.log(obj);
				var evens = _.filter(obj, function(obj){
					
				});
				
				console.log(top);
			});
			
			Transparency.render(document.getElementById('renderSnow'), obj.data);
			
			for (i=0; i < obj.data.weather[0].hourly.length; i++){
				Transparency.render(document.getElementById('renderDetail'), obj.data);
			}
		},
		bottom: function(){
			Transparency.render(document.getElementById('renderDetail'), obj.data);
		},
		// toggle active class on sections
		toggle: function(section){
			// search for sections
			var elements = document.getElementsByTagName('section');
			
			// check for classes
			for(var i in elements){
				// if hass classes remove class active
				if(elements[i].classList)
					elements[i].classList.remove('active');
			}
			// add class active to sections
			if(document.getElementById(section))
				document.getElementById(section).classList.add('active');
		}
	}
	
	//execute
	favMovApp.controller.init()
	
//end of self executing anonymous function
})();


