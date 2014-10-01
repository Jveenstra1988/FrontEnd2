

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
					
					// change url to /#movies and render content
					favMovApp.sections.toggle('snow');
				}
			})
		}
	}
	
	//sections object literal
	favMovApp.sections = {
		// init render functions
		init: function(){
			this.about()
			this.movies()
			this.snow()
		},
		about: function(){
			// render with transparency
			Transparency.render(document.getElementById('about'), favMovApp.content.about);
		},
		movies: function(){
			// render with transparency
			Transparency.render(document.getElementById('renderSnowMovies'), favMovApp.content.snowmovies, directives);
		},
		snow: function(){
			var xhr = {
				trigger: function(){
					var req = new XMLHttpRequest();
					var url = "http://api.worldweatheronline.com/free/v1/ski.ashx?q=45.318538%2C%206.539578&format=json&includelocation=yes&lang=lang%3DNL&key=1b864d071bccc955a047934b035f3d393bf128f3";
					
					req.onreadystatechange = function() {
						if (req.readyState == 4 && (req.status == 200 || req.status == 201)) {
							var snow = JSON.parse(req.responseText);
							
							Transparency.render(document.getElementById('renderSnow'), snow.data);
							
							for (i=0; i < snow.data.weather[0].hourly.length; i++){
								var snowData = snow.data.weather[0].hourly[i].top[0].weatherIconUrl[0].value;
								var tds = document.getElementsByTagName('td');
								
								console.log(snowData)
							}
						}
					}
					req.open("GET", url, true);
					req.send();
				}
			}
			xhr.trigger()
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


