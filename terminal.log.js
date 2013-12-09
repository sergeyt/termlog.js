(function(){

	var _term;

	function term(){
		if (_term) return _term;
		_term = new Terminal({
			colors: Terminal.xtermColors,
			cols: 80,
			rows: 24,
			useStyle: true,
			screenKeys: true
		});
		_term.open(document.body);
		return _term;
	}

	function toArray(args){
		return [].slice.call(args);
	}

	function format(args){
		return sprintf.apply(sprintf, toArray(args));
	}

	var colors = {
		log: 32,
		warn: 33,
		error: 41
	};

	function color(msg, name){
		var c = colors[name];
		return '\x1b[' + c + 'm' + msg + '\x1b[m';
	}

	function wrap(name){
		var fn = console[name];
		console[name + '_'] = fn; // old function for restore
		console[name] = function(){
			fn.apply(console, toArray(arguments));
			var msg = color(format(arguments), name);
			term().writeln(msg);
		};
	}

	wrap('log');
	wrap('warn');
	wrap('error');

}).call(this);