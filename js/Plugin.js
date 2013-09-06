function Plugin( name, methods, defaults){
    // just create some reference to access to methods and default properties outside of this function (OOP)
    this.methods = $.extend(methods,{});
    this.defaults = $.extend(defaults,{});
    methods = this.methods;
    defaults = this.defaults;
  
    $.fn[name] = function(first , second){
        return this.each(function(){
            var $this = $(this);
            // first is a string so you want to call a method, but check if this[name] exist => init the plugin
            if(this[name] && typeof(first)=="string"){
                if($.fn[name].methods.hasOwnProperty(first)){
                    $.fn[name].methods[first]($this,this[name].options,methods,second);
                }
            // first is not a string, so perhaps null (no properties) or object of properties
            }else{
                var options = first;
                // if this[name] exist, you want to change some properties
                if (this[name]){
                    options = $.extend(this[name].options,options);
                // this[name] doesn't exist so this is first time : init methods and merge defaults aud custum properties
                }else{
                    this[name] = {};
                    options = $.extend(defaults,options);
                    this[name].options = options;
                    $.fn[name].methods = methods;
                    if($.fn[name].methods.hasOwnProperty("init")){
                        $.fn[name].methods.init($this,options,methods);
                    }
                }
            }

        });
    };
}
