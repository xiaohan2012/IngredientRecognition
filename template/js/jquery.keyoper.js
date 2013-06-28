(function($, window, document, undefined){
    $.fn.keyoper = function(options){
	var settings = $.extend({}, {}, options);
	
	$(document).keydown(function(e){
	    var c = String.fromCharCode(e.keyCode).toUpperCase();
	    if( c == "S" && !$.beganSplitPointSelection()) {
		//start split point selection
		$.beginSelectSplitPosition();

		$(".ingridient").getCurrent().keynav({
		    target: ".splitted-char",
		    focus: function(current){
			current.add(current.siblings(".splitted-char").filter(".btn-info"))
			    .toggleClass("btn-warning btn-info");
		    }
		})
	    }
	    else if( c == "S" && $.beganSplitPointSelection()) {
		//end split point selection
		$.endSplitWord()
	    }

	})
    }
})(jQuery, window, document);
