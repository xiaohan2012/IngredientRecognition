

//utility functions, get useful jq objects
$.fn.getTextButton = function(){
    if (this.is(".ingredient")) return this.children("button.ing-name");
    else if(this.is(".dropdown-menu")) return this.prev();
    else if(this.is("li") || this.is("a")) return this.closest(".ingredient").getTextButton();
};

$.fn.getIngredientDiv = function(){
    return this.closest(".ingredient");
}


jQuery(function($){

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
    
});

