String.prototype.format = String.prototype.f = function() {
    var s = this,
    i = arguments.length;
    
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

//possible tag info
var tags = [
    {
	"name":"begin", 
	"shortcut": "B"
    },
    {
	"name": "continue",
	"shortcut": "C"
    }
];

//operation on splitted words
var word_operation = [
    {
	"name": "split",
	"shortcut": "S",
	"click": function(){
	    var $btn = $(this).getTextButton();
	    
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
	}
    }, 
    {
	"name": "merge",
	"shortcut": "M",
	"click": function() {

	}
    }
];

$.fn.justtext = function() {
    //util, just the text of the jq, not its children's
    return $(this).clone()
        .children()
        .remove()
        .end()
        .text();
};

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
    ).load_dropdown_menu();
    
    return this.filter(".ingredient").each(function(){
	$ing.insertAfter(this);
    });
};

//dropdown menu for each word
$.fn.load_dropdown_menu = function(){
    return this.filter(function(){
	return $(this).is(".ingredient") && $(this).find(".dropdown-menu").length == 0;//no dropdown-menu loaded yet
    }).each(function(){
	var $dropdown = $("<ul class='dropdown-menu'>");
	$.each(tags, function(i, tag){
	    $("<a>", {
		"class": "as-{0}".format(tag.name),
		text: tag.name
	    }).appendTo($dropdown);
	});
	
	$.each(word_operation, function(i, oper){
	    $("<a>", {
		    "class": "{0}-word".format(oper.name),
		text: oper.name
		}).appendTo($dropdown);
	});
	
	$dropdown.appendTo(this);
	$(this).find(".dropdown-menu a").wrap("<li>");
	
	//add dropdown event on this ingredient
	    $(this).find(".dropdown-toggle").dropdown();
    });
};

//utility functions, get useful jq objects
$.fn.getTextButton = function(){
    if (this.is(".ingredient")) return this.children("button.btn");
    else if(this.is(".dropdown-menu")) return this.prev();
    else if(this.is("li") || this.is("a")) return this.closest(".ingredient").getTextButton();
};

$.fn.getIngredientDiv = function(){
    return this.closest(".ingredient");
}


//split the word at `position`
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

var popup_splitword_window = function(word) {
    
};

jQuery(function($){
    //add opearation dropdown menu for all words
    $(".ingredient").load_dropdown_menu();

    //attach event on tag button 
    $.each(tags, function(i,tag){
	$("#ingredients").on("click",".as-{0}".format(tag.name) , function(){
	    $(this).getIngredientDiv().tagAs(tag.name);
	});
	
    });
    
    //attach event on split and merge
    $.each(word_operation, function(i, oper) {
	$("#ingredients").on("click", ".{0}-word".format(oper.name), oper.click);
    });
    
    //test case
    //$(".ingredient").tagAs("feng");
    //$(".ingredient:eq(0)").appendIngredient("fengSB");
    //$(".ingredient:eq(0)").split(2);
    //$(".ingredient:eq(0) .split-word").click();

    //keyboard navigation
    $(".ingredient").keynav();

    $(".ingredient .ingname").keytag({
	"tags": tags
    });
});

