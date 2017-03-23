// Helper for toggling CRT screen power

$(".surround").click(function(e) {
    if ($(e.currentTarget).hasClass("on")) {
        $(".surround").addClass("on")
        $(e.currentTarget).removeClass("on")
        $("#switch").prop("checked", false);
    } else {
        $(".surround").removeClass("on")
        $(e.currentTarget).addClass("on")
        $("#switch").prop("checked", true);
    }
})