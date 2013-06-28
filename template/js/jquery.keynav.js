(function($, window, document, undefined){
    $.fn.keynav = function() {
	var current = this.filter(".current-word");

	if(current.length == 0) {
	    current = this.first();
	    current.addClass("current-word");
	}

	current.children("button.ing-name").addClass("btn-warning");

	function focusOnNext(){
	    current.removeClass("current-word").children("button.ing-name").removeClass("btn-warning");

	    var next = current.next();

	    if(next.length==0) next = current.siblings().first();
	    
	    next.addClass("current-word").children("button.ing-name").addClass("btn-warning");

	    current = next;
	}
	
	function focusOnPrev(){
	    current.removeClass("current-word").children("button.ing-name").removeClass("btn-warning");

	    var prev = current.prev();

	    if(prev.length==0) prev = current.siblings().last();
	    
	    prev.addClass("current-word").children("button.ing-name").addClass("btn-warning");

	    current = prev;
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
	if(cur.length == 0) 
	    cur = this.first();
	return cur;
    };

})(jQuery, window, document);
