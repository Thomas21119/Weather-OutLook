var mainEl = $('#main')
var searchAreaEl = $('searchArea')
var fiveDayForecastEl = $('fiveDayForecast')
var nameEl = $('#cityName')
var tempEl = $('#cityTemp')
var windEl = $('#cityWind')
var humidityEl = $('#cityHumidity')
var errorEl = $('#error')
var errorMsgEl = $('#errorMsg')
var cityEl = $('#city')
var pastSearches = $('.pastSearchesList')

function addSearch() {
    addPastSearch = $('<li> <button class="cityButton">' + cityEl.val() + '</button></li>')
    pastSearches.append(addPastSearch)
    let i = localStorage.length
    if (i == localStorage.length){
        i++
    }
    localStorage.setItem('city' + i, addPastSearch[0].outerHTML)
    var cityBtn = $('.cityButton')
    cityBtn.on('click', pastSearch)
    cityBtn.on('click', fiveDayForecast)
}


var searchBtn = $('#search')
searchBtn.on('click', getWeather)
searchBtn.on('click', )

function getWeather() {
    console.log($(this))
    var city = cityEl.val()
    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid=e7f511b5d71366565851371d14913d91';
    fetch(currentApiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                mainEl.attr('class', '')
                nameEl.text(data.name + ' ' + data.sys.country);
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

for (i = 0; i < 10; i++)
pastSearches.append(localStorage.getItem('city' + i))

var cityBtn = $('.cityButton')
cityBtn.on('click', pastSearch)
cityBtn.on('click', fiveDayForecast)

function pastSearch() {
    var city = $(this).text()
    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&appid=e7f511b5d71366565851371d14913d91';
    fetch(currentApiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                mainEl.attr('class', '')
                nameEl.text(data.name + ' ' + data.sys.country);
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

function fiveDayForecast() {
    var city = $(this).text();
    var fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=e7f511b5d71366565851371d14913d91'
    fetch(fiveDayApiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                var date = $('.date')
                let z = 0
                for (z = 0; z < 5; z++){
                console.log(date)
                date.each(function() {
                    $(this).text(data.list[z].dt_txt)
                })
        }})
        }
    })
}