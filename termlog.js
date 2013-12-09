(function(){

	if (typeof console === 'undefined'){
		return;
	}

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

	function toArray(args){ return [].slice.call(args); }
	// TODO simple fallback without sprintf
	function format(args){ return sprintf.apply(sprintf, toArray(args)); }

	var levels = {
		log: 32,
		warn: 33,
		error: 41,
		debug: 36
	};

	function colorize(msg, name){
		var c = levels[name];
		return '\x1b[' + c + 'm' + msg + '\x1b[m';
	}

	function wrap(name){
		var fn = console[name];
		if (fn) console[name + '_'] = fn; // old function for restore
		console[name] = function(){
			if (fn) fn.apply(console, toArray(arguments));
			var msg = colorize(format(arguments), name);
			term().writeln(msg);
		};
	}

	function unwrap(name){
		var old = console[name + '_'];
		if (!old) return;
		console[name] = old;
		delete console[name + '_'];
	}

	function open(){
		Object.keys(levels).forEach(function(name){
			wrap(name);
		});
	}

	function close(){
		Object.keys(levels).forEach(function(name){
			unwrap(name);
		});
	}

	// expose public api
	this.terminal = {
		open: open,
		close: close
	};

	Object.keys(levels).forEach(function(name){
		this.terminal[name] = function(){
			console[name].apply(console, toArray(arguments));
		};
	});

}).call((function() {
	return this || (typeof window !== 'undefined' ? window : global);
})());