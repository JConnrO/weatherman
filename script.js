/* 
USER STORY
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

ACCEPTANCE CRITERIA
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

*/

var day1;
var day2;
var day3;
var day4;
var day5;
var apiKey = "6212c0f9ea8c0c883022423d57c46ad7";
var searchHistory = [];
var todayData = luxon.DateTime.now();
var todaysDate = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_SHORT);

var kToF = function (kelvin) {
    var fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
    return Math.floor(fahrenheit);
}
var renderUVI = function (uvi){
    if(uvi >=0 && uvi < 2){
        console.log("UVI is Low");
        return("btn btn-success disabled");
    } 
    else if(uvi >=3 && uvi < 7){
        console.log("UVI is Moderate");
        return("btn btn-warning disabled");
    }
    else if(uvi >=7){
        console.log("UVI is High");
        return("btn btn-danger disabled");
    }
}

var saveSearchHistory = function () {
    localStorage.setItem("SearchHistory", JSON.stringify(searchHistory));
}
function loadSearchHistory() {
    //If not local storage create local storage
    if (localStorage.getItem("SearchHistory") === null) {
        //Set up Array
        //localStorage.setItem("SearchHistory", []);
        searchHistory.push("Jersey City");
        saveSearchHistory();
    }
    return JSON.parse(localStorage.getItem("SearchHistory"));
}
var renderTodaysWeather = function (data) {
    var current = data.current;
    console.log(current);
    var temp = kToF(current.temp);
    var wind = current.wind_speed;
    var humidity = current.humidity;
    var uvi = current.uvi;

    var weatherCardEl = document.createElement("div");
    weatherCardEl.classList = "card col-12";

    var dataDiv = document.createElement("div");
    dataDiv.classList = "card-body";

    var tempRow = document.createElement("div");
    tempRow.classList = "row";
    var tempTitleEl = document.createElement("div");
    tempTitleEl.classList = "uvi-title col-2";
    tempTitleEl.textContent = "Temp: ";
    var tempEl = document.createElement("div");
    tempEl.textContent = + temp + " F";
    tempRow.append(tempTitleEl);
    tempRow.append(tempEl);

    var windRow = document.createElement("div");
    windRow.classList = "row";
    var windTitleEl = document.createElement("div");
    windTitleEl.classList = "uvi-title col-2";
    windTitleEl.textContent = "Wind: ";
    var windEl = document.createElement("div");
    windEl.textContent = + wind + " MPH";
    windRow.append(windTitleEl);
    windRow.append(windEl);
    
    var uviRow = document.createElement("div");
    uviRow.classList = "row";
    var uviTitleEl = document.createElement("div");
    uviTitleEl.classList = "uvi-title col-2";
    uviTitleEl.textContent = "UVI: ";
    var uviEl = document.createElement("button");
    uviEl.classList = renderUVI(uvi);
    uviEl.textContent = uvi;
    uviRow.append(uviTitleEl);
    uviRow.append(uviEl);

    var humidityRow = document.createElement("div");
    humidityRow.classList = "row";
    var humidityTitleEl = document.createElement("div");
    humidityTitleEl.classList = "uvi-title col-2";
    humidityTitleEl.textContent = "Humidity: ";
    var humidityEl = document.createElement("div");
    humidityEl.textContent = humidity + "%";

    humidityRow.append(humidityTitleEl);
    humidityRow.append(humidityEl);

    dataDiv.append(tempRow);
    dataDiv.append(windRow);
    dataDiv.append(humidityRow);
    dataDiv.append(uviRow);
    weatherCardEl.append(dataDiv);

    return weatherCardEl;
}
var renderWeatherCard = function (data, date) {

    var temp = kToF(data.temp.day);
    var humidity = data.humidity;
    var wind = data.wind_speed;
    var icon = data.weather[0].icon;


    var weatherCardEl = document.createElement("div");
    weatherCardEl.classList = "card col card-5day";

    var weatherCardTitleEl = document.createElement("h5");
    weatherCardTitleEl.textContent = date;

    var dataDiv = document.createElement("div");
    dataDiv.classList = "card-body";

    var iconEl = document.createElement("img");
    iconEl.classList = "row";
    var srcURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconEl.setAttribute("src", srcURL);

    var tempEl = document.createElement("div");
    tempEl.classList = "row";
    tempEl.textContent = "Temp: " + temp + "F";

    var windEl = document.createElement("div");
    windEl.classList = "row";
    windEl.textContent = "Wind: " + wind + " MPH";

    var humidityEl = document.createElement("div");
    humidityEl.classList = "row";
    humidityEl.textContent = "Humidity: " + humidity + "%";

    dataDiv.append(weatherCardTitleEl);
    dataDiv.append(iconEl);
    dataDiv.append(tempEl);
    dataDiv.append(humidityEl);
    dataDiv.append(windEl);
    weatherCardEl.append(dataDiv);

    return weatherCardEl;

}
var render5dayforecast = function (data) {
    var forecast5day = document.querySelector("#forecast-5day");
    day1 = todayData.plus({ days: 1 }).toLocaleString(luxon.DateTime.DATE_SHORT);
    day2 = todayData.plus({ days: 2 }).toLocaleString(luxon.DateTime.DATE_SHORT);
    day3 = todayData.plus({ days: 3 }).toLocaleString(luxon.DateTime.DATE_SHORT);
    day4 = todayData.plus({ days: 4 }).toLocaleString(luxon.DateTime.DATE_SHORT);
    day5 = todayData.plus({ days: 5 }).toLocaleString(luxon.DateTime.DATE_SHORT);

    forecast5day.append(renderWeatherCard(data.daily[1], day1));
    forecast5day.append(renderWeatherCard(data.daily[2], day2));
    forecast5day.append(renderWeatherCard(data.daily[3], day3));
    forecast5day.append(renderWeatherCard(data.daily[4], day4));
    forecast5day.append(renderWeatherCard(data.daily[5], day5));

}
var renderSearchHistory = function () {
    $("#search-history").empty();
    var searchHistoryEl = document.querySelector("#search-history");
    var historyTitleEl = document.createElement("h3");
    historyTitleEl.textContent="Search History:";
    searchHistoryEl.append(historyTitleEl);

    for (i=searchHistory.length-1; i >= 0; i--) {
       

        var historyButton = document.createElement("button");
        historyButton.setAttribute("type","button");
        historyButton.classList="col-9 btn-primary btn btn-secondary recent-search";
        historyButton.textContent=searchHistory[i];
        searchHistoryEl.append(historyButton);

    }
    $(".recent-search").on("click", function () {
        var text = $(this).text();
        renderWeathermon(text);
    });
}
var renderWeathermon = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&exclude=hourly,minutely&appid=" + apiKey;
    var forecastToday = document.querySelector("#forecast-today");
    searchHistory = loadSearchHistory();
    console.log(searchHistory);
    $("#search-history").empty();

    renderSearchHistory();

    $("#forecast-today-title").empty();
    $("#forecast-today").empty();
    $("#forecast-5day-title").empty();
    $("#forecast-5day").empty();

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //5 Day Forecast
                //Today's Weather: Get Lon + Lat and Save CityName
                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                var city = data.city.name;
                var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=6212c0f9ea8c0c883022423d57c46ad7";
                fetch(apiUrl2).then(function (response2) {
                    if (response2.ok) {
                        response2.json().then(function (data2) {

                            var titleEl = document.createElement("h2");
                            titleEl.classList = "card-header col-12";
                            titleEl.textContent = `${city} ${todaysDate}` ;
                            forecastToday.append(titleEl);
                            forecastToday.append(renderTodaysWeather(data2));
                            render5dayforecast(data2);
                            console.log(data2);
                            console.log(data);

                        });
                    } else {
                        alert("Error at onecall API");
                    }
                })
            })
        }
        else {
            alert("Error at lon lat API");
        }
    });
};
function renderApp() {
    searchHistory = loadSearchHistory();
    renderWeathermon(searchHistory[0]);
}
renderApp();

$("#submit").on("click", function () {
    var text = $("#city-search").val();
    if(text){
        searchHistory.push(text);
        saveSearchHistory();
        renderWeathermon(text);
    } 
});
