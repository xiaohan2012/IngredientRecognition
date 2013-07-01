(function($, window, document, undefined){
    $.fn.keyoper = function(options){
	var settings = $.extend({}, {}, options);
	
	var key_eventname = "keydown.splitword";
	var eventdone_callback = function(){

	    //activate the ingredient keynav
	    $.keynav.activate("ingredient");

	}

	$(document).unbind(key_eventname).bind(key_eventname, function(e){
	    var c = String.fromCharCode(e.keyCode).toUpperCase();

	    if( c == "S" && !$.splitword.isBegan()) {
		//start split point selection
		$.splitword.begin();
		
		//inner keynav within the splitted char
		$(".splitted-word .splitted-char").keynav({
		    keynav_id: "split-char", 
		    selectorName: ".splitted-char",
		    focus: function(current){
			current.toggleClass("btn-info");
		    },
		    blur: function(current){
			current.toggleClass("btn-info");
		    }
		})
	    }
	    else if( c == "S" && $.splitword.isBegan()) {
		$.splitword.complete(eventdone_callback)// split point selection
	    }
	    else if( $.splitword.isBegan() && e.keyCode == 27) {
		//ESC pressed, cancel it
		$.splitword.cancel(eventdone_callback);
	    }
	})
    }
})(jQuery, window, document);
