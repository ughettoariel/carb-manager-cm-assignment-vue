<template>
  <div class="tag-list">
    <div v-if="showPremiumTag" class="tag-item tag-item--premium">
      <img class="tag-icon" src="../assets/trophy.svg" />
      Premium
    </div>
    <div class="tag-item" v-for="tag in tags" :key="tag">
      {{ tag }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TagList",
  props: ["tags", "showPremiumTag"],
};
</script>

<style lang="scss" scoped>
.tag {
  &-list {
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 71px; // 8px margin + 55px image size + another 8px margin
    display: flex;
  }

  &-item {
    display: block;
    background: #ebeff4;
    color: #6f7379;
    padding: 4px 8px;
    margin-right: 6px;
    border-radius: 12px;
    line-height: 1.2;
    font-weight: 500;

    &--premium {
      display: flex;

      .tag-icon {
        width: 12px;
        margin-right: 6px;
      }
    }
  }
}
</style>
