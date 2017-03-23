
// Helper for toggling CRT screen power effect
$(".surround").click(function(e) {
    if ($(e.currentTarget).hasClass("on")) {
        $(".surround").addClass("on");
        $(e.currentTarget).removeClass("on");
        $("#switch").prop("checked", false);
    } else {
        $(".surround").removeClass("on");
        $(e.currentTarget).addClass("on");
        $("#switch").prop("checked", true);
    }
});

// Helper for toggling CRT screen flickering effect
$(".flicker-button").click(function() {
    if ($("#flicker").is(":checked")) {
        $("#flicker").prop("checked", false);
		$(".flicker-button").removeClass("on");
    } else {
        $("#flicker").prop("checked", true);
		$(".flicker-button").addClass("on");
    }
});
