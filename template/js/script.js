var current_key = null; //key of the current ingredient raw text 
var selected_indices = []; //the current annotation status


function server_annotate(key, list){
    //send ajax call to server
    //update the annotation
    console.log(key, list);
    $.post("/", {key: key, indices: JSON.stringify(list)}, function(){
	$("ul[key="+ key+ "]").find(".word").removeClass("ui-selectee").addClass("annotated");
    })

    selected_indices = [];//empty it for the next round of annotation
}

function delete_text(key) {
    $.post("/delete", {key: key}, function(){
	$("ul[key="+ key+ "]").fadeOut();
    })
}
$(document).ready(function(){
    /*
    $(".selectable").selectable({
	filter: "li" ,
	cancel: ".del-btn",
	stop: function() {
	    selected_indices = [];
	    $(this).find("li.ui-selected").each(function(){
		var which = $(this).closest(".selectable").find("li.ui-selectee").index(this);
		selected_indices.push(which);
	    });
	},
	start: function() {
	    var this_key = $(this).attr("key");
	    if (current_key == null) //current not set yet
		current_key = $(this).attr("key");
	    
	    if (current_key != this_key) {// we are not in the same piece of text
		//thus, need the update the previous one
		server_annotate(current_key, selected_indices);
		
		//set the real key
		current_key = this_key;
	    }
	    
	}
    });
    */

    $(".del-btn").click(function(){
	console.log("very der!");
	var key = $(this).attr("key");
	delete_text(key);
    });
});
