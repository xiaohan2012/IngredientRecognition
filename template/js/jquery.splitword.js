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
	var first_ing = null;
	this.filter(".ingredient").each(function(){
	    var $this = $(this);
	    var name = $.trim($this.children("button.ing-name").justtext());
	    
	    var part1_name = name.substr(0, position);
	    var part2_name = name.substr(position, name.length);
	    
	    //create jq and insert after this
	    $(this).appendIngredient(part2_name)
		.appendIngredient(part1_name)
	    first_ing = $(this).next();

	    $(this).remove();
	});
	return first_ing;
    }

    $.beginSelectSplitPosition = function() {
	var $btn = $(".ingredient.keynav-current").getTextButton();
	
	var text = $.trim($btn.justtext());
	
	if(text.length <= 1) return;//single char word, ignore
	
	$btn.hide();
	
	var $newdiv = $("<div/>", {"class":"splitted-word"}).insertAfter($btn);
	
	for(var i = 0; i < text.length; i++) {
	    var c = text.charAt(i);
	    $("<button/>", {
		"class": "btn btn-warning splitted-char",
		"text": c,
	    }).appendTo($newdiv)
		.on("click", function(){
		    var $this = $(this);
		    $this.add($this.siblings(".splitted-char").filter(".btn-info"))
			.toggleClass("btn-warning btn-info");
		});
	}
	
    };
    
    //return true if user has began split point selection
    $.beganSplitPointSelection = function() {
	return $(".ingredient.keynav-current").getTextButton().is(":hidden");
    }
    
    //get the split point position
    $.getSplitPointPosition = function() {
	var jq_chars = $(".ingredient.keynav-current").find(".splitted-char");
	var active = jq_chars.filter(".btn-info");
	return jq_chars.index(active);
    }
    
    //when split operation ends, do the surface work
    $.endSplitWord = function() {
	var pos = $.getSplitPointPosition();

	$(".ingredient.keynav-current").split(pos).setToCurrent(".ingredient");
	
	//rebind the keynav
	$.keynav_activate(".ingredient");
    }

    $.cancelSplitWord = function() {
	$(".ingredient.keynav-current").find(".splitted-word").remove().end().getTextButton().show();
	//rebind the keynav
	$.keynav_activate(".ingredient");
    }
})(jQuery, window, document);

