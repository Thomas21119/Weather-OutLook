// variables
var mainEl = $('#main')
var searchAreaEl = $('searchArea')
var fiveDayForecastEl = $('fiveDayForecast')
var nameEl = $('#cityName')
var tempEl = $('#cityTemp')
var windEl = $('#cityWind')
var humidityEl = $('#cityHumidity')
var UvEl = $('#cityUv')
var errorEl = $('#error')
var errorMsgEl = $('#errorMsg')
var cityEl = $('#city')
var pastSearches = $('.pastSearchesList')

// when you search for a city it will add the option as a button click underneath search area
function addSearch() {
    addPastSearch = $('<li> <button class="cityButton">' + cityEl.val() + '</button></li>')
    pastSearches.append(addPastSearch)
    let i = localStorage.length
    if (i == localStorage.length){
        i++
    }
    // and saves it to local storage
    localStorage.setItem('city' + i, addPastSearch[0].outerHTML)
    
    var cityBtn = $('.cityButton')
    cityBtn.on('click', pastSearch)
    cityBtn.on('click', fiveDayForecast)
    cityBtn.on('click', getUvPastSearch)
}


var searchBtn = $('#search')
searchBtn.on('click', getWeather)
searchBtn.on('click', fiveDayOnSearchForecast)

// when you search a city, fetch current api to get lat/lon values then the onecall api to get the uv index and input it to the uv index element
function getUvSearch() {
    var city = cityEl.val()
    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid=e7f511b5d71366565851371d14913d91';
    fetch(currentApiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data.coord.lat
                var lon = data.coord.lon
                var latLonApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +  lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly&appid=e7f511b5d71366565851371d14913d91'
                fetch(latLonApiUrl)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then (function(data) {
                            $('#cityUv').text("")
                            $('#cityUv').text(data.current.uvi)
                            if ( $('#cityUv').text()<3) {
                                $('#cityUv').attr('class', 'low')
                            } else if ($('#cityUv').text()<6) {
                                $('#cityUv').attr('class', 'moderate')
                            } else if ($('#cityUv').text()<8) {
                                $('#cityUv').attr('class', 'high')
                            } else if ($('#cityUv').text()<11) {
                                $('#cityUv').attr('class', 'veryHigh')
                            } else {
                                $('#cityUv').attr('class', 'extreme')
                            }
                        })
                    }  else {
                        console.log("error: " + response.status)
                        mainEl.attr('class', 'hidden')
                        fiveDayForecastEl.attr('class', 'hidden')
                        errorEl.attr('class', 'error')
                        errorMsgEl.text('error: '+ response.status)
                    }
                })
            })
        }
    })
}


// on past search button click go to current api and get latitude and lonitudy then go to onecall api to get uv index and write it in uv index element
function getUvPastSearch() {
    var city = $(this).text()
    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid=e7f511b5d71366565851371d14913d91';
    fetch(currentApiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lat = data.coord.lat
                var lon = data.coord.lon
                var latLonApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +  lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly&appid=e7f511b5d71366565851371d14913d91'
                fetch(latLonApiUrl)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then (function(data) {
                            $('#cityUv').text("")
                            $('#cityUv').text(data.current.uvi)
                            if ( $('#cityUv').text()<3) {
                                $('#cityUv').attr('class', 'low')
                            } else if ($('#cityUv').text()<6) {
                                $('#cityUv').attr('class', 'moderate')
                            } else if ($('#cityUv').text()<8) {
                                $('#cityUv').attr('class', 'high')
                            } else if ($('#cityUv').text()<11) {
                                $('#cityUv').attr('class', 'veryHigh')
                            } else {
                                $('#cityUv').attr('class', 'extreme')
                            }
                        })
                    }  else {
                        console.log("error: " + response.status)
                        mainEl.attr('class', 'hidden')
                        fiveDayForecastEl.attr('class', 'hidden')
                        errorEl.attr('class', 'error')
                        errorMsgEl.text('error: '+ response.status)
                    }
                })
            })
        }
    })
}

