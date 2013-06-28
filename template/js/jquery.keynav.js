(function($, window, document, undefined){
    $.fn.keynav = function() {
	
	function focusOnNext(){
	    var current = $.getCurrent();

	    current.removeClass("current-word").children("button.ing-name").removeClass("btn-warning");

	    var next = current.next();

	    if(next.length==0) next = current.siblings().first();
	    
	    next.addClass("current-word").children("button.ing-name").addClass("btn-warning");

	}
	
	function focusOnPrev(){
	    var current = $.getCurrent();
	    
	    current.removeClass("current-word").children("button.ing-name").removeClass("btn-warning");

	    var prev = current.prev();

	    if(prev.length==0) prev = current.siblings().last();
	    
	    prev.addClass("current-word").children("button.ing-name").addClass("btn-warning");

	}

	$(document).keydown(function(e){
	    if (e.keyCode == 37) {
		//left
		focusOnPrev();
	    }
	    else if(e.keyCode == 39) {
		//right
		focusOnNext();
	    }
	});
    };


    $.getCurrent = function(){
	var cur = $(".ingredient").filter(".current-word");
	if(cur.length == 0) { //the one not appeared yet
	    cur = $(".ingredient").first();
	    cur.addClass("current-word");
	    cur.children("button.ing-name").addClass("btn-warning");
	}
	return cur;
    };

})(jQuery, window, document);
