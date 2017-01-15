
var app = angular.module("fiveDayWeather", [])
.controller("apiController", function($scope, $http){
    $scope.view = {};
    $http.get("http://api.openweathermap.org/data/2.5/forecast?q=denver,3166-2:US&appid=8982a42a6477a74e077b12cf8fcc5a06").then(function(data){
        $scope.view.apiData = data;
        var rawData = data.data.list;
        var forecast = [];
        for (var i=0; i<rawData.length; i++){
            //console.log(rawData[i]);
            var date = rawData[i].dt_txt.substring(0, 10);
            var time = rawData[i].dt_txt.substring(11, 13);
            var description = rawData[i].weather[0].description;
            var temp = kelvinToFar(rawData[i].main.temp);
            var icon = rawData[i].weather[0].icon;
            var windDegree = rawData[i].wind.deg;
            var windSpeed = rawData[i].wind.speed;
            var thisDayObj = {};
            var thisDayTime = {};

            if(forecast.length === 0 || rawData[i].dt_txt.substring(0, 10) !== forecast[forecast.length - 1].date){

                thisDayObj.times = [];
                console.log("this be rain rite now", rawData[i].rain);
                if(rawData[i].rain){
                    console.log(mmRaintoInches(rawData[i].rain["3h"]));
                    var precipitation = isNaN(mmRaintoInches(rawData[i].rain["3h"])) ? 0 :  mmRaintoInches(rawData[i].rain["3h"]);
                };

                thisDayObj.date = date;
                thisDayTime.time = time;
                thisDayTime.description = description;
                thisDayTime.icon = icon;
                thisDayTime.wind = {degree: windDegree, speed: windSpeed,};
                thisDayTime.temp = temp;
                thisDayTime.precipitation = precipitation === undefined ? 0 : precipitation;
                thisDayObj.times.push(thisDayTime);

                forecast.push(thisDayObj);

            } else if(rawData[i].dt_txt.substring(0, 10) === forecast[forecast.length - 1].date) {
                // var thisDayTime = {};
                // var time = rawData[i].dt_txt.substring(11, 13);

                if(rawData[i].rain){
                    console.log(mmRaintoInches(rawData[i].rain["3h"]));
                    var precipitation = isNaN(mmRaintoInches(rawData[i].rain["3h"])) ? 0 :  mmRaintoInches(rawData[i].rain["3h"]);
                }
                if(rawData[i].snow){
                    console.log(mmRaintoInches(rawData[i].snow["3h"]));
                    var precipitation = isNaN(mmRaintoInches(rawData[i].snow["3h"])) ? 0 :  mmRaintoInches(rawData[i].snow["3h"]);
                }

                thisDayTime.time = time;
                thisDayTime.icon = icon;
                thisDayTime.description = description;
                thisDayTime.wind = {degree: windDegree, speed: windSpeed,};
                thisDayTime.temp = temp;
                thisDayTime.precipitation = precipitation === undefined ? 0 : precipitation;

                forecast[forecast.length - 1].times.push(thisDayTime);
            }
        }
        console.log("this forecast: ", forecast);
    });
});

function kelvinToFar(kelvin){
    if(isNaN(kelvin)){
        return "Error: kelvin units passed in must be number type";
    }
    return (((9/5)*(kelvin - 273.15) + 32).toFixed(0));
}

function mmRaintoInches(mm){
    if(mm < 0){ return "Can't accept negative millimeters of rain";}
    if(isNaN(mm)){ return "Must input a number for millimeters of rain";}
    return Number((mm / 25.4).toFixed(4));
}
