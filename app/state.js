minute.register('state', function() {

	const isMobile = window.innerWidth < 769 ? true : false;

	return {
		isMobile
	}

})