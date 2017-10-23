const minute = {

	dependencies: {},

	register: function(key, value) {
		this.dependencies[key] = value;
	},

	get: function(key) {
		return this.resolve(this.dependencies[key]);
	},

	resolve: function(func) {
		var self = this;
		var args = [];
		const funcDeps = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
		return function() {
			for(var i=0; i<funcDeps.length; i++) {
            	var dep = funcDeps[i];
            	args.push(self.dependencies[dep] && dep != '' ? self.resolve(self.dependencies[dep])() : undefined);
        	}
        	return func.apply({}, args);
		}
	}
}

window.addEventListener('DOMContentLoaded', function(){
	for(var dep in minute.dependencies){
		if(minute.get(dep)().init) minute.get(dep)().init();
	}
})