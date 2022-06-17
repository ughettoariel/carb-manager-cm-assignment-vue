<template>
  <div class="recipe-item" @click="() => haldleCardClick(recipe.id)">
    <div class="recipe-name">{{ recipe.name }}</div>
    <img class="recipe-image" :src="recipe.image" />
    <div class="recipe-nutrients">
      <template
        v-for="({ value, unit }, nutrientName) in recipe.nutrients"
        :key="nutrientName"
      >
        <NutrientItem
          v-if="nutrientName === 'carbs'"
          :name="showName('Carbs')"
          :value="value + 'g'"
          class="nutrient-item--carbs"
        />
        <NutrientItem
          v-if="nutrientName === 'proteins'"
          :name="showName('Protein')"
          :value="value + 'g'"
          class="nutrient-item--protein"
        />
        <NutrientItem
          v-if="nutrientName === 'fats'"
          :name="showName('Fat')"
          :value="value + 'g'"
          class="nutrient-item--fat"
        />
        <NutrientItem
          v-if="nutrientName === 'energy'"
          :name="showName(getEnergy(unit, value).label)"
          :value="round(getEnergy(unit, value).value)"
          class="nutrient-item--energy"
        />
      </template>
    </div>

    <Tags :show-premium-tag="recipe.isPremium" :tags="recipe.tags" />
  </div>
</template>

<script>
import NutrientItem from "@/components/NutrientItem.vue";
import Tags from "@/components/Tags.vue";
export default {
  name: "RecipeCard",

  components: {
    NutrientItem,
    Tags,
  },

  props: ["recipe", "showNutrientName"],

  computed: mapState(useUserStore, ["user"]),

  methods: {
    haldleCardClick(id) {
      this.$router.push({
        name: "recipe",
        params: { id },
      });
    },

    showName(name) {
      return this.showNutrientName ? name : null;
    },

    getEnergy(recipeUnit, value) {
      let energy = { label: "", value };

      if (recipeUnit !== this.user.units.energy) {
        if (recipeUnit === "kilojoule") {
          energy.label = "kCal";
          energy.value = value / 4.184;
        } else {
          energy.label = "kJ";
          energy.value = value * 4.184;
        }
      } else {
        if (recipeUnit === "kilojoule") {
          energy.label = "kJ";
        } else {
          energy.label = "kCal";
        }
      }

      return energy;
    },

    round(num, decimalPlaces = 2) {
      const p = Math.pow(10, decimalPlaces);
      return Math.round(num * p) / p;
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe {
  &-item {
    position: relative;
    color: #282c37;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 6px;
  }

  &-name {
    position: absolute;
    top: 8px;
    left: 71px; // 8px margin + 55px image size + another 8px margin
    font-weight: 500;
  }

  &-image {
    position: relative;
    display: block;
    width: 55px;
    height: 55px;
    top: 8px;
    margin-left: 8px;
    border-radius: 4px;
  }

  &-nutrients {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;

    > * {
      margin: 0 8px;
    }
  }
}
</style>