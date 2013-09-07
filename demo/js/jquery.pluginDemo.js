pluginDemo = new Plugin("demo")
// set defaults properties of the plugin
pluginDemo.defaults.color = 'grey';
pluginDemo.defaults.text  = 'demo of Plugin.js';
// add an init method
pluginDemo.methods.init = function($this,options,methods){
	// call the method change
	methods.change($this,options);
};
// add the change method
pluginDemo.methods.change = function($this,options,methods,params){
	// merge params default options
	params = $.extend(options,params);

	$this
		.css("color",params.color)
		.text(params.text);
};
