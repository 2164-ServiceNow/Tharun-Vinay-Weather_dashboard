angular.module('food', [])
  .component('foodComponent', {
    templateUrl: 'app/components/foodRecommendations/food.html',
    controller: function($scope, foodService, sharedWeatherService) {
      $scope.foodSuggestions = []
      $scope.errorMessage = null

      console.log("Fetching food recommendations based on weather data...")

      // Fetch food suggestions based on weather data from sharedWeatherService
      $scope.getFoodSuggestions = function() {
        const weatherData = sharedWeatherService.getWeatherData()

        if (!weatherData) {
          $scope.errorMessage = "No weather data available. Please fetch weather data first."
          return
        }

        const condition = weatherData.current.condition.text.toLowerCase() // Weather description
        const region = $scope.selectedRegion || 'global' // Region selected by the user, default to 'global'

        let cuisine = "any" // Default cuisine if no match is found

        // Map weather conditions to cuisines
        const weatherToCuisine = {
          clear: "salad",
          cloudy: "soup",
          rainy: "comfort food",
          snowy: "hot drinks",
          mist: "warm meals",
          sunny: "grilled food",
          windy: "sandwiches",
          stormy: "spicy food",
          fog: "hot drinks",
          overcast: "casserole",
        }

        // Match condition to cuisine
        for (let key in weatherToCuisine) {
          if (condition.includes(key)) {
            cuisine = weatherToCuisine[key]
            break
          }
        }

        // Call foodService to fetch recipes
        foodService.getFoodSuggestions(cuisine, region)
          .then(function(response) {
            $scope.errorMessage = null;
            const foodResults = response.data.results
            $scope.foodSuggestions = foodResults.slice(0, 5)

            // Fetch recipe details for each food to get the recipe URL
            $scope.foodSuggestions.forEach(food => {
              foodService.getFoodRecipeDetails(food.id)
                .then(function(response) {
                  food.recipeUrl = response.data.sourceUrl // Attach the recipe URL to the food object
                })
                .catch(function() {
                  console.error(`Error fetching recipe details for food ID: ${food.id}`)
                  food.recipeUrl = null
                });
            });

          })
          .catch(function() {
            console.error("Error occurred while fetching food suggestions")
            $scope.errorMessage = "Error fetching food suggestions. Please try again later."
            $scope.foodSuggestions = []
          })
      }
    }
  })
