import { defineStore } from "pinia";
import getRecipes from "@/api/getRecipes";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    error: false,
  }),

  getters: {
    getFilteredRecipes: (state) => (filter) => {
      const filterString = filter?.toLowerCase()?.trim();
      if (!filterString) return state.recipes;
      return state.recipes.filter((recipe) =>
        recipe.name?.toLowerCase()?.includes(filterString)
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
