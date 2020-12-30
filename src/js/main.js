// Helper for toggling CRT screen power effect
function powerOn() {
    var sndOn = document.getElementById("snd_power_on");
    sndOn.play();
    $("#switch").prop("checked", true);
    $(".surround").addClass("on");
    createCookie('power', 1);
}
function powerOff() {
    var sndOff = document.getElementById("snd_power_off");
    sndOff.play();
    $("#switch").prop("checked", false);
    $(".surround").removeClass("on");
    createCookie('power', 0);
}
function togglePower() {
    if ($("#switch").prop("checked")) {
        powerOff()
    } else {
        powerOn()
    }
}

// Helper for toggling CRT screen flickering effect
function scanlinesOn() {
    $("#flicker").prop("checked", true);
    $(".crt-effects").addClass("scanlines");
    $(".power-label").addClass("btn-scanlines");
    createCookie('flicker',1);
}
function scanlinesOff() {
    $("#flicker").prop("checked", false);
    $(".crt-effects").removeClass("scanlines");
    $(".power-label").removeClass("btn-scanlines");
    createCookie('flicker',0);
}
function toggleScanlines() {
    //if ($("#flicker").is(":checked") && $("#switch-wrap").hasClass("on")) {
    if ($("#flicker").is(":checked")) {
        scanlinesOff();
    } else {
        scanlinesOn();
    }
}

// Helper for toggling CRT color theme
function greenTheme() {
    $("#greenTheme").prop("checked", true);
    $("body").addClass("green");
    createCookie('greenTheme',1);
}
function amberTheme() {
    $("#greenTheme").prop("checked", false);
    $("body").removeClass("green");
    createCookie('greenTheme',0);
}
function toggleTheme() {
    if ($("#greenTheme").is(":checked")) {
        amberTheme();
    } else {
        greenTheme();
    }
}

// Sort the main tags list
function sortAlpha(a,b){
    return a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase() ? 1 : -1;
};

// Read the 'links.json' file for data to display
function loadJSON() {
    //console.log("Loading JSON object of startpage links...")
    $.getJSON('links.json', function(links) {
        $(".shortcuts").html("");
        $.each(links.link, function(i,data){
            if (data.invert == true) {
                $(".shortcuts").append('' +
                    '<li class="tagged-item" data-item-tags="'+data.tags+'">' +
                    '<a class="bookmark" href="'+data.url+'" target="_blank">' +
                    '<img class="retro invert" src="images/icons/'+data.icon+'"/>' +
                    '<span class="link-name">'+data.name+'</span>' +
                    '<br><span class="link-url">'+data.url+'</span>' +
                    '<br><span class="tags"></span><br>' +
                    '</a></li>'
                );
            } else {
                $(".shortcuts").append('' +
                    '<li class="tagged-item" data-item-tags="'+data.tags+'">' +
                    '<a class="bookmark" href="'+data.url+'" target="_blank">' +
                    '<img class="retro" src="images/icons/'+data.icon+'"/>' +
                    '<span class="link-name">'+data.name+'</span>' +
                    '<br><span class="link-url">'+data.url+'</span>' +
                    '<br><span class="tags"></span><br>' +
                    '</a></li>'
                );
            }
            $.each(data.tags, function(t,tag){
                $(".tags").eq(i).append('<span>'+tag+'</span>');
            });
        });
    }).done(function(){
        $('div.tag-wrap').tagSort({
            items: 'li.tagged-item',
            reset: '.tagsort-reset',
            sortType: 'single',
            fadeTime: 200
        });
        $('div.tag-wrap span:not(.tagsort-reset)').sort(sortAlpha).appendTo('div.tag-wrap');
    });
}

// Unused location lookup to be used with weather status later on (darksky.com)
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

        };

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        // Manually input a city to pull weather data for
    }
}

function updateTime() {
    $('#clock').html(moment().format('MM/DD/YYYY h:mm:ss a'));
}

// Totally pointless, yet somewhat stylish extra 1KB of randomly generated pseudo-encryption bloat
function randomgen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@^$_@`";

    for( var i=0; i < 1024; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    $(".random").text(text+"^^EXTRA1KBPAGELOADWHYNOT?");
}

// Set a cookie to store prefs
function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Get a cookie to read prefs
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Clean up the cookie crumbs
function eraseCookie(name) {
    createCookie(name,"",-1);
}

function readPrefs() {
    var cookiePower=readCookie('power'),
        cookieFlicker=readCookie('flicker'),
        cookieGreenTheme=readCookie('greenTheme');

    if (cookiePower == 0) { powerOff() } else { powerOn() }
    if (cookieFlicker == 1) { scanlinesOn() } else { scanlinesOff() }
    if (cookieGreenTheme == 0) { amberTheme() } else { greenTheme() }

    console.log("cookiePower=="+cookiePower+" /// cookieFlicker=="+cookieFlicker+" /// cookieGreenTheme=="+cookieGreenTheme);
}

$(document).ready(function () {
    readPrefs(); // Read site preferences (flicker, colour, etc.)
    loadJSON(); // Read the user's links collection
    setInterval(updateTime, 1000); // Update the time every second.

    // Disabled functions (design change + weather API issues)
    //randomgen(); // Add 1KB to the page for that A E S T H E T I C look
    //setInterval(randomgen, 300000); // Regenerate the fake encrypted string in footer every 5 minutes because why not?
    //initLocation(); // Request location for weather via the browser
    //setInterval(initLocation, 600000); // Update the weather every 10 minutes.

    // Toggle display of tags on smaller breakpoints
    $(".tagsort-toggle").on('click', function() {
        $(".tag-wrap").toggle();
    });

    // Design element toggles
    $(".surround").on('click', togglePower);
    $(".power-label").on('click',toggleScanlines);
    $(".theme-button").on('click', toggleTheme);
});
