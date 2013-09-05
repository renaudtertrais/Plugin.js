function Plugin( name, methods, defaults){
    this.methods = $.extend(methods,{});
    this.defaults = $.extend(defaults,{});
    methods = this.methods;
    defaults = this.defaults;
  
    $.fn[name] = function(first , second){
        return this.each(function(){
            var $this = $(this);

            // if first == string and, it's not first time
            if(this[name] && typeof(first)=="string"){
                if($.fn[name].methods.hasOwnProperty(first)){
                    $.fn[name].methods[first]($this,this[name].options,methods,second);
                }
            }else{
                var options = first;
                if (this[name]){
                    options = $.extend(this[name].options,options); 
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