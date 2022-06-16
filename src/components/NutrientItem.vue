<template>
  <div class="nutrient-item">
    <div v-if="name" class="nutrient-name">{{ name }}</div>
    <span class="nutrient-value"> {{ value }} </span>
  </div>
</template>

<script>
export default {
  name: "NutrientItem",
  props: ["name", "value"],
};
</script>

<style lang="scss" scoped>
.nutrient {
  &-item {
    text-align: right;
    min-width: 65px;
    font-weight: 500;
    color: #6f7379;

    &--carbs .nutrient-name {
      color: #eb5350;
    }

    &--fat .nutrient-name {
      color: #ec9e31;
    }

    &--protein .nutrient-name {
      color: #3b77b1;
    }

    &--energy .nutrient-name {
      color: #282c37;
    }
  }

  &-value {
    font-size: 16px;
  }
}
</style>
