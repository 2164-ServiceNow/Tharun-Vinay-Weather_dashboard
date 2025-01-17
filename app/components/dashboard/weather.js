angular.module('weather', [])

.component('weatherComponent', {
    templateUrl: 'app/components/dashboard/weather.html',
    controller: function SearchWeatherCtrl($scope, weatherService) {
        $scope.cityName = ''
        $scope.weatherData = null
        $scope.errorMessage = null

        console.log("About to enter into WeatherAPI...")
        
        // getWeather() function while searching for weather data by city name
        $scope.getWeather = function() {
            console.log("Fetching weather data from WeatherAPI...")
            if (!$scope.cityName) {
                $scope.errorMessage = "Please enter a city name"
                $scope.weatherData = null
                return
            }

            weatherService.getWeatherByCity($scope.cityName)
                .then(function(response) {
                    $scope.errorMessage = null
                    $scope.weatherData = response.data
                })
                .catch(function() {
                    console.log("Error occurred while fetching weather data")
                    $scope.errorMessage = "Error fetching weather data. Please check the city name and try again."
                    $scope.weatherData = null
                })
        }
    }
})
