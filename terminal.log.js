(function(){

	var _term;

	function term(){
		if (_term) return _term;
		_term = new Terminal({
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
		return sprintf.apply(sprintf, toArray(args)) + '\r\n';
	}

	// TODO support colors
	function wrap(name, color){
		var fn = console[name];
		console[name + '_'] = fn; // old function for restore
		console[name] = function(){
			fn.apply(console, toArray(arguments));
			var msg = format(arguments);
			term().write(msg);
		};
	}

	wrap('log', null);
	wrap('warn', null);
	wrap('error', null);

}).call(this);