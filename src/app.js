
var app = angular.module("fiveDayWeather", [])
.controller("apiController", function($scope, $http){
    $scope.view = {};
    $http.get("http://api.openweathermap.org/data/2.5/forecast?q=miami,3166-2:US&appid=8982a42a6477a74e077b12cf8fcc5a06").then(function(data){
        $scope.view.apiData = data;
        var rawData = data.data.list;
        var forecast = [];
        // var sevenDayData = [];
        for (var i=0; i<rawData.length; i++){
      //console.log(rawData[i]);

            var date = rawData[i].dt_txt.substring(0, 10);
            // if(sevenDayData[sevenDayData.length -1] === date){
            //
            // }

            var obj = {};
            var time = rawData[i].dt_txt.substring(11, 13);
            var description = rawData[i].weather[0].description;
            var descriptionIcon = rawData[i].weather[0].icon;
            var windDegree = rawData[i].wind.deg;
            var windSpeed = rawData[i].wind.speed;
            var temp = kelvinToFar(rawData[i].main.temp);
            var precipitation = isNaN(mmRaintoInches(rawData[i].rain["3h"])) ? 0 :  mmRaintoInches(rawData[i].rain["3h"]).toFixed(2);

            obj.date = date;
            obj.description = description;
            obj.time = time;
            obj.icon = descriptionIcon;
            obj.wind = {degree: windDegree, speed: windSpeed,};
            obj.temp = temp;
            obj.precipitation = precipitation > 0.009 ? precipitation : 0;

            forecast.push(obj);
            //console.log(forecast[i].precipitation);
        }
          //console.log("this forecast: ", forecast);
    });
});

function kelvinToFar(kelvin){
    return (((9/5)*(kelvin - 273.15) + 32).toFixed(0));
}

function mmRaintoInches(mm){
    return mm / 25.4;
}

exports._test = {
  kelvinToFar : kelvinToFar,
  mmRaintoInches : mmRaintoInches
}
