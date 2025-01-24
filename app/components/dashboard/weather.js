angular.module('weather', [])

.component('weatherComponent', {
    templateUrl: 'app/components/dashboard/weather.html',
    controller: function SearchWeatherCtrl($scope, weatherService, sharedWeatherService) {
        $scope.cityName = ''
        $scope.weatherData = null
        $scope.forecastData = null
        $scope.errorMessage = null

        console.log("About to enter into WeatherAPI...")
        
        // getWeather() function while searching for weather data by city name
        $scope.getWeather = function() {
            console.log("Fetching weather data from WeatherAPI...")
            if (!$scope.cityName) {
                $scope.errorMessage = "Please enter a city name"
                $scope.weatherData = null
                $scope.forecastData = null
                return
            }

            weatherService.getWeatherByCity($scope.cityName)
                .then(function(response) {
                    $scope.errorMessage = null
                    $scope.weatherData = response.data
                    $scope.forecastData = response.data.forecast.forecastday
                    sharedWeatherService.setWeatherData(response.data) // storing the weather data in the shared weather service
                })
                .catch(function() {
                    console.log("Error occurred while fetching weather data")
                    $scope.errorMessage = "Error fetching weather data. Please check the city name and try again."
                    $scope.weatherData = null
                    $scope.forecastData = null
                })
        }
    }
})
