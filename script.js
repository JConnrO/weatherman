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

//Functions
//renderWeatherCard
//renderTodaysWeather
//renderRecentSearch
//renderWeathermon

//getWeather
    //input: today's date / no input
    //getToday
    //get5days
var displayData = {};

var apiKey = "6212c0f9ea8c0c883022423d57c46ad7";

var kToF = function(kelvin){
    var fahrenheit = (kelvin - 273.15) * (9/5) + 32;
    return Math.floor(fahrenheit);
}
var renderTodaysWeather = function(data){
    var current = data.current;
    var uvi = current.uvi;
    var humidity = current.humidity;
    var temp = kToF(current.temp);

    //console.log(current);
    //console.log("Today UVI: " + uvi);
    //console.log("Today Humidity: " + humidity);
    //console.log("Today Temp "+ temp);
}
var renderWeatherCard = function(data){
    var date = data.dt_txt;
    var dateRefined = date.split(" ")[0].split("-")[1] + "/" + date.split(" ")[0].split("-")[2] + "/" +date.split(" ")[0].split("-")[0];
    
    var temp = kToF(data.main.temp);
    var humidity = data.main.humidity;
    var wind = data.wind.speed;

    var weatherCardEl = document.createElement("div");
    weatherCardEl.classList = "card col";
    var titleEl = document.createElement("h3");
    titleEl.classList="card-header text-uppercase";
    titleEl.textContent=dateRefined;
    
    var dataDiv = document.createElement("div");
    dataDiv.classList="card-body";

    var tempEl = document.createElement("div");
    tempEl.classList="row";
    tempEl.textContent="Temp: " +temp+"F";

    var windEl = document.createElement("div");
    windEl.classList="row";
    windEl.textContent="Wind: " + wind +" MPH";

    var humidityEl = document.createElement("div");
    humidityEl.classList="row";
    humidityEl.textContent="Humidity: "+ humidity +"%";

    dataDiv.append(tempEl);
    dataDiv.append(humidityEl);
    dataDiv.append(windEl);
    weatherCardEl.append(titleEl);
    weatherCardEl.append(dataDiv);

    return weatherCardEl;

}
var render5dayforecast = function(data){
    
    var forecast5day = document.querySelector("#forecast-5day");
    forecast5day.append(renderWeatherCard(data.list[1]));
    forecast5day.append(renderWeatherCard(data.list[2]));
    forecast5day.append(renderWeatherCard(data.list[3]));
    forecast5day.append(renderWeatherCard(data.list[4]));
    forecast5day.append(renderWeatherCard(data.list[5]));
        

}
var renderWeathermon = function(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=6&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                //5 Day Forecast
                render5dayforecast(data);
                //Today's Weather: Get Lon + Lat and Save CityName
                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                var city = data.city.name;
                var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily&appid=6212c0f9ea8c0c883022423d57c46ad7";
                fetch(apiUrl2).then(function(response2){
                    if(response2.ok){
                        response2.json().then(function(data2){
                            renderTodaysWeather(data2);
                        });
                    }else{
                        alert("Error at onecall API");
                    }
                })
            })
        }
        else{
            alert("Error at lon lat API");
        }
    });

}
renderWeathermon("jersey city");
