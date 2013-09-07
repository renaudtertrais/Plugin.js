function Plugin( name, methods, defaults){
    // just create some references to access to methods and default properties outside of this function (OOP)
    this.methods = $.extend({},methods);
    this.defaults = $.extend({},defaults);
    methods = this.methods;
    defaults = this.defaults;
    $.fn[name] = function(first , second){
        var returnValue;

        this.each(function(){
            var $this = $(this);
            // first is a string so you want to call a method, but check if $this.data(name) exist => init the plugin
            if($this.data(name) && typeof(first)=="string"){
                if($.fn[name].methods.hasOwnProperty(first)){
                    returnValue = $.fn[name].methods[first]($this,$this.data(name).options,methods,second);
                }
            // first is not a string, so perhaps null (no properties) or object of properties
            }else{
                // if $this.data(name) exist, you want to change some properties
                if ($this.data(name)){
                    $this.data(name).options = $.extend($this.data(name).options,first);
                    
                // $this.data(name) doesn't exist so this is first time : init methods and merge defaults aud custum properties
                }else{
                    $this.data(name,{});
                    $this.data(name).options  = $.extend({},defaults,first);
                    $.fn[name].methods = methods;
                    if($.fn[name].methods.hasOwnProperty("init")){
                        $.fn[name].methods.init($this,$this.data(name).options,methods);
                    }
                }
            }

        });
        return returnValue ? returnValue : this;
    };
}
