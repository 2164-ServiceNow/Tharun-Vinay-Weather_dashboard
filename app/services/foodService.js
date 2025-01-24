angular.module('weatherApp')
  .service('foodService', function($http) {
    const SPOONACULAR_API_KEY = '6b3708324ee143c0b53accd3f1caa3b0' 
    const BASE_URL = 'https://api.spoonacular.com/recipes'


    this.getFoodSuggestions = function(cuisine, region) {
      const API_URL = `${BASE_URL}/complexSearch?query=${cuisine}&number=10&cuisine=${region}&apiKey=${SPOONACULAR_API_KEY}`
      return $http.get(API_URL)
    }

    this.getFoodRecipeDetails = function(id) {
        const API_URL = `${BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;
        return $http.get(API_URL)
    }
  })

