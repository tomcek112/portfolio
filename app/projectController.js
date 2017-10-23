minute.register('projectController', function() {

	const projects = $('.project');
	const projectContainer = $('.projects')
	const link = ['http://www.github.com/tomcek112/GUTSHack', 'http://www.github.com/tomcek112/KanyeRest', 'http://www.github.com/tomcek112/HacMan', 'http://edinburghpreds.com']

	const init = () => {
		projects.each((i, project) => {
			$(project).on('click', () => {window.open(link[i])});
		})
	}

	const appear = () => {
		projectContainer.addClass('fade-in-top');
	}

	return {
		init,
		appear
	}

})