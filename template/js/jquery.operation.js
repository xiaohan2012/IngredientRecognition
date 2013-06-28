(function($, window, document, undefined){
    //utility function, create new ingredient
    $.fn.appendIngredient = function(name){
	var $ing = $("<div/>", {
	    "class": "btn-group ingredient"
	}).append(
	    $("<button/>", {
		"class": "btn dropdown-toggle ing-name",
		"data-toggle": "dropdown",
		"text": name
	    }).append(
		$("<span class='caret'/>"))
	);
	
	return this.filter(".ingredient").each(function(){
	    $ing.insertAfter(this);
	});
    };

    //split the word at `position` and create new words
    $.fn.split = function(position) {
	return this.filter(".ingredient").each(function(){
	    var $this = $(this);
	    var name = $.trim($this.children("button.ing-name").justtext());
	    
	    var part1_name = name.substr(0, position);
	    var part2_name = name.substr(position, name.length);
	    
	    //create jq and insert after this
	    $(this).appendIngredient(part2_name)
		.appendIngredient(part1_name)
	    .remove();
	});
    }

    $.beginSelectSplitPosition = function() {
	var $btn = $(".ingredient").getCurrent().getTextButton();
	
	var text = $.trim($btn.justtext());
	
	if(text.length <= 1) return;//single char word, ignore
	
	$btn.hide();
	
	for(var i = text.length - 1; i >= 0; i--) {
	    var c = text.charAt(i);
	    $("<button/>", {
		"class": "btn btn-warning splitted-char",
		"text": c,
	    }).insertAfter($btn)
		.on("click", function(){
		    var $this = $(this);
		    $this.add($this.siblings(".splitted-char").filter(".btn-info"))
			.toggleClass("btn-warning btn-info");
		});
	}
	
    };
    
    //return true if user has began split point selection
    $.beganSplitPointSelection = function() {
	return $(".ingredient").getCurrent().getTextButton().is(":hidden");
    }
    
    //get the split point position
    $.getSplitPointPosition = function() {
	var jq_chars = $(".ingredient").getCurrent().children(".splitted-char");
	var active = jq_chars.filter(".btn-info");
	return jq_chars.index(active);
    }
    
    //when split operation ends, do the surface work
    $.endSplitWord = function() {
	var pos = $.getSplitPointPosition();
	$(".ingredient").getCurrent().split(pos);
    }
})(jQuery, window, document);

