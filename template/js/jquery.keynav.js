(function($, window, document, undefined){
    $.keynav_active_flag = {};
    $.keynav_settings = {};
    
    $.fn.keynav = function(options) {
	
	var s = $.extend({}, {
	    focus: function(){},
	    blur: function(){}
	}, options)
	
	var t = s["target"];
	//save the setting for `t` for later use
	$.keynav_settings[t] = s;

	var $this = this;
	
	function getCurrent(){
	    var cur = $(t).filter(".keynav-current");
	    return cur;
	}
	
	function focusOnNext(){
	    var current = getCurrent();

	    if(current.length == 0) { //The One not appeared yet
		current = $(t).first();
		current.addClass("keynav-current");
		s.focus(current);
	    }
	    else{
		s.blur(current);
		current.removeClass("keynav-current");
		
		var next = current.next();
		
		if(next.length==0) next = current.siblings(t).first();
		//console.log(next, next.length);
		
		next.addClass("keynav-current");
		s.focus(next);

	    }
	}
	
	function focusOnPrev(){
	    var current = getCurrent();

	    if(current.length == 0) { //The One not appeared yet
		current = $(t).first();
		current.addClass("keynav-current");
		s.focus(current);
	    }
	    else{
		s.blur(current);
		current.removeClass("keynav-current");

		var prev = current.prev();
		
		if(prev.length==0) prev = current.siblings(t).last();
		
		prev.addClass("keynav-current");
		s.focus(prev);
	    }
	}

	$.keynav_activate = function(t){
	    //deactivate all first
	    $.each($.keynav_active_flag, function(k,v){
		$.keynav_active_flag[k] = false;
	    });
	    //activate myself
	    $.keynav_active_flag[t] = true;

	};
	
	function is_active(t){
	    return $.keynav_active_flag[t];
	}


	if($.keynav_active_flag[t] == undefined) {
	    //event not bound yet
	    $(document).bind("keydown{0}".format(t), function(e){
		if(!is_active(t)) return;
		
		if (e.keyCode == 37) {
		    //left
		    focusOnPrev();
		}
		else if(e.keyCode == 39) {
		    //right
		    focusOnNext();
		}
	    
	    });
	}
	$.keynav_activate(t);

	$.fn.setToCurrent = function(item_type){
	    var s = $.keynav_settings[item_type];
	    if(s == undefined) return;//no setting for this type
	    
	    var current = getCurrent();
	    if(current.length == 0) { //The One not appeared yet
		current = this.first();
		current.addClass("keynav-current");
		s.focus(current);
	    }
	    else{
		s.blur(current);
		current.removeClass("keynav-current");
		
		var next = this.first()
		
		if(next.length==0) next = current.siblings(t).first();
		
		next.addClass("keynav-current");
		s.focus(next);
	    }
	}
    };



})(jQuery, window, document);
