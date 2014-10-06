

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
				},
				'snow/:id': function(){
					//name == 'bob';
					//var id = document.getElementById(id);
					favMovApp.sections.toggle('top');
					console.log('BLAAA')
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
					// from her we'll Check if user has visited this page before
					// function to Create cookie
					function createCookie(name,value,days) {
						if (days) {
						  var date = new Date();
						  date.setTime(date.getTime()+(days*24*60*60*1000));
						  var expires = "; expires="+date.toGMTString();
						}else var expires = "";
							document.cookie = name+"="+value+expires+"; path=/";
					}
					
					//fnuction to read cookie
					function readCookie(name) {
						var nameEQ = name + "=";
						var ca = document.cookie.split(';');
						for(var i=0;i < ca.length;i++) {
						  var c = ca[i];
						  while (c.charAt(0)==' ') c = c.substring(1,c.length);
						  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
						}
					  return null;
					}
					
					//readCookie variable
					var visited = readCookie('firstTime');
					console.log(document.cookie)
					
					//Check if user has visited this page before
					if (visited) {
						console.log('visited')
						//if user has visited page check for local Stored Data support
						if(window.localStorage) {
							console.log('has local storage')
							//if local Stored Data is available and is not older than 1 min
							if( (new Date().getTime() - JSON.parse(localStorage['localData']).timestamp < 60000 ) ) {
								console.log('data is same as local storage')
								//Display local data
								localDataRender();
							}else {
								console.log('data is depricated, load API data')
								APIDataRender();
							}
						}else {
							console.log('has no local storage')
							APIDataRender();
						}
					}else{
						console.log('first time, load APIData')
						APIDataRender();
						createCookie('firstTime','no',0);
					}
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


