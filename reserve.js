//var xhr = {
			//	trigger: function(){
			//		// from her we'll Check if user has visited this page before
			//		// function to Create cookie
			//		function createCookie(name,value,days) {
			//			if (days) {
			//			  var date = new Date();
			//			  date.setTime(date.getTime()+(days*24*60*60*1000));
			//			  var expires = "; expires="+date.toGMTString();
			//			}else var expires = "";
			//				document.cookie = name+"="+value+expires+"; path=/";
			//		}
			//		
			//		//fnuction to read cookie
			//		function readCookie(name) {
			//			var nameEQ = name + "=";
			//			var ca = document.cookie.split(';');
			//			for(var i=0;i < ca.length;i++) {
			//			  var c = ca[i];
			//			  while (c.charAt(0)==' ') c = c.substring(1,c.length);
			//			  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			//			}
			//		  return null;
			//		}
			//		
			//		//readCookie variable
			//		var visited = readCookie('firstTime');
			//		console.log(document.cookie)
			//		
			//		//Check if user has visited this page before
			//		if (visited) {
			//			console.log('visited')
			//			//if user has visited page check for local Stored Data support
			//			if(window.localStorage) {
			//				console.log('has local storage')
			//				//if local Stored Data is available and is not older than 1 min
			//				if( (new Date().getTime() - JSON.parse(localStorage['localData']).timestamp < 6000 ) ) {
			//					console.log('data is same as local storage')
			//					//Display local data
			//					favMovApp.localDataRequest();
			//				}else {
			//					console.log('data is depricated, load API data')
			//					favMovApp.APIDataRequest();
			//				}
			//			}else {
			//				console.log('has no local storage')
			//				favMovApp.APIDataRequest();
			//			}
			//		}else{
			//			console.log('first time, load APIData')
			//			favMovApp.APIDataRequest();
			//			createCookie('firstTime','no',0);
			//		}
			//	}
			//}
			//xhr.trigger()