Plugin.js
=========
A lightweight(471 bytes) jquery plugin bootstrap


1. Getting stated
=================

Just add the file in your project :

    <script src="js/Plugin.js"></scrip>
    
And that's all folks !

2. Documentation
================
a) Plugin declaration
--------------------
###Procedural way

    Plugin ( name , methods , options );
    
###OOP way

    var myPlugin = new Plugin ( name , methods , options );
    
###Params
    
* **name** *(string)* : name of the plugin *(required)*
* **methods** *(object)* : an object of methods *(optional but an "init" method is recommended, see Methods declaration)*
* **options** *(object)* : an object of properties *(optional)*

###Usage
As usual

    $("#my-id").myPlugin();


###Differences between proceral and OOP
* **Procedural** is more convinient for people who aren't used to OOP.
* **OOP** allow you to create methods and properties *(options)* outside of the "creation" of the plugin *(see examples below)*


b) Methods declaration
----------------------
###Declaration
    {
        myMethod : function( $this, options, methods, param ){}
    }
    
###Params
* **$this** *(jQuery object)* : allow you to access to the current jQuery element
* **options** *(object)* : allow you to access to the current jQuery element's options
* **methods** *(object)* : allow you to access to your methods
* **param** *(mixed)* : whatever you whant to pass as paramater

###Usage
    $("#my-id").myPlugin( "myMethod" , "Hello world!" );
    
###Advices
####Default behavior : init method
You can create an init method called "init" (ok...) in order to give a default behavior to your element
####Return value
Methods will automatically return a jquery object in order to keep the jquery chain. But you can return specific values from method. Just remember that it will break the jquery chain (like $.attr(value)). This a example of how to make easily a getter :

    myPlugin.methods.get = function($this,options,methods,property){
        return options[property];
    }

So now you have setters and getters for your properties : 

    // Setter
    $("#element").highlight({ color:"green" }) 
    
    // Getter 
    var color = $("#element").highlight( "get" , "color" );
    

####Calling methods

When creating methods, be carreful to give everything needed to method that your are calling :

#####Bad example
    {
        myMethod_1 : function(){
            ...
            myMethod_2();
        }
        myMethod_2 : function($this , options){
            $this.text( options.txt );
        }
    }
"Errors incoming !" Ok let's see :

    $("#my-id").myPlugin( "method_2" ); // no problem
    $("#my-id").myPlugin( "method_1" ); // ouch ! $this not defined, options not defined
    
#####Good example
    {
        myMethod_1 : function( $this , options){    // even if I don't need it in that method...
            ...
            myMethod_2( $this , options);           // ... because I need it right here...
        }
        myMethod_2 : function($this , options){    
            $this.text( options.txt );               // ... so it is defined here !
        }
    }

3. Examples
===========

###Basic plugin
No properties, no methods
####Procedural way

    Plugin(
        "highlight",
        {
            init:function($this){
                $this.css("color","#F00");
            }
        }
    );
    
####OOP way

    var myPlugin = new Plugin("highlight");
    
    // add behaviors
    myPlugin.methods.init = function($this){
        $this.css("color","#F00");
    }
    
####Plugin usage
As usual

    $("#element").highlight(); //font color in red

###Advanced plugin
I need properties and methods please !

####Procedural way

    Plugin(
        "highlight",
        // methods :
        {
            init    : function($this,options,methods){
                methods.change($this,options);
            },
            change  : function($this,options,methods, color){
                var color = color || options.color;
                $this.css("color",color);
            }
        },
        // default properties
        {
            color : "#F00"
        }     
    );
    
####OOP way

    var myPlugin = new Plugin("highlight");
    
    // default properties
    myPlugin.defaults.color = "#F00";
    
    // Methods
    myPlugin.methods.init = function($this,options,methods){
         methods.change($this,options,methods);
    }
    myPlugin.methods.change = function($this,options,methods,color){
        var color = color || options.color;
        $this.css("color",color);
    }
    
    
####Plugin usage
    
    $("#element").highlight();                  //font color in red
    $("#element").highlight("change");          //font color in red
    $("#element").highlight("change","blue");   //font color in blue
    $("#element").highlight("change");          //font color in red
    $("#element").highlight({ color:"blue" });  //change the property color
    $("#element").highlight("change");          //font color in blue
    $("#element").highlight("change","#F00");   //font color in red
    
    $("#element-2")
        .highlight({ color:"green" })           //declaration with properties, font color in green
        .highlight("change");                   //font color in green
        
    
