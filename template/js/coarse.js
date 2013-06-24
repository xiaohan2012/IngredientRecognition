String.prototype.format = String.prototype.f = function() {
    var s = this,
    i = arguments.length;
    
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

jQuery(function($){
    var tags = ["begin", "continue"];
    $.each(tags, function(i,tag){
	$("#ingredients").on("click",".as-{0}".format(tag) , function(){
	    $(this).getIngredientDiv().tagAs(tag);
	})
    });
    
    $.fn.getTextButton = function(){
	if (this.is(".ingredient")) return this.children("button.btn");
	else if(this.is(".dropdown-menu")) return this.prev();
	else if(this.is("li")) return this.parent().getTextButton();
    };

    $.fn.getIngredientDiv = function(){
	return this.closest(".ingredient");
    }

    $.fn.tagAs = function(tagName) {
	return this.filter(".ingredient").each(function(){
	    var $this = $(this);
	    if ( !$this.isTaggedAs(tagName)) //not tagged as `tagname` yet
		$("<span/>", {
		    "text": tagName.charAt(0).toUpperCase(),
		    "class": "badge badge-info tag is-{0}".format(tagName),
		}).appendTo($this.getTextButton());
	});
    };

    $.fn.isTaggedAs = function(tagName) {
	return this.filter(".ingredient").has(".is-{0}".format(tagName)).length > 0;
    }
    
    $.fn.untag = function(tagName) {
	return this.filter(".ingredient").find(".is-{0}".format(tagName)).remove();
    }

    $.fn.untagAll = function() {
	return this.filter(".ingredient").find(".tag").remove();
    }
    
    $(".ingredient").tagAs("feng");
});
