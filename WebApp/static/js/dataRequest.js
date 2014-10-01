var localDataRender = function(){
	var localData = JSON.parse(localStorage.getItem('localData'));
	
	console.log('Data object:')
	console.log(snow)
	console.log('-===================================-')
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

var APIDataRender = function() {
	
	var req = new XMLHttpRequest();
	var url = "http://api.worldweatheronline.com/free/v1/ski.ashx?q=45.318538%2C%206.539578&format=json&includelocation=yes&lang=lang%3DNL&key=1b864d071bccc955a047934b035f3d393bf128f3";					
	
	req.onreadystatechange = function() {
		if (req.readyState == 4 && (req.status == 200 || req.status == 201)) {
			
			var snow = JSON.parse(req.responseText);
			snow.timestamp  = new Date().getTime().toString();
			console.log('Data object:')
			console.log(snow)
			console.log('-===================================-')
			
			localStorage.setItem('localData', JSON.stringify(snow));
			console.log('LocalData saved');
			
			Transparency.render(document.getElementById('renderSnow'), snow.data);
			
			var images = '';
			var winddir16 ='';
			for (i=0; i < snow.data.weather[0].hourly.length; i++){
				var snowy = snow.data.weather[0].hourly[i].top[0];
				var snowIcon = snow.data.weather[0].hourly[i].top[0].weatherIconUrl[0].value;
				
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