$(document).ready(function(){
    var is_B = function(self){
	//if the current button is tagged as Begin
	return $(self).closest(".btn-group").find("button.btn .is-B").length == 1; 
    };

    var is_C = function(self){
	//if the current button is tagged as Continue
	return $(self).closest(".btn-group").find("button.btn .is-C").length == 1;
    };

    $(".as-begin").click(function(){
	//tag the current button as Begin if it has not been tagged as Begin
	if(!is_B(this)){
	    $(this).closest(".btn-group").find("button.btn .is-C").remove();
	    $(this).closest(".btn-group").children("button.btn").append("<span class='badge badge-success is-B'>B</span>");
	}
    });

    $(".as-continue").click(function(){
	//tag the current button as Continue if it has not been tagged as Begin
	if(!is_C(this)){
	    $(this).closest(".btn-group").find("button.btn .is-B").remove();
	    $(this).closest(".btn-group").children("button.btn").append("<span class='badge badge-info is-C'>C</span>");
	}
    });
    $(".untag").click(function(){
	//reset the Text button so that no tags are attached
	$(this).closest(".btn-group").find("button.btn .is-B").remove();
	$(this).closest(".btn-group").find("button.btn .is-C").remove();
    });

    $(".split-word").click(function(){
	//split the current word
	var btn = $(this).closest(".ingredient").find(".ing-name-btn");

	//hide btn
	btn.hide()

	//show text box
	var name = btn.text();
	var input = "<input type='text' class='span2 split-text' value='" + name + "' ><button class='btn split-confirm-btn'>修改</button>"
	$(this).closest(".btn-group").append(input);
    });

    $(".ingredient").on("click", ".split-confirm-btn", function(){
	// after the split-word action is invoked, confirm the edit
	//get the ingredient button

	var ingredient = $(this).closest(".ingredient"); //propagate split-confirm-button to ingredient button !!!

	//and get the edit string !!! along with the next line, get the splitted strings
	var strs = ingredient.find(".split-text").val().trim();

	//split it into a list of strings
	var ings = strs.split(" ");
	
	console.log(ings);
	//if the list length is 1, this indicates no edit is performed
	//else add new ingredient buttons in the row

	//!!! nicer way to append html
	if(ings.length > 1){
	    var overall_html = "";
	    ings.map(function(ing){
		var html = "<div class='btn-group ingredient'> \
<button class='btn dropdown-toggle ing-name-btn' data-toggle='dropdown' href='#'>" + 
		    ing
		    +
		    "<span class='caret'></span> \
</button> \
<ul class='dropdown-menu'> \
<li><a class='as-begin'>Begin</a></li> \
<li><a class='as-continue'>Continue</a></li> \
<li><a class='split-word'>Split</a></li> \
<li><a class='merge-words'>Merge</a></li> \
<li><a class='untag'>Untag</a></li> \
</ul> \
</div>";
		overall_html += html;
	    });
	    // !!! add new text buttons
	    $(overall_html).insertAfter(ingredient);
	    ingredient.remove(); //do not forget to remove the original one
	}
    });
});

(function($){
    $.fn.tagAs(function(tag, options){
	
    });

    $.fn.untag(function(options){
	
    });
    
})(jQuery);