// when you search for a city fetch the weather for that city and writeitin its respective element
function getWeather() {
    var city = cityEl.val()
    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid=e7f511b5d71366565851371d14913d91';
    fetch(currentApiUrl)
    .then(function (response) {
        if (response.ok) {
            errorEl.attr('class', 'hidden')
            response.json().then(function (data) {
                var iconcode = data.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $('#wicon').attr('src', iconurl);
                getUvSearch()
                mainEl.attr('class', '')
                nameEl.text(data.name + ' ' + data.sys.country + ': ' + moment.unix(data.dt).format('Do MMM YYYY'));
                tempEl.text(data.main.temp);
                windEl.text(data.wind.speed)
                humidityEl.text(data.main.humidity)
                addSearch()
            })
        } else {
            console.log("error: " + response.status)
            mainEl.attr('class', 'hidden')
            fiveDayForecastEl.attr('class', 'hidden')
            errorEl.attr('class', 'error')
            errorMsgEl.text('error: '+ response.status)
        }
    })
}


// on past button click get current weather api and present current data
function pastSearch() {
    var city = $(this).text()
    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid=e7f511b5d71366565851371d14913d91';
    fetch(currentApiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                errorEl.attr('class', 'hidden')
                var iconcode = data.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $('#wicon').attr('src', iconurl);
                mainEl.attr('class', '')
                nameEl.text(data.name + ' ' + data.sys.country + ': ' + moment.unix(data.dt).format('Do MMM YYYY'));
                tempEl.text(data.main.temp);
                windEl.text(data.wind.speed)
                humidityEl.text(data.main.humidity)
            })
        } else {
            console.log("error: " + response.status)
            mainEl.attr('class', 'hidden')
            fiveDayForecastEl.attr('class', 'hidden')
            errorEl.attr('class', 'error')
            errorMsgEl.text('error: '+ response.status)
        }
    })
}

// when presenting any data get the next 5 days forecast by going to openweather apiand looping for each div box getting the temperature win and humidity for the same time each day
function fiveDayForecast() {
    var city = $(this).text();
    var fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=e7f511b5d71366565851371d14913d91'
    fetch(fiveDayApiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                let z = 0
                for (z = 0; z < 5; z++){
                    var date = $('#date' + (z+1))
                    var iconcode = data.list[(z*8)].weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $('.weatherIcon' + z).attr('src', iconurl);
                    date.text(data.list[(z*8)].dt_txt)
                    $('#temp' + z).text('Temperature: ' + data.list[(z*8)].main.temp + '°C')
                    $('#wind' + z).text('Wind: ' + data.list[(z*8)].wind.speed + 'm/s')
                    $('#humidity' + z).text('Humidity: ' + data.list[(z*8)].main.humidity + '%')
                
        }})
        } else {
            console.log("error: " + response.status)
            mainEl.attr('class', 'hidden')
            fiveDayForecastEl.attr('class', 'hidden')
            errorEl.attr('class', 'error')
            errorMsgEl.text('error: '+ response.status)
        }
    })
}

// when presenting any data get the next 5 days forecast by going to openweather apiand looping for each div box getting the temperature win and humidity for the same time each day
function fiveDayOnSearchForecast() {
    var city = cityEl.val();
    var fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=e7f511b5d71366565851371d14913d91'
    fetch(fiveDayApiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                let z = 0
                for (z = 0; z < 5; z++){
                    var date = $('#date' + (z+1))
                    var iconcode = data.list[(z*8)].weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $('.weatherIcon' + z).attr('src', iconurl);
                    date.text(data.list[(z*8)].dt_txt)
                    $('#temp' + z).text('Temperature: ' + data.list[(z*8)].main.temp + '°C')
                    $('#wind' + z).text('Wind: ' + data.list[(z*8)].wind.speed + 'm/s')
                    $('#humidity' + z).text('Humidity: ' + data.list[(z*8)].main.humidity + '%')
                
        }})
        } else {
            console.log("error: " + response.status)
            mainEl.attr('class', 'hidden')
            fiveDayForecastEl.attr('class', 'hidden')
            errorEl.attr('class', 'error')
            errorMsgEl.text('error: '+ response.status)
        }
    })
}

// on page load check for last 10 local storage index's and add it to the past searches list
for (i = localStorage.length; i > (localStorage.length-10); i--)
pastSearches.append(localStorage.getItem('city' + i))

// when a button is clicked run these functions
var cityBtn = $('.cityButton')
cityBtn.on('click', pastSearch)
cityBtn.on('click', fiveDayForecast)
cityBtn.on('click', getUvPastSearch)