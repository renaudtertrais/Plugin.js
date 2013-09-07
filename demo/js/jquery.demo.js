pluginDemo = new Plugin("demo")

// * * * PROPERTIES * * *

// set defaults properties of the plugin
pluginDemo.defaults.color 	= 'grey';
pluginDemo.defaults.size  	= 30;
pluginDemo.defaults.x  		= 100;
pluginDemo.defaults.y  		= 100;
pluginDemo.defaults.speed  	= 5;
pluginDemo.defaults.wayX  	= 1;
pluginDemo.defaults.wayY 	= 1;
pluginDemo.defaults.play  	= true;
// add an init method
pluginDemo.methods.init = function($this,options,methods){
	// call the method change
	options.maxWidth 	= $this.parent().width();
	options.maxHeight 	= $this.parent().height();
	methods.change($this,options);
	methods.run($this,options,methods);
};

// * * * METHODS * * *

// add a getter method
pluginDemo.methods.get = function($this,options,methods,property){
	// call the method change
	return options[property]; // this break the jquery chaining but allow to return value
};
// add the change method
pluginDemo.methods.change = function($this,options,methods,params){
	// merge params default options
	params = $.extend(params,options);
	console.log(options);
	$this.css({
		backgroundColor : params.color,
		top 			: options.y,
		left 			: options.x
	});
	$this.animate({
		height 			: params.size,
		width 			: params.size
	},500);
};
// add the run method : a bit long but it's just to make the ball bounce on the boundaries (nothing important)
pluginDemo.methods.run = function($this,options,methods){
	clearTimeout(options.timeout);
	if(options.play){
		if(options.x > options.maxWidth - options.size){
			options.x = options.maxWidth - options.size;
			options.wayX *= -1;
		}
		if(options.x < 0 ){
			options.x = 0;
			options.wayX *= -1;
		}
		if(options.y > options.maxHeight - options.size){
			options.y = options.maxHeight - options.size;
			options.wayY *= -1;
		}
		if(options.y < 0 ){
			options.y = 0;
			options.wayY *= -1;
		}
		options.x += options.wayX * options.speed;
		options.y += options.wayY * options.speed;
		
		$this.css({
			top : options.y,
			left: options.x
		});
		options.timeout = setTimeout(function(){
			methods.run($this,options,methods);
		},40);
	}
};