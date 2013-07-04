(function($, window, document, undefined){
    
    //tag operation function
    $.fn.tagAs = function(tag) {
	return this.filter(".ingredient").each(function(){
	    var $this = $(this);
	    if ( !$this.isTaggedAs(tag.name)) //not tagged as `tagname` yet
		$("<span/>", {
		    "text": tag.shortcut,
		    "class": "badge badge-info tag is-{0}".format(tag.name),
		}).appendTo($this.getTextButton()).attr("name", tag.name);
	});
    };

    //check if this word is tagged as `tagName`
    $.fn.isTaggedAs = function(tagName) {
	return this.filter(".ingredient").has(".is-{0}".format(tagName)).length > 0;
    }
    
    //untag one word
    $.fn.untag = function(tagName) {
	return this.filter(".ingredient").find(".is-{0}".format(tagName)).remove();
    }
    
    //restore to init state
    $.fn.untagAll = function() {
	return this.filter(".ingredient").find(".tag").remove();
    }

})(jQuery, window, document);
    
