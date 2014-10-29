
//namespace
var JMovApp = JMovApp || {};

//self executing anonymous function
(function(){
	//controller object (literal), starts the app
	JMovApp.controller = {
		init: function() {
			//Load data from api using XMLHttpRequest in content.js, then initiate other objects
			JMovApp.xhr.loadData('http://dennistel.nl/movies', function() {
				JMovApp.sections.init();
				JMovApp.router.init();
				JMovApp.gestures.init();
			});
		}
	};
	
	//router object (literal), navigation with use of routie.js
	JMovApp.router = {
		init: function(){
			//Routie function
			routie({
				// change url to /'whatever is clicked' and activate corresponding section
				'': function() {
    				JMovApp.sections.toggle('about-page');
    			},
				'about': function() {
    				JMovApp.sections.toggle('about-page');
					//close menu
					document.getElementById('menu').classList.remove('show');
    			},
   		 		'movies': function() {
   		 			JMovApp.sections.toggle('movie-page');
					document.getElementById('menu').classList.remove('show');
    			},
    			'movies/genre/?:genre': function(genre) {
					JMovApp.sections.toggle('movie-page');	
			    	JMovApp.sections.movies(JMovApp.content.movies, genre);
					//close filter menu
					document.getElementById('filter').classList.remove('show');
			    },
			    'movies/rating/?:order': function(order) {
					JMovApp.sections.toggle('movie-page');
			    	JMovApp.sections.movies(JMovApp.content.movies, order);
					document.getElementById('filter').classList.remove('show');
			    },
			    'movies/date/?:order': function(order) {
					JMovApp.sections.toggle('movie-page');
			    	JMovApp.sections.movies(JMovApp.content.movies, order);
					document.getElementById('filter').classList.remove('show');
			    },
			    'movie/:movieTitle': function(movieTitle) {
			    	JMovApp.sections.toggle('detail-page');	
			    	JMovApp.sections.detail(JMovApp.content.movies, movieTitle);
					document.getElementById('filter').classList.remove('show');
			    }
			});
		}
	};

	//Data rendering in sections
	JMovApp.sections = {
		init: function() {
			this.about();
			this.movies();
		},
		about: function(){
			//render data in about page from content.js uding namespace
			Transparency.render(document.getElementById('about-page'), JMovApp.content.about, JMovApp.content.directives);
		},
		movies: function(obj, filter) {
			//store data from content.js in variable
			var obj = JMovApp.content.movies;
			console.log(obj);

			//put values from de data in list
			_.map(obj, function(movie) {
				//combine review values to a total
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review) {
					//devide total value trough the amount of values, return average value
					return totalScore + review.score; }, 0) / _.size(movie.reviews);
			});
			//switch
			switch(filter) {
				//filter options
				case 'all':
					JMovApp.sections.toggle('movie-page');
					break;
				case 'horror':
				case 'crime':
				case 'drama':
				case 'thriller':
				case 'action':
				case 'adventure':
					//filter data with given value
					obj = _.filter(obj, function(movie) {
						//convert first character to uppercase & ignore this first character
						filter = filter.charAt(0).toUpperCase() + filter.slice(1);
							//return values that contain given value e.g. thriller
							return (_.contains(movie.genres, filter) === true);
					});
					//stop and move to next function
					break;
				case 'asc':
					//sort data by
					obj = _.sortBy(obj, function(movie) {
						//reviews - default = ascending
						return movie.reviews;
					});
					break;
				case 'desc':
					//sort data by
					obj = _.sortBy(obj, function(movie) {
						//reviews - reverse order
						return movie.reviews * -1;
					});
					break;	
				case 'date-asc':
					//sort data by
					obj = _.sortBy(obj, function(movie) {
						//date - release date - default is ascending
						return Date.parse(movie.release_date);
					});
					break;
				case 'date-desc':
					//sort by
					obj = _.sortBy(obj, function(movie) {
						//date - reverse order
						return Date.parse(movie.release_date) * -1;
					});
					break;
				default:
					//No filter - show all
					break;
				}
			//render data, possibly filtered by switch
			Transparency.render(document.getElementById('movies'), obj, JMovApp.content.directives);
		},
		detail: function (obj, movieTitle) {
			var obj = JMovApp.content.movies;		

			_.map(obj, function(movie) {
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review) {
					return totalScore + review.score; }, 0) / _.size(movie.reviews);
			});

			_.map(obj, function(movie) {
				// transform genres to string value
				movie.genres = movie.genres.toString();
			});

			var title = movieTitle;
			//replace dashes with spaces
			title = title.replace(/-/g, ' ');
			//grab each individual word
			title = title.replace(/\b./g, function(m) {
				//transform to uppercase
				return m.toUpperCase(); 
			});	

			//filter data
			obj = _.filter(obj, function(movie) {
					//return only data wich contains clicked movietitle
					return movie.title === title;
			});
			//render data in detail section
			Transparency.render(document.getElementById('detail'), obj, JMovApp.content.directives);
		},
		toggle: function(id) {									
			var elements = document.getElementsByTagName('section');
			//loop trough sections
			for(var i in elements) {
				//if section has class
				if(elements[i].classList)
					//remove class active
					elements[i].classList.remove('active');
			}
			//grab section with id that corresponts to toggle id
			if(document.getElementById(id))
				//add class action
				document.getElementById(id).classList.add('active');
		}
	};
	
	JMovApp.gestures = {
		init: function() {
			//variables
			var detailpagina = document.getElementById('content');
			var swipeNavigate = new Hammer(detailpagina);
			var menuButton = document.getElementById('menuButton');
			var swipeNavigate2 = new Hammer(menuButton);
			var filterButton = document.getElementById('filterButton');
			var swipeNavigate3 = new Hammer(filterButton);
			
			swipeNavigate.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
			
			//on swipe right add class to menu
			swipeNavigate.on("swiperight", function(ev) {
			   document.getElementById('menu').classList.add('show');
			});

			swipeNavigate.on("swipeleft", function(ev) {
			   document.getElementById('menu').classList.remove('show');
			});
			
			swipeNavigate2.on("tap", function(ev) {
			   document.getElementById('menu').classList.add('show');
			});
			
			swipeNavigate3.on("tap", function(ev) {
			   document.getElementById('filter').classList.add('show');
			});
		}
	}

	//initiate controller - wich initiates app
	JMovApp.controller.init();
})(); //Self Invoking Anonymous Function ends, app = loaded