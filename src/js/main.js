// Helper for toggling CRT screen power effect
$(".surround").click(function (e) {
    if ($(e.currentTarget).hasClass("on")) {
        // Shut off the CRT monitor
        $("#switch").prop("checked", false);
        $(e.currentTarget).removeClass("on");
        $(".crt-effects").removeClass("scanlines");
    } else {
        // Turn on the CRT monitor and enable scanlines if the flicker checkbox is enabled
        if ($("#flicker").is(":checked")) {
            $(".crt-effects").addClass("scanlines");
        }
        $(e.currentTarget).addClass("on");
        $("#switch").prop("checked", true);
    }
});

// Helper for toggling CRT color theme
$(".theme-button").click(function () {
   if ($("#alttheme").is(":checked")) {
        $("#alttheme").prop("checked", false);
        $("body").removeClass("green")
    } else {
        $("#alttheme").prop("checked", true);
        $("body").addClass("green")
    }
});

// Helper for toggling CRT screen flickering effect
$(".power-label").click(function () {
    if ($("#flicker").is(":checked") && $("#switch-wrap").hasClass("on")) {
        $("#flicker").prop("checked", false);
        $(".crt-effects").removeClass("scanlines");
        $(".power-label").removeClass("btn-scanlines");
    } else {
        if ($("#switch").is(":checked")) {
            $("#flicker").prop("checked", true);
            $(".crt-effects").addClass("scanlines");
            $(".power-label").addClass("btn-scanlines");
        }
    }
});

function sortAlpha(a,b){
    return a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase() ? 1 : -1;
};

function loadJSON() {
    //console.log("Loading JSON object of startpage links...")
    $.getJSON('links.json', function(links) {
        $(".shortcuts").html("");
        $.each(links.link, function(i,data){
            if (data.invert == true) {
                $(".shortcuts").append('' +
                    '<li class="tagged-item" data-item-tags="'+data.tags+'">' +
                    '<a class="bookmark" href="'+data.url+'" target="_blank">' +
                    '<img class="retro invert" src="images/'+data.icon+'"/>' +
                    '<span class="link-name">'+data.name+'</span>' +
                    '<br><span class="link-url">'+data.url+'</span>' +
                    '<br><span class="tags"></span><br>' +
                    '</a></li>'
                );
            } else {
                $(".shortcuts").append('' +
                    '<li class="tagged-item" data-item-tags="'+data.tags+'">' +
                    '<a class="bookmark" href="'+data.url+'" target="_blank">' +
                    '<img class="retro" src="images/'+data.icon+'"/>' +
                    '<span class="link-name">'+data.name+'</span>' +
                    '<br><span class="link-url">'+data.url+'</span>' +
                    '<br><span class="tags"></span><br>' +
                    '</a></li>'
                );
            }
            $.each(data.tags, function(t,tag){
                //console.log(tag);
                $(".tags").eq(i).append('<span>'+tag+'</span>');
            });
        });
    }).done(function(){
        $('div.tag-list').tagSort({
            items: 'li.tagged-item',
            reset: '.tagsort-reset',
            fadeTime: 420
        });
        $('div.tag-list span:not(.tagsort-reset)').sort(sortAlpha).appendTo('div.tag-list');
    });
}

// Weather support via simpleWeather v3.1.0 - http://simpleweatherjs.com
// Replace 'Toronto' with your city name
function initLocation() {
    //console.log("Getting weather info...");
    if ("geolocation" in navigator) {
        var options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');

            loadWeather(pos.coords.latitude + ',' + pos.coords.longitude);
        };

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
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
            html += '<ul class="weather-forecast"><li><i class="icon-weather icon-' + weather.forecast[1].code + '"></i><span>' + weather.forecast[1].day + ': ' + weather.forecast[1].text + '<br>H: ' + weather.forecast[1].high + '&deg;C // L: ' + weather.forecast[1].low + '&deg;C</span></li><li><i class="icon-weather icon-' + weather.forecast[2].code + '"></i><span>' + weather.forecast[2].day + ': ' + weather.forecast[2].text + '<br>H: ' + weather.forecast[2].high + '&deg;C // L: ' + weather.forecast[2].low + '&deg;C</span></li><li><i class="icon-weather icon-' + weather.forecast[3].code + '"></i><span>' + weather.forecast[3].day + ': ' + weather.forecast[3].text + '<br>H: ' + weather.forecast[3].high + '&deg;C // L: ' + weather.forecast[3].low + '&deg;C</span></li></ul></div>';
            html += '<p><span id="clock"></span> // Weather updated ' + moment(timestamp).fromNow() + '</p>';
            $("#weather").html(html);
            console.log(html);
            setInterval(update, 1000);
        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}

function randomgen() {
    // Totally pointless, yet somewhat stylish extra 1KB of randomly generated pseudo-encryption bloat
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@^$_@`";

    for( var i=0; i < 1024; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    $(".random").text(text+"^^EXTRA1KBPAGELOADWHYNOT?");
}

$(document).ready(function () {
    initLocation(); // Request location for weather via the browser
    loadJSON(); // Read the user's links collection
    randomgen(); // Add 1KB to the page for that A E S T H E T I C look
    setInterval(randomgen, 300000); // Regenerate the fake encrypted string in footer every 5 minutes because why not?
    setInterval(initLocation, 600000); // Update the weather every 10 minutes.
});
