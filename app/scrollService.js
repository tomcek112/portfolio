minute.register('scrollService', function(){

	let listeners = [];

	const registerWithPos = (elem, pos, callback, dir, single) => {
		listeners.push({elem, pos, callback, dir, single});
		updateScrollListeners();
		return elem;
	}

	const registerRelative = (elem, rel, callback, dir, single) => {
		listeners.push({elem, rel, callback, dir, single});
		updateScrollListeners();
		return elem;
	}

	const unregister = (elem) => {
		listeners = listeners.filter((l) => {
			return l.elem != elem;
		});
	}

	const init = () => {
		window.addEventListener('scroll', scrollFun);
	}

	const scrollFun = function() {
		listeners.forEach((listener) => {
			let distTop = $(listener.elem).offset().top - $(window).scrollTop();
			let pos = listener.rel ? (listener.rel.offset().top - $(window).scrollTop()) : listener.pos;
			pos = listener.dir == 'l' ? pos : -pos;
			distTop = listener.dir == 'l' ? distTop : -distTop;
			if(distTop < pos) {
				listener.callback(listener.elem);
				if(listener.single) {
					listeners.splice(listeners.indexOf(listener), 1);
				}
			}
		});
	}

	const updateScrollListeners = () => {
		window.removeEventListener('scroll', scrollFun);
		window.addEventListener('scroll', scrollFun);
	}

	return {
		init,
		registerWithPos,
		registerRelative,
		unregister
	}

})