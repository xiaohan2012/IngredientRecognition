String.prototype.format = String.prototype.f = function() {
    var s = this,
    i = arguments.length;
    
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};


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


//utility functions, get useful jq objects
$.fn.getTextButton = function(){
    if (this.is(".ingredient")) return this.children("button.ing-name");
    else if(this.is(".dropdown-menu")) return this.prev();
    else if(this.is("li") || this.is("a")) return this.closest(".ingredient").getTextButton();
};

$.fn.getIngredientDiv = function(){
    return this.closest(".ingredient");
}


var popup_splitword_window = function(word) {
    
};

jQuery(function($){

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
    var selector_name = ".sentence:eq(0) .ingredient";
    $(selector_name).keynav({
	keynav_id: "ingredient",
	selectorName: selector_name,
	focus: function(current){
	    current.children("button.ing-name").toggleClass("btn-warning");
	},
	blur: function(current){
	    current.children("button.ing-name").toggleClass("btn-warning");
	}
    });
    

    $(".ingredient .ingname").keytag({
	"tags": [{"name":"begin", "shortcut": "B"}, {"name": "continue", "shortcut": "C"}]
    });

    $(".ingredient .ingname").keyoper({
    });
    
    //$.setToCurrent(".ingredient");

    //$.start_merge();
    
    /*
    console.log("is to be merged?", $(".ingredient:eq(0)").is_to_be_merged());
    console.log("has began merge?", $.began_merge());
    $.start_merge();
    console.log("has began merge?", $.began_merge());
    console.log("is to be merged?", $(".ingredient:eq(0)").is_to_be_merged());
    
    $(".ingredient.keynav-current").next().toggle_merge().next().toggle_merge().toggle_merge();
    */
    //$.end_merge();
});

