
// Helper for toggling CRT screen power effect
$(".surround").click(function(e) {
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
$(".flicker-button").click(function() {
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

// Weather support via simpleWeather v3.1.0 - http://simpleweatherjs.com
// Replace 'Toronto' with your city name
function initLocation() {
  console.log("Getting weather info...");
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
	  loadWeather(position.coords.latitude+','+position.coords.longitude);
	});
  } else {
	loadWeather('Toronto',''); //@params location, woeid
  }
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html = '<h2><a href="'+weather.link+'" target="_blank"><i class="icon-weather icon-'+weather.code+'"></i></a> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul class="weather-current"><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>H:'+weather.high+'&deg;C // L:'+weather.low+'&deg;C</li></ul>';  
      html += '<ul class="weather-forecast"><li><i class="icon-weather icon-'+weather.forecast[1].code+'"></i>'+weather.forecast[1].day+':'+weather.forecast[1].text+'<br>H:'+weather.forecast[1].high+'&deg;C // L:'+weather.forecast[1].low+'&deg;C</li><li><i class="icon-weather icon-'+weather.forecast[2].code+'"></i>'+weather.forecast[2].day+':'+weather.forecast[2].text+'<br>H:'+weather.forecast[2].high+'&deg;C // L:'+weather.forecast[2].low+'&deg;C</li><li><i class="icon-weather icon-'+weather.forecast[3].code+'"></i>'+weather.forecast[3].day+':'+weather.forecast[3].text+'<br>H:'+weather.forecast[3].high+'&deg;C // L:'+weather.forecast[3].low+'&deg;C</li><li><i class="icon-weather icon-'+weather.forecast[4].code+'"></i>'+weather.forecast[4].day+':'+weather.forecast[4].text+'<br>H:'+weather.forecast[4].high+'&deg;C // L:'+weather.forecast[4].low+'&deg;C</li></ul>';
      var timestamp = moment(weather.updated);
      html += '<p>Weather updated '+moment(timestamp).fromNow()+' <br>('+moment(timestamp).format('MM/DD/YY h:mma')+')</p>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

$(document).ready(function() {
  initLocation();
  setInterval(initLocation, 600000); // Update the weather every 10 minutes.

  $('div.tag-list').tagSort({
    items:'li.tagged-item',
    fadeTime:420
  });
  
});
