(function($, window, document, undefined){
    $.fn.keyoper = function(options){
	var settings = $.extend({}, {}, options);
	
	$(document).keydown(function(e){
	    var c = String.fromCharCode(e.keyCode).toUpperCase();

	    if( c == "S" && !$.beganSplitPointSelection()) {
		//start split point selection
		$.beginSelectSplitPosition();
		
		//inner keynav within the splitted char
		$(".ingridient.keynav-current").keynav({
		    target: ".splitted-char",
		    focus: function(current){
			current.add(current.siblings(".splitted-char").filter(".btn-info"))
			    .toggleClass("btn-warning btn-info");
		    }
		})
	    }
	    else if( $.beganSplitPointSelection()) {
		if( c == "S" ) $.endSplitWord()// split point selection
		else if( e.keyCode == 27) $.cancelSplitWord() //ESC pressed, cancel it
	    }
	})
    }
})(jQuery, window, document);
