(function($, window, document, undefined){
    $.fn.keytag = function(options) {
	var settings = $.extend({}, {}, options);
	
	settings.tag_chars = $.map(settings.tags, function(v) {
	    return v.shortcut;
	});
	
	settings.shortcut2tag = {};
	for(var i=0; i < settings.tags.length; i++) {
	    var tag = settings.tags[i];
	    settings.shortcut2tag[tag.shortcut] = tag;
	}
	
	$(document).keydown(function(e){
	    var c = String.fromCharCode(e.keyCode).toUpperCase();
	    if ($.inArray(c, settings.tag_chars) >=0 ){
		var tag = settings.shortcut2tag[c];
		var cur = $(".ingredient.keynav-current");
		if(cur.isTaggedAs(tag.name))
		    cur.untag(tag.name);
		else
		    cur.tagAs(tag);
	    }
	});
    }
})(jQuery, window, document);
