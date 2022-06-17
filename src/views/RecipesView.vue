<template>
  <div class="recipes">
    <div v-if="loading">loading ...</div>
    <div v-else-if="hasError()">Unable to load recipes</div>
    <template v-else>
      <input
        placeholder="Search foods and servings&hellip;"
        class="search"
        type="text"
        @input="handleFilterRecipes($event.target.value)"
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
      <p v-else-if="!loading">No matching recipes</p>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRecipesStore } from "@/stores/recipes";
import { useUserStore } from "@/stores/user";
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  components: {
    RecipeCard,
  },

  data: () => ({
    recipesList: [],
    loading: false,
    error: false,
  }),

  async created() {
    try {
      this.loading = true;
      await Promise.all([this.fetchUser(), this.fetchRecipes()]);
      this.recipesList = this.getFilteredRecipes();
    } catch (e) {
      this.error = true;
    }
    this.loading = false;
  },

  computed: {
    ...mapState(useUserStore, {
      user: "user",
      userError: "error",
    }),
    ...mapState(useRecipesStore, {
      getFilteredRecipes: "getFilteredRecipes",
      recipesError: "error",
    }),
  },

  methods: {
    ...mapActions(useUserStore, ["fetchUser"]),
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
