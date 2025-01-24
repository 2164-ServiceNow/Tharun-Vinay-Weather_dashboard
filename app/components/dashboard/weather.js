angular.module('weather', [])

.component('weatherComponent', {
    templateUrl: 'app/components/dashboard/weather.html',
    controller: function SearchWeatherCtrl($scope, weatherService, sharedWeatherService) {
        $scope.cityName = '';
        $scope.weatherData = null;
        $scope.hourlyForecast = null;
        $scope.weeklyForecast = null;
        $scope.errorMessage = null;

        // Date formatting for current date
        $scope.currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Function to get weather data by city name and forecast type (hourly/weekly)
        $scope.getWeather = function(forecastType) {
            console.log("Fetching weather data from WeatherAPI...");

            if (!$scope.cityName) {
                $scope.errorMessage = "Please enter a city name.";
                $scope.weatherData = null;
                return;
            }

            weatherService.getWeatherByCity($scope.cityName, forecastType)
                .then(function(response) {
                    $scope.errorMessage = null; // Clear any previous errors
                    $scope.weatherData = response.data;
                    sharedWeatherService.setWeatherData(response.data) // storing the weather data in the shared weather service
                    
                    if (forecastType === 'hourly') {
                        // Get current hour
                        const currentHour = new Date().getHours();

                        // Filter hourly forecast data to show remaining hours of the day
                        $scope.hourlyForecast = response.data.forecast.forecastday[0].hour.filter(function(hourData) {
                            const hour = new Date(hourData.time).getHours();
                            return hour >= currentHour && hour < currentHour + 6; // Only show hours from now until midnight
                        });

                        // Clear weekly forecast when switching to hourly
                        $scope.weeklyForecast = null;
                    } else if (forecastType === 'weekly') {
                        // Weekly forecast (7-day forecast)
                        $scope.weeklyForecast = response.data.forecast.forecastday;

                        // Clear hourly forecast when switching to weekly
                        $scope.hourlyForecast = null;
                    } else {
                        // If no forecastType is specified, reset all forecasts
                        $scope.hourlyForecast = null;
                        $scope.weeklyForecast = null;
                    }
                })
                .catch(function() {
                    console.log("Error occurred while fetching weather data");
                    $scope.errorMessage = "Error fetching weather data. Please check the city name and try again.";
                    $scope.weatherData = null;
                    $scope.hourlyForecast = null; // Clear hourly forecast in case of an error
                    $scope.weeklyForecast = null; // Clear weekly forecast in case of an error
                });
        }
    }
});
