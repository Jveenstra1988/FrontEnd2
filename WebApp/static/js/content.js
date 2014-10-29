var JMovApp = JMovApp || {};

(function(){

	JMovApp.content = {
		about: {
			title: 'About this app',
			description: '<p>Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let\'s get him some rocks. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. bruce... i\'m god. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. rehabilitated? well, now let me see. you know, i don\'t have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can\'t now, being dead and all. </p>'
						  + '<p>I did the same thing to gandhi, he didn\'t eat for three weeks. bruce... i\'m god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i\'m god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn\'t eat for three weeks.</p>'
						  + '<p>Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man\'s ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don\'t want to tell me exactly what you\'re doing, when i\'m asked, i don\'t have to lie. but don\'t think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy.</p>'
						  + '<p>That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn\'t eat for three weeks. the man likes to play chess; let\'s get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that\'s how much he thinks he loves you. i don\'t think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world. </p>'
		},

		directives: {

			description: {
				//turn htmltags into valid html
				html: function(params) {
					return params.value + this.description;
				}
			},

	  		cover: {
				//put img link in img src
    			src: function(params) {
      				return this.cover;
    			},

				//put movie title in img alt
    			alt: function(params) {
	    			return this.title;
	    		}
  			},

  			reviews: {
				//if review scor returns something else then a number, return string
				text: function(params){						
					if(isNaN(this.reviews)){
						return 'Not rated';
					//else return review score
					} else {
						return this.reviews;
					}
				}
			},

			link: {
				href : function(params) {
					//turn title into link material
					var title = this.title.replace(/\s+/g, '-').toLowerCase();
					return '#movie/' + title;
				}
			}
		}
	};
	
	JMovApp.xhr = {
		trigger: function (type, url, success, data) {
			//open new httpXmlRequest
			var req = new XMLHttpRequest;
			req.open(type, url, true);
			//set request type
			req.setRequestHeader('Content-type','application/json');
			//send request
			type === 'POST' ? req.send(data) : req.send(null);
			//check if request is accepted
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200 || req.status === 201) {
						//on succes return data
						success(req.responseText);
					}
				}
			}
		},
		
		loadData: function(source, callback){
			//check for online status - does not work, if online:
			if(window.navigator.onLine) {
				//get data
				JMovApp.xhr.trigger('GET', source, function(response) {
					//store data in localStorage
					localStorage.setItem('movieData', response);
					//JSON.parse data object
					JMovApp.content.movies = JSON.parse(response);
					
					console.log('API Data loaded');
					//set status + timestamp of data update
					document.getElementById('dataFeedback').innerHTML = "Online (Data updated "+ new Date() +" ) ";
					//flash online indicator green
					document.getElementById('onlineStatus').classList.add('green');
					callback();
				});
			} else {
				//if offline - use localdata - never gets here
				if(localStorage.getItem('movieData'))
					JMovApp.content.movies = JSON.parse(JMovApp.xhr.getItem('movieData'));
					console.log('Local Data loaded');
					document.getElementById('dataFeedback').innerHTML = "Offline (Local data loaded)";
					//put onlineindicator on red
					document.getElementById('onlineStatus').classList.add('red');
					callback();
			}
		},
		
		setData: function(data) {
			localStorage.setItem('movieData', data);
		},
		
		getData: function(name) {
			return localStorage.getItem(name);
		}
	
	};
	
	

})();