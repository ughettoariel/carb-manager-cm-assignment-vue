<template>
  <input
    class="search"
    type="text"
    :placeholder="placeholder"
    @input="handleSearch($event.target.value)"
  />
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    placeholder: {
      type: String,
      default: "Search",
    },
    caseSensitive: {
      type: String,
      default: false,
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    handleSearch(value) {
      const cleanValue = this.caseSensitive ? value : value.toLowerCase();
      this.onSearch(cleanValue.trim());
    },
  },
};
</script>

<style lang="scss" scoped>
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
