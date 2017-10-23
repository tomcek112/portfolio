minute.register('locationController', function(){
	var countMiles = () => {
		$.get('http://freegeoip.net/json/?callback', function(data) {
			let LL = [
				data.latitude,
				data.longitude
			];
			let dist = LLdist(56,-3,LL[0],LL[1]);

			var numAnim = new CountUp("counter", 0, dist, 0, 0.8);
			numAnim.start();
		});
	}

	var init = () => {
		countMiles();
	}

	var LLdist = (lat1, lon1, lat2, lon2) => {
		const radlat1 = Math.PI * lat1/180;
		const radlat2 = Math.PI * lat2/180;
		const theta = lon1-lon2;
		const radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist
	};

	return {
		init,
		countMiles
	}
})