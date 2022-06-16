<template>
  <div class="recipes">
    <div v-if="isLoading">loading ...</div>
    <div v-else-if="error">Unable to load recipes</div>
    <template v-else>
      <input
        placeholder="Search foods and servings&hellip;"
        class="search"
        type="text"
        @input="filterRecipes($event.target.value)"
      />
      <div v-if="recipesList.length">
        <div
          v-for="(recipe, index) in recipesList"
          :key="recipe.id"
          class="recipes-list"
        >
          <RecipeCard
            :user="user"
            :recipe="recipe"
            :show-nutrient-name="index == 0"
          />
        </div>
      </div>
      <p v-else-if="!isLoading">No matching recipes</p>
    </template>
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";
import getRecipes from "@/api/getRecipes";
import getUser from "@/api/getUser";

export default {
  components: {
    RecipeCard,
  },

  data: () => ({
    isLoading: false,
    isFiltered: false,
    recipes: [],
    filteredRecipes: [],
    user: {},
    error: false,
  }),

  async created() {
    try {
      this.isLoading = true;
      this.recipes = await getRecipes();
      this.user = await getUser();
    } catch (e) {
      this.error = true;
    }
    this.isLoading = false;
  },

  computed: {
    recipesList() {
      return this.isFiltered ? this.filteredRecipes : this.recipes;
    },
  },

  methods: {
    filterRecipes(value) {
      this.isFiltered = value.trim() !== "";

      this.filteredRecipes = this.recipes.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
    },

    goToSingleRecipe(id) {
      this.$router.push({
        name: "recipe",
        params: { id },
      });
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

.search {
  border: 1px solid #ebebeb;
  padding: 16px 12px;
  border-radius: 30px;
  display: block;
  margin-bottom: 12px;
  width: 100%;
  transition: all 0.15s ease-out;
  font-size: 16px;
  color: #282c37;

  &:focus {
    outline: none;
    border: 1px solid #1bc98e;
  }
}
</style>
