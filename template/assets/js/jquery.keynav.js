(function($, window, document, undefined){
    $.keynav = {
	
    };
    $.keynav.active_flag = {};
    $.keynav.settings = {};
    
    $.keynav.activate = function(event_id){
	//deactivate all first
	$.each($.keynav.active_flag, function(k,v){
	    $.keynav.active_flag[k] = false;
	});
	//activate myself
	$.keynav.active_flag[event_id] = true;
	
    };
    
    $.keynav.deactivate_all = function() {
	$.each($.keynav.active_flag, function(k,v){
	    $.keynav.active_flag[k] = false;
	});
    }
    

    $.keynav.is_active = function(event_id){
	return $.keynav.active_flag[event_id];
    }

    $.keynav.unbind = function(event_id){
	$(document).unbind(event_id);
    }

    $.fn.keynav = function(options) {
	
	var s = $.extend({}, {
	    focus: function(){},
	    blur: function(){},
	    keynav_id: "",
	    selectorName: null
	}, options)
	
	var $this = this;
	
	//get the event_id, for event priority dispatching
	var event_id = s.keynav_id;
	
	$.keynav.activate(event_id);

	//save the setting for this event
	$.keynav.settings[event_id] = s;

	//activate the first element
	focusOn($this.first());
	
	function focusOn(next, current, s){
	    if(s == undefined){
		s = $.keynav.settings[event_id];
	    }
	    if(!s) return;

	    //activate `next` and deactivate `current`
	    if(current){
		current.removeClass("keynav-current");
		s.blur(current);
	    }

	    next.addClass("keynav-current");
	    s.focus(next);
	}
	
	function getCurrent(){
	    var cur = $(s.selectorName).filter(".keynav-current");
	    return cur;
	}
	
	function focusOnNext(){
	    var current = getCurrent();

	    var next = current.next();	    

	    if(next.length==0) next = $(s.selectorName).first();
	    
	    focusOn(next, current);

	}
	
	function focusOnPrev(){
	    var current = getCurrent();

	    var prev = current.prev();
	    
	    if(prev.length==0) prev = $(s.selectorName).last();
	    
	    focusOn(prev, current);

	}


	
	var event_name = "keydown.{0}".format(event_id);

	$(document).unbind(event_name).bind(event_name, function(e){
	    
	    if(!$.keynav.is_active(event_id)) return;	
	    
	    if (e.keyCode == 37) {
		//left
		focusOnPrev();
	    }
	    else if(e.keyCode == 39) {
		//right
		focusOnNext();
	    }
	});

	$.fn.focus = function(event_id){
	    var s = $.keynav.settings[event_id];
	    focusOn(this.first(), null, s);
	    return this;
	}

	return this;
    };

})(jQuery, window, document);
