// Helper for toggling CRT screen power effect
$(".surround").click(function (e) {
    if ($(e.currentTarget).hasClass("on")) {
        // Shut off the CRT monitor
        $("#switch").prop("checked", false);
        $(e.currentTarget).removeClass("on");
        $(".flicker-button").removeClass("on");
        $(".container").removeClass("scanlines");
    } else {
        // Turn on the CRT monitor and enable scanlines if the flicker checkbox is enabled
        if ($("#flicker").is(":checked")) {
            $(".flicker-button").addClass("on");
            $(".container").addClass("scanlines");
        }
        $(e.currentTarget).addClass("on");
        $("#switch").prop("checked", true);
    }
});

// Helper for toggling CRT screen flickering effect
$(".flicker-button").click(function () {
    if ($("#flicker").is(":checked") && $("#switch-wrap").hasClass("on")) {
        $("#flicker").prop("checked", false);
        $(".flicker-button").removeClass("on");
        $(".container").removeClass("scanlines");
    } else {
        if ($("#switch").is(":checked")) {
            $("#flicker").prop("checked", true);
            $(".flicker-button").addClass("on");
            $(".container").addClass("scanlines");
        }
    }
});

function loadJSON() {
    console.log("Loading JSON object of startpage links...")
    $.getJSON('links.json', function(links) {
        $.each(links.link, function(i,data){
            $(".shortcuts").append('' +
                '<li class="tagged-item" data-item-tags="'+data.tags+'">' +
                '<a class="bookmark" href="'+data.url+'" target="_blank">' +
                '<img class="retro" src="images/'+data.icon+'"/>' +
                '<span class="link-name">'+data.name+'</span>' +
                '<br>' +
                '<span class="tags link-"'+i+'>' +
                '</span>' +
                '<br>' +
                '<span>https://scar45.me/with/a/decently/long/URL/for/testing/purposes</span>' +
                '</a></li>'
            );
            $.each(data.tags, function(j,tag){
                console.log(tag);
                $(".link-").eq(i).append('<span>'+tag+'</span>');
            });
        });
    }).done(function(){
        $('div.tag-list').tagSort({
            items: 'li.tagged-item',
            reset: '.tagsort-reset',
            fadeTime: 420
        });
    });
}

// Weather support via simpleWeather v3.1.0 - http://simpleweatherjs.com
// Replace 'Toronto' with your city name
function initLocation() {
    console.log("Getting weather info...");
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            loadWeather(position.coords.latitude + ',' + position.coords.longitude);
        });
    } else {
        loadWeather('Toronto', ''); //@params location, woeid
    }
}

function loadWeather(location, woeid) {
    function update() {
        $('#clock').html(moment().format('MM/DD/YY h:mm:ss a'));
    }
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function (weather) {
            var timestamp = moment(weather.updated);
            html = '<div class="weather-details"><ul class="weather-current"><li><a href="' + weather.link + '" target="_blank"><i class="icon-weather icon-' + weather.code + '"></i></a> ' + weather.temp + '&deg;' + weather.units.temp + '</li>';
            html += '<li class="currently">' + weather.currently + '</li>';
            html += '<li>H:' + weather.high + '&deg;C // L:' + weather.low + '&deg;C</li>';
            html += '<li>' + weather.city + ', ' + weather.region + '</li></ul>';
            html += '<ul class="weather-forecast"><li><i class="icon-weather icon-' + weather.forecast[1].code + '"></i><span>' + weather.forecast[1].day + ':' + weather.forecast[1].text + '<br>H:' + weather.forecast[1].high + '&deg;C // L:' + weather.forecast[1].low + '&deg;C</span></li><li><i class="icon-weather icon-' + weather.forecast[2].code + '"></i><span>' + weather.forecast[2].day + ':' + weather.forecast[2].text + '<br>H:' + weather.forecast[2].high + '&deg;C // L:' + weather.forecast[2].low + '&deg;C</span></li><li><i class="icon-weather icon-' + weather.forecast[3].code + '"></i><span>' + weather.forecast[3].day + ':' + weather.forecast[3].text + '<br>H:' + weather.forecast[3].high + '&deg;C // L:' + weather.forecast[3].low + '&deg;C</span></li></ul></div>';
            html += '<p><span id="clock"></span> // Weather updated ' + moment(timestamp).fromNow() + '</p>';
            $("#weather").html(html);
            setInterval(update, 1000);
        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}
$(document).ready(function () {
    initLocation();
    loadJSON();

    setInterval(initLocation, 600000); // Update the weather every 10 minutes.
});
