'use strict';

minute.register('dotController', function (scrollService, eventsController, projectController) {

	var dot = $('.timeline__dot');
	var container = $(".timeline__dot-container");
	var end = $('.timeline__end');
	var top = $('.timeline');

	var init = function init() {
		bump();
		scrollService.registerWithPos(dot, window.innerHeight * 0.6, fix, 'l', 1);
		scrollService.registerRelative(dot, end, unfix, 's', 1);
		scrollService.registerRelative(dot, top, bump, 'l', 0);
	};

	var fix = function fix() {
		dot.css('position', 'fixed');
		dot.css('top', window.innerHeight * 0.6 + 'px');
		eventsController.registerEvents();
	};

	var unfix = function unfix() {
		dot.css('position', 'absolute');
		dot.css('top', '' + end.offset().top);
		container.addClass('blop');
		scrollService.unregister(dot);
		projectController.appear();
	};

	var bump = function bump() {
		dot.css('position', 'absolute');
		dot.css('top', '' + top.offset().top);
		scrollService.registerWithPos(dot, window.innerHeight * 0.6, fix, 'l', 1);
	};

	return {
		init: init
	};
});

;"use strict";

minute.register('eventsController', function (scrollService) {

	var eventsAppeared = 0;
	var events = $(".timeline__event");

	var registerEvents = function registerEvents() {
		var dot = $(".timeline__dot");
		events.toArray().forEach(function (ev) {
			scrollService.registerRelative(ev, dot, appear, 'l', 1);
		});
	};

	var appear = function appear(elem) {
		elem.classList.add('timeline__event--animate');
	};

	return {
		registerEvents: registerEvents
	};
});

;'use strict';

minute.register('locationController', function () {
	var countMiles = function countMiles() {
		$.get('http://freegeoip.net/json/?callback', function (data) {
			var LL = [data.latitude, data.longitude];
			var dist = LLdist(56, -3, LL[0], LL[1]);

			var numAnim = new CountUp("counter", 0, dist, 0, 0.8);
			numAnim.start();
		});
	};

	var init = function init() {
		countMiles();
	};

	var LLdist = function LLdist(lat1, lon1, lat2, lon2) {
		var radlat1 = Math.PI * lat1 / 180;
		var radlat2 = Math.PI * lat2 / 180;
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta / 180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		return dist;
	};

	return {
		init: init,
		countMiles: countMiles
	};
});

;'use strict';

minute.register('projectController', function () {

	var projects = $('.project');
	var projectContainer = $('.projects');
	var link = ['http://www.github.com/tomcek112/GUTSHack', 'http://www.github.com/tomcek112/KanyeRest', 'http://www.github.com/tomcek112/HacMan', 'http://edinburghpreds.com'];

	var init = function init() {
		projects.each(function (i, project) {
			$(project).on('click', function () {
				window.open(link[i]);
			});
		});
	};

	var appear = function appear() {
		projectContainer.addClass('fade-in-top');
	};

	return {
		init: init,
		appear: appear
	};
});

;'use strict';

minute.register('scrollService', function () {

	var listeners = [];

	var registerWithPos = function registerWithPos(elem, pos, callback, dir, single) {
		listeners.push({ elem: elem, pos: pos, callback: callback, dir: dir, single: single });
		updateScrollListeners();
		return elem;
	};

	var registerRelative = function registerRelative(elem, rel, callback, dir, single) {
		listeners.push({ elem: elem, rel: rel, callback: callback, dir: dir, single: single });
		updateScrollListeners();
		return elem;
	};

	var unregister = function unregister(elem) {
		listeners = listeners.filter(function (l) {
			return l.elem != elem;
		});
	};

	var init = function init() {
		window.addEventListener('scroll', scrollFun);
	};

	var scrollFun = function scrollFun() {
		listeners.forEach(function (listener) {
			var distTop = $(listener.elem).offset().top - $(window).scrollTop();
			var pos = listener.rel ? listener.rel.offset().top - $(window).scrollTop() : listener.pos;
			pos = listener.dir == 'l' ? pos : -pos;
			distTop = listener.dir == 'l' ? distTop : -distTop;
			if (distTop < pos) {
				listener.callback(listener.elem);
				if (listener.single) {
					listeners.splice(listeners.indexOf(listener), 1);
				}
			}
		});
	};

	var updateScrollListeners = function updateScrollListeners() {
		window.removeEventListener('scroll', scrollFun);
		window.addEventListener('scroll', scrollFun);
	};

	return {
		init: init,
		registerWithPos: registerWithPos,
		registerRelative: registerRelative,
		unregister: unregister
	};
});

;'use strict';

minute.register('skillController', function (state) {

	var tabs = $('.skills__tabs');
	var skillSections = $('.skill__container').children();
	var skills = $('.skill');
	var skillDescriptions = $('.skill__description');
	var modals = $('.modal');
	var skillbox = $('.skillbox');

	var activeTab = $(tabs[0].querySelector('.is-active'));
	var activeTabIndex = 0;
	var activeSkill = 0;

	var init = function init() {
		tabs.children().each(function (i, tab) {
			tab = $(tab);
			tab.on('click', function () {
				switchToActive(i, tab);
			});
		});
		skills.each(function (i, skill) {
			skill = $(skill);
			skill.on('click', function () {
				displaySkill(i, skill);
			});
		});
		if (state.isMobile) {
			skillbox.addClass('skill__none');
		}
	};

	var switchToActive = function switchToActive(i, elem) {
		$(skillSections[activeTabIndex]).addClass('skill__none');
		$(skillSections[i]).removeClass('skill__none');
		activeTab.removeClass('is-active');
		activeTab = elem;
		activeTabIndex = i;
		activeTab.addClass('is-active');
	};

	var displaySkill = function displaySkill(i, elem) {
		if (activeSkill != i && !state.isMobile) {
			$(skillDescriptions[i]).addClass('skill__description--active');
			$(skillDescriptions[activeSkill]).removeClass('skill__description--active');
			activeSkill = i;
		}
		if (state.isMobile) {
			$(modals[i]).addClass('is-active');
		}
	};

	return {
		init: init
	};
});

'use strict';

minute.register('state', function () {

	var isMobile = window.innerWidth < 769 ? true : false;

	return {
		isMobile: isMobile
	};
});

;
//# sourceMappingURL=app.js.map