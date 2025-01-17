angular.module('weatherApp')
.service('weatherService', function($http) {
    this.getWeatherByCity = function(cityName) {
        const apiKey = '360c3d0c5d784295be5112923251701' // Declaring the API key
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no` // URL to get weather data 

        console.log('Requesting weather data for:', cityName)
        return $http.get(apiUrl)
    }
})