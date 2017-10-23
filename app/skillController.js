minute.register('skillController', function(state) {

	const tabs = $('.skills__tabs');
	const skillSections = $('.skill__container').children();
	const skills = $('.skill');
	const skillDescriptions = $('.skill__description');
	const modals = $('.modal');
	const skillbox = $('.skillbox');

	let activeTab = $(tabs[0].querySelector('.is-active'));
	let activeTabIndex = 0;
	let activeSkill = 0;

	const init = () => {
		tabs.children().each((i, tab) => {
			tab = $(tab);
			tab.on('click', () => {
				switchToActive(i, tab);
			});
		});
		skills.each((i, skill) => {
			skill = $(skill);
			skill.on('click', () => {
				displaySkill(i, skill);
			});
		});
		if(state.isMobile) {
			skillbox.addClass('skill__none');
		}
	}

	const switchToActive = (i, elem) => {
		$(skillSections[activeTabIndex]).addClass('skill__none');
		$(skillSections[i]).removeClass('skill__none');
		activeTab.removeClass('is-active');
		activeTab = elem;
		activeTabIndex = i;
		activeTab.addClass('is-active');
	}

	const displaySkill = (i, elem) => {
		if(activeSkill != i && !state.isMobile) {
			$(skillDescriptions[i]).addClass('skill__description--active');
			$(skillDescriptions[activeSkill]).removeClass('skill__description--active');
			activeSkill = i;
		}
		if(state.isMobile) {
			$(modals[i]).addClass('is-active');
		}
	}

	return {
		init
	}

});