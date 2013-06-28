(function($, window, document, undefined){
    $.fn.keynav = function(options) {
	
	var s = $.extend({}, {
	    focus: function(){},
	    blur: function(){}
	}, options)
	var t = s["target"];
	var $this = this;
	console.log($this);

	function focusOnNext(){
	    var current = $this.getCurrent();
	    
	    if(current.length == 0) { //The One not appeared yet
		current = $(t).first();
		current.addClass("keynav-current");
		s.focus(current);
	    }
	    else{
		s.blur(current);
		var next = current.next();
		
		if(next.length==0) next = current.siblings().first();
		next.addClass("keynav-current");
		s.focus(next);

	    }
	}
	
	function focusOnPrev(){
	    var current = $this.getCurrent();

	    if(current.length == 0) { //The One not appeared yet
		current = $(t).first();
		current.addClass("keynav-current");
		s.focus(current);
	    }
	    else{
		s.blur(current);
		var prev = current.prev();
		
		if(prev.length==0) prev = current.siblings().last();
		
		prev.addClass("keynav-current");
		s.focus(prev);
	    }
	}

	$(document).keydown(function(e){
	    if($(t).find(".keynav-current").length != 0) {
		console.log("nested keynav available", $(t));
		return;
	    }

	    if (e.keyCode == 37) {
		//left
		focusOnPrev();
	    }
	    else if(e.keyCode == 39) {
		//right
		focusOnNext();
	    }
	});

	$.fn.getCurrent = function(){
	    var cur = $(t).filter(".keynav-current");
	    return cur;
	};

    };



})(jQuery, window, document);
