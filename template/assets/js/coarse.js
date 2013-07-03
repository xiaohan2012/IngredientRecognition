(function($, window, document, undefined){
    //utility functions, get useful jq objects
    $.fn.getTextButton = function(){
	if (this.is(".ingredient")) return this.children("button.ing-name");
	else if(this.is(".dropdown-menu")) return this.prev();
	else if(this.is("li") || this.is("a")) return this.closest(".ingredient").getTextButton();
    };
    
    $.fn.getIngredientDiv = function(){
	return this.closest(".ingredient");
    }

    $.fn.getWordCutResult = function(){
	return $.map(this.filter(".sentence").find(".ingredient .ing-name"), function(s){
	    return $.trim($(s).justtext());
	});
    }

    $.fn.getTaggingResult = function(){
	return $.map(this.filter(".sentence").find(".ingredient"), function(s){
	    return {
		text: $.trim($(s).children(".ing-name").justtext()),
		tags: $.map($(s).find(".tag"), function(t){
		    return $(t).attr("name");
		})
	    };
	});
    }
    
    $.fn.post = function(){
	return this.filter(".sentence").each(function(){
	    $.post("/hand/to-do", {
		"key": $(this).attr("key"),
		"newcuts": JSON.stringify($(this).getWordCutResult()),
		"annotation": JSON.stringify($(this).getTaggingResult())
	    })
		.done(function(){
		    console.log("done");
		})
		.fail(function(){
		    console.log("fail");
		})
	})
    }
})(jQuery, window, document);

(function($, window, document, undefined){
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

    $(".ingredient .ingname").keyoper();

})(jQuery, window, document);

