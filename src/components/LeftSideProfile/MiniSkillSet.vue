<template>
  <div class="item-skill" :class="{ 'h-8': isHeight }">
    <img :src="item.image" />
    {{ item.name }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    isHeight: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.item-skill {
  img {
    width: 1rem;
    margin-right: 0.7rem;
  }
  cursor: pointer;
  transition: all 0.2s;
  @apply flex items-center px-4 font-medium;
}
.item-skill:hover {
  transition: all 0.5s;
  @apply bg-gray-300 rounded-lg;
}
</style>
