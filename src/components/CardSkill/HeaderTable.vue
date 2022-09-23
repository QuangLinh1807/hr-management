<template>
  <div class="title-table">
    <div class="header-item" v-for="item in groupTitle" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupTitle: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.title-table {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.5rem;
  border-color: #dcdcdc;
  @apply py-3 text-center border-b ;
}

.header-item {
  font-weight: 600;
}

.header-item:not(:first-of-type) {
  @apply border-l ;
  border-color: #dcdcdc;
}
</style>
