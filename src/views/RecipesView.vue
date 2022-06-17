<template>
  <div class="recipes">
    <div v-if="loading">loading ...</div>
    <div v-else-if="hasError()">Unable to load recipes</div>
    <template v-else>
      <SearchInput
        placeholder="Search foods and servings&hellip;"
        :on-search="handleFilterRecipes"
        case-sensitive
      />
      <div v-if="recipesList.length">
        <div
          v-for="(recipe, index) in recipesList"
          :key="recipe.id"
          class="recipes-list"
        >
          <RecipeCard :recipe="recipe" :show-nutrient-name="index == 0" />
        </div>
      </div>
      <p v-else-if="!loading">No matching recipes</p>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRecipesStore } from "@/stores/recipes";
import RecipeCard from "@/components/RecipeCard.vue";
import SearchInput from "@/components/SearchInput.vue";

export default {
  components: {
    RecipeCard,
    SearchInput,
  },

  data: () => ({
    recipesList: [],
    loading: false,
    error: false,
  }),

  async created() {
    try {
      this.loading = true;
      if (!this.recipes.length) await this.fetchRecipes();
      this.recipesList = this.recipes;
    } catch (e) {
      this.error = true;
    }
    this.loading = false;
  },

  computed: {
    ...mapState(useRecipesStore, {
      recipes: "recipes",
      getFilteredRecipes: "getFilteredRecipes",
      recipesError: "error",
    }),
  },

  methods: {
    ...mapActions(useRecipesStore, ["fetchRecipes"]),

    hasError() {
      return this.error || this.userError || this.recipesError;
    },

    handleFilterRecipes(value) {
      this.recipesList = this.getFilteredRecipes(value);
    },
  },
};
</script>

<style lang="scss">
.recipes {
  &-list {
    background: #fafbfc;
  }
}
</style>
