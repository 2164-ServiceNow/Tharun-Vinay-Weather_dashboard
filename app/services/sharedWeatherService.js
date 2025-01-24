angular.module('weatherApp')
.service('sharedWeatherService', function(){
    let weatherData = null // declaring this variable to store the data

    this.setWeatherData = function(data) {
        weatherData = data
    }
    
    this.getWeatherData = function(){
        return weatherData
    }
})