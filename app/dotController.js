minute.register('dotController', function(scrollService, eventsController, projectController) {

	const dot = $('.timeline__dot');
	const container = $(".timeline__dot-container");
	const end = $('.timeline__end');
	const top = $('.timeline');

	const init = () => {
		bump();
		scrollService.registerWithPos(dot, window.innerHeight*0.6, fix, 'l', 1);
		scrollService.registerRelative(dot, end, unfix, 's', 1);
		scrollService.registerRelative(dot, top, bump, 'l', 0);
	}

	const fix = () => {
		dot.css('position', 'fixed');
  		dot.css('top', (window.innerHeight*0.6) + 'px');
  		eventsController.registerEvents();
	}

	const unfix = () => {
		dot.css('position', 'absolute');
 	  	dot.css('top', ''+end.offset().top)
 	  	container.addClass('blop');
 	  	scrollService.unregister(dot);
 	  	projectController.appear();
	}

	const bump = () => {
		dot.css('position', 'absolute');
	  	dot.css('top', ''+top.offset().top)
		scrollService.registerWithPos(dot, window.innerHeight*0.6, fix, 'l', 1);
	}

	return {
		init
	}

})