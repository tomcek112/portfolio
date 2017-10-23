minute.register('eventsController', function(scrollService){

	let eventsAppeared = 0;
	let events = $(".timeline__event");

	const registerEvents = () => {
		let dot = $(".timeline__dot");
		events.toArray().forEach((ev) => {
			scrollService.registerRelative(ev, dot, appear, 'l', 1);
		});
	}

	const appear = (elem) => {
		elem.classList.add('timeline__event--animate');
	}

	return {
		registerEvents
	}
})