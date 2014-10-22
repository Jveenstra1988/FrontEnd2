//namespace
var favMovApp = favMovApp || {};

//self executing anonymous function
(function(){
	
	favMovApp.localDataRequest = function(){
		var localData = JSON.parse(localStorage.getItem('localData'));
		
		console.log('Data object:')
		console.log(snow)
		console.log('LocalData loaded');						
		
		Transparency.render(document.getElementById('renderSnow'), localData.data);
		
		var images = '';
		var winddir16 ='';
		for (i=0; i < localData.data.weather[0].hourly.length; i++){
			var snowy = localData.data.weather[0].hourly[i].top[0];
			var snowIcon = localData.data.weather[0].hourly[i].top[0].weatherIconUrl[0].value;
			
			var tds = document.getElementsByTagName('td');
			var windspeedIcon = document.getElementsByClassName('windspeed');
			var winddirIcon = document.getElementsByClassName('winddir');
			
			images = '<img src="' + snowIcon + '" style="width: 30px; float: right" />';
			
			var weatherIcon = document.getElementsByClassName('icon');
			for(a=0; a < weatherIcon.length; a++){
				weatherIcon[i].innerHTML = images;
			}
			
			for(b in winddirIcon){
				var winddir16 = snowy.winddir16Point;
				winddirIcon[i].innerHTML = '<img src="images/' + winddir16 + '.jpg" style="width: 30px; float: right" />';
			}
			
			for(c in windspeedIcon){
				var windspeed = snowy.windspeedKmph;
				if (windspeed >= 1) {
					windspeedIcon[i].innerHTML = '<img src="images/windspeed1.jpg" style="width: 30px; float: right" />';
				}
				if (windspeed >= 7) {
					windspeedIcon[i].innerHTML = '<img src="images/windspeed7.jpg" style="width: 30px; float: right" />';
				}
				if (windspeed >= 12) {
					windspeedIcon[i].innerHTML = '<img src="images/windspeed12.jpg" style="width: 30px; float: right" />';
				}
			}
		}
	}
	
	favMovApp.APIDataRequest = function( id ) {
		
		var req = new XMLHttpRequest();
		var url = "http://api.worldweatheronline.com/free/v1/ski.ashx?q=45.318538%2C%206.539578&format=json&includelocation=yes&lang=lang%3DNL&key=1b864d071bccc955a047934b035f3d393bf128f3";					
		
		//console.log(id);
		
		req.onreadystatechange = function() {
			if (req.readyState == 4 && (req.status == 200 || req.status == 201)) {
				
				var snow = JSON.parse(req.responseText);
				
				snow.timestamp  = new Date().getTime().toString();
				console.log('Data object:')
				console.log(snow)
				console.log('-===================================-')
				
				localStorage.setItem('localData', JSON.stringify(snow));
				console.log('LocalData saved');
				
				//renderData( snow, id );
			
			//switch(filter) {							// Checks what the filter is.
			//	case 'all':
			//		app.sections.toggle('movie-page');	// Resets all movies.
			//		break;
			//	case 'horror':
			//	case 'crime':
			//	case 'drama':
			//	case 'thriller':
			//	case 'action':
			//	case 'adventure':	
			//		obj = _.filter(obj, function(movie) { 							// Filters the obj..
			//			filter = filter.charAt(0).toUpperCase() + filter.slice(1);	// .. with the genre behind the hash 'movie'..
			//				return (_.contains(movie.genres, filter) === true); 		// .. and shows only movies with matching genre.
			//		});
			//		break;
			//	case 'asc':
			//		obj = _.sortBy(obj, function(movie) { 	
			//			return movie.reviews;				// Sort the movies based on their rating, ascending.
			//		});
			//		break;
			//	case 'desc':
			//		obj = _.sortBy(obj, function(movie) {
			//			return movie.reviews * -1;			// Sort the movies based on their rating, descending.
			//		});
			//		break;	
			//	case 'date-asc':
			//		obj = _.sortBy(obj, function(movie) {
			//			return Date.parse(movie.release_date); 			// Sort the movies based on their release date, ascending.
			//		});
			//		break;
			//	case 'date-desc':
			//		obj = _.sortBy(obj, function(movie) {
			//			return Date.parse(movie.release_date) * -1;		// Sort the movies based on their release date, descending.
			//		});
			//		break;
			//	default:
			//		// No valid filter
			//		break;
			//	}
				
				Transparency.render(document.getElementById('renderSnow'), snow.data);
			
				var images = '';
				var winddir16 ='';
				
				for (i=0; i < snow.data.weather[0].hourly.length; i++){
					//console.log(snow.data.weather[0].hourly[i].top[0].tempC);
					//var combinedTempC = _.reduce(snow.data.weather[0].hourly[i].top[0].tempC, function(memo, num){
					//	return memo + num;
					//}, 0);
					
					var totalTempC = _.map(snow.data.weather[0].hourly[i].top[0].tempC, function(num) {												// Use underscore.js to map each value in a list..
						var combinedTempC = _.reduce(snow.data.weather[0].hourly[i].top[0].tempC, function(memo, num) {	// .. then combine those values..
							return memo + num; }, 0) / _.size(combinedTempC);		// .. and divide by total reviews to get the average review score.
					});
					
					console.log(totalTempC);
					
					
							
					//_.map([1, 2, 3], function(num){ return num * 3; });

					
					var snowy = snow.data.weather[0].hourly[i].top[0];
				
					//var snowIcon = JSONSelect.match('.weatherIconUrl' , snow);
					var snowIcon = snow.data.weather[0].hourly[i].top[0].weatherIconUrl[0].value;
					//console.log(snowIcon);
					
					var tds = document.getElementsByTagName('td');
					var windspeedIcon = document.getElementsByClassName('windspeed');
					var winddirIcon = document.getElementsByClassName('winddir');
					
					images = '<img src="' + snowIcon + '" style="width: 30px; float: right" />';
					
					var weatherIcon = document.getElementsByClassName('icon');
					for(a=0; a < weatherIcon.length; a++){
						weatherIcon[i].innerHTML = images;
					}
					
					for(b in winddirIcon){
						var winddir16 = snowy.winddir16Point;
						winddirIcon[i].innerHTML = '<img src="images/' + winddir16 + '.jpg" style="width: 30px; float: right" />';
					}
					for(c in windspeedIcon){
						var windspeed = snowy.windspeedKmph;
						if (windspeed >= 0) {
							windspeedIcon.innerHTML = '<img src="images/windspeed1.jpg" style="width: 30px; float: right" />';
						}
						if (windspeed >= 7) {
							windspeedIcon[i].innerHTML = '<img src="images/windspeed7.jpg" style="width: 30px; float: right" />';
						}
						if (windspeed >= 12) {
							windspeedIcon[i].innerHTML = '<img src="images/windspeed12.jpg" style="width: 30px; float: right" />';
						}
					}
				}
			}
		}
		req.open("GET", url, true);
		req.send();
	}
	
	var renderData = function(){
		//if (id) {
		//	//filter met underscore
		//	console.log(id)
		//}
	}
	
//end of self executing anonymous function
})();