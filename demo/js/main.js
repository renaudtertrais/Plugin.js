
// * * *  define the jquery plugin * * *

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



// * * * usage of the plugin * * *
$(document).ready(function(){
	$("h1").demo();
	var defaults = {
		color : 'grey',
		text  : 'demo of Plugin.js'
	};
	// event
	$("#reset" 					).on("click",function(){ $("h1").demo(defaults); 					});
	$("#change" 				).on("click",function(){ $("h1").demo("change"); 					});
	$("#update-property-text"	).on("click",function(){ $("h1").demo({ text  : $("#text").val()}); });
	$("#update-property-color"	).on("click",function(){ $("h1").demo({ color : "blue" 			}); });
	$("#change-color" 			).on("click",function(){ $("h1").demo("change" , {color : "red" });	});
	$("#change-color-text" 		).on("click",function(){ $("h1").demo("change" , {color : "orange",text  : $("#text").val()	}); });
});