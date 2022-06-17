import { defineStore } from "pinia";
import getRecipes from "@/api/getRecipes";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    error: false,
  }),

  getters: {
    getFilteredRecipes: (state) => (filter) => {
      if (!filter) return state.recipes;
      return state.recipes.filter((recipe) =>
        recipe.name?.toLowerCase()?.includes(filter)
      );
    },
  },

  actions: {
    async fetchRecipes() {
      try {
        this.recipes = await getRecipes();
      } catch (e) {
        this.error = true;
      }
    },
  },
});
