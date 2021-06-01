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
var getWeather = function(city){
    var apiKey = "6212c0f9ea8c0c883022423d57c46ad7";
    var todaysDate = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_HUGE);
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=6&appid=6212c0f9ea8c0c883022423d57c46ad7";
  
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                renderWeathermon(data.list);
            })
        }
        else{
            alert("Error");
        }
    });
}
var renderTodaysWeather = function(data){

}
var renderWeatherCard = function(data){

}
var render5dayforecast = function(data){

}
var renderWeathermon = function(data){
    //Extract from Response:
        //Date
        //Temp
        //Wind
        //Humidity
    var day0 = data;
    console.log(day0); 
    var day1;
    var day2;
    var day3;
    var day4;
    var day5;


}

getWeather("jersey city");