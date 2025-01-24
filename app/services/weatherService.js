angular.module('weatherApp')
.service('weatherService', function($http) {
    this.getWeatherByCity = function(cityName, forecastType) {
        const apiKey = '360c3d0c5d784295be5112923251701'; 
        let apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&aqi=no`;

        // Modify the URL based on the selected forecast type
        if (forecastType === 'hourly') {
            const currentHour = new Date().getHours();
            const endHour = (currentHour + 6) % 24;
            apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&hours=6&aqi=no`; // Fetch hourly forecast
        } else if (forecastType === 'weekly') {
            apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=6&aqi=no`; // Fetch weekly forecast
        }

        console.log('Requesting weather data for:', cityName, 'with forecast type:', forecastType);
        return $http.get(apiUrl);
    }
})
