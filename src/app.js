(function(){
    var app = angular.module("fiveDayWeather", [])
    .controller("apiController", function($scope, $http){
        $scope.view = {};
        $http.get("http://api.openweathermap.org/data/2.5/forecast?q=denver,3166-2:US&appid=8982a42a6477a74e077b12cf8fcc5a06").then(function(data){
            var rawData = data.data.list;
            var forecast = [];
            for (var i=0; i<rawData.length; i++){
                var conditionImage = "clear";
                var date = rawData[i].dt_txt.substring(0, 10);
                var time = rawData[i].dt_txt.substring(11, 13);
                var description = rawData[i].weather[0].description;
                var temp = kelvinToFar(rawData[i].main.temp);
                var icon = rawData[i].weather[0].icon;
                var windDegree = rawData[i].wind.deg;
                var windSpeed = rawData[i].wind.speed;
                var thisDayObj = {};
                var thisDayTime = {};


                // if the date of this iteration is new to forecast array, create a thisDayObj to represent a new day and thisDayTime to represent the first of the times in this day and its info.
                if(forecast.length === 0 || date !== forecast[forecast.length - 1].date){
                    thisDayObj.times = [];
                    var high = -100;
                    var low = 100;
                    if(rawData[i].rain){
                        var precipitation = isNaN(mmRaintoInches(rawData[i].rain["3h"])) ? 0 :  mmRaintoInches(rawData[i].rain["3h"]);
                        conditionImage = "rain";
                    } else if(rawData[i].snow && rawData[i].snow["3h"]){
                        precipitation = isNaN(mmRaintoInches(rawData[i].snow["3h"])) ? 0 :  mmRaintoInches(rawData[i].snow["3h"]);
                        conditionImage = "snow";
                    }
                    else {
                        conditionImage = "clear";
                    }
                    if(high === undefined || high < temp){
                        high = temp;
                    }
                    if(low === undefined || low > temp){
                        low = temp;
                    }
                    thisDayObj.date = date;
                    thisDayTime.time = time;
                    thisDayTime.description = description;
                    thisDayTime.icon = icon;
                    thisDayTime.wind = {degree: windDegree, speed: windSpeed,};
                    thisDayTime.temp = temp;
                    thisDayTime.precipitation = precipitation === undefined ? 0 : precipitation;
                    thisDayObj.times.push(thisDayTime);
                    if(conditionImage){thisDayObj.conditionImage = conditionImage;}
                    forecast.push(thisDayObj);
                // if the date of this iteration already exists in forecast array, add thisTimeObj to thisDayObj.times array to represent a new time in the already existing day.
                } else if(rawData[i].dt_txt.substring(0, 10) === forecast[forecast.length - 1].date) {
                    if(rawData[i].rain){
                        precipitation = isNaN(mmRaintoInches(rawData[i].rain["3h"])) ? 0 :  mmRaintoInches(rawData[i].rain["3h"]);
                    }
                    else if(rawData[i].snow && rawData[i].snow["3h"]){
                        precipitation = isNaN(mmRaintoInches(rawData[i].snow["3h"])) ? 0 :  mmRaintoInches(rawData[i].snow["3h"]);
                    }
                    if(high < temp){
                        high = temp;
                    } else if(low > temp){
                        low = temp;
                    }
                    thisDayTime.time = time;
                    thisDayTime.icon = icon;
                    thisDayTime.description = description;
                    thisDayTime.wind = {degree: windDegree, speed: windSpeed,};
                    thisDayTime.temp = temp;
                    thisDayTime.precipitation = precipitation === undefined ? 0 : precipitation;
                    thisDayTime.high = high;
                    thisDayTime.low = low;

                    forecast[forecast.length - 1].times.push(thisDayTime);
                    $scope.view.forecast = forecast;
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
        return Number((mm / 25.4).toFixed(2));
    }
})();
