angular.module('weatherApp')
  .service('foodService', function($http) {
    const SPOONACULAR_API_KEY = 'b46490c8856141f29299ec10905088cd' // Replace with your Spoonacular API key
    const BASE_URL = 'https://api.spoonacular.com/recipes'

    // Function to get recipes based on cuisine and region
    this.getFoodSuggestions = function(cuisine, region) {
      const API_URL = `${BASE_URL}/complexSearch?query=${cuisine}&number=10&cuisine=${region}&apiKey=${SPOONACULAR_API_KEY}`
      return $http.get(API_URL)
    }

    this.getFoodRecipeDetails = function(id) {
        const API_URL = `${BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;
        return $http.get(API_URL)
    }
  })

