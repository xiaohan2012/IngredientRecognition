(function($, window, document, undefined){
    var event_id = "keydown.mergeword";

    $.mergeword = {
	started: false,
	cancel: function(callback){
	    $(document).unbind(event_id);
	    $.keynav.activate("ingredient");
	    $.mergeword.started = false;
	    
	    if($.isFunction(callback)) 
		callback.call();
	}
    };
    
    $.fn.prepareForMerge = function(options){
	var elements = this;
	var cursor = 0;

	
	var s = $.extend({}, {
	    activeClass:"btn-success",
	    onStart: function(){
		$.keynav.deactivate_all();
		$.mergeword.started = true;
	    },
	    complete: function(){
		var we = elements.slice(0, cursor);
		var text = $.map(we, function(v){
		    return $.trim($(v).children("button.ing-name").justtext());
		}).join("");
		we.first()
		    .appendIngredient(text)
		    .next().focus("ingredient");
		
		we.remove();
		
		s.afterComplete.call();
	    },
	    afterComplete: $.mergeword.cancel
	}, options);
	

	s.onStart.call();
	
	
	function update(idx){
	    //select part or all elements in `element` up to index `idx`
	    elements.children("button.ing-name").removeClass(s.activeClass);
	    elements.slice(0, idx).children("button.ing-name").addClass(s.activeClass);
	}
	
	$(document).unbind(event_id).bind(event_id, function(e){
	    if (e.keyCode == 37) {//left
		cursor -= 1;
		update(cursor);
	    }
	    else if(e.keyCode == 39){//right
		cursor += 1;
		update(cursor);
	    }
	    else if(e.keyCode == 77) {//M
		s.complete.call();
	    }
	    else if( e.keyCode == 27 && $.mergeword.started) {
		$.mergeword.cancel(function(){
		    $(".ingredient.keynav-current")
			.siblings()
			.addBack()
			.children("button.ing-name")
			.removeClass("btn-success");
		});
	    }


	});

	//s.onComplete.call();
	return this;
    }
})(jQuery, window, document);
