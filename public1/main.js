document.getElementById("loading-info").style.visibility = "hidden";

function init() {
	document.getElementById("welcome-div").style.visibility = "hidden";
  document.getElementById("loading-info").style.visibility = "none";
	var config = {
	    apiKey: "AIzaSyB2VUA6vgbVuzisLKutGOr9sX48Kfg3oxA",
	    authDomain: "agk-geo-tracker.firebaseapp.com",
	    databaseURL: "https://agk-geo-tracker.firebaseio.com",
	    projectId: "agk-geo-tracker",
	    storageBucket: "agk-geo-tracker.appspot.com",
	    messagingSenderId: "1048812624613"
	};

  	firebase.initializeApp(config);

  	var db = firebase.firestore();

  	var data = [];

  	var dbRef = db.collection("geo_tracker");
	dbRef.orderBy("time")    
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
           //data.push(doc.data());
           var temp = {
           	latitude : doc.data().latitude,
           	longitude : doc.data().longitude
           }
           //var temp = new L.LatLng(doc.data().latitude, doc.data().longitude);
           console.log(temp);
           data.push(temp);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
	});
	var finalData = []; 
    setTimeout(function(){
    	console.log(data);
    	console.log(data[0]);
    	console.log(data.length);
    	data.forEach(function(res){
    		console.log('in forEach');
    		console.log(res);
    		finalData.push(new L.LatLng(res.latitude, res.longitude));
    	});
    	//var data = JSON.stringify(data);
    	//var jsonData = JSON.parse(data)
  		console.log(finalData);

  		var map = new L.Map('map');                       
            
  	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
     map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

     var polylineOptions = {
           color: 'red',
           weight: 5,
          	opacity: 0.9
         };
     var polyline = new L.Polyline(finalData, polylineOptions);

     map.addLayer(polyline);                        

     // zoom the map to the polyline
     map.fitBounds(polyline.getBounds());

    },5000);
   
     

     
  }