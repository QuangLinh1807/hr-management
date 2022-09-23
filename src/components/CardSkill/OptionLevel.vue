<template>
  <li @click="selectedLevel(level)">
    <span class="level" :class="levelData.classLevel">{{
      levelData.label
    }}</span>
  </li>
</template>

<script>
export default {
  props: {
    levelData: {
      type: Object,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    selectedLevel: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.level {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary-color);
  background-color: rgba($color: red, $alpha: 0.2);
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  z-index: 9999;
  @apply font-bold p-1;
}

li {
  padding: 0.65rem;
  box-shadow: 0 1px 12px #2e2e2e;
  @apply shadow-2xl cursor-pointer rounded-sm bg-gray-200;
}

li:hover {
  @apply bg-gray-200;
}

.type-s {
  --primary-color: #0079c4;
  background-color: rgba($color: #0079c4, $alpha: 0.2);
}
.type-a {
  --primary-color: #812991;
  background-color: rgba($color: #812991, $alpha: 0.2);
}
.type-b {
  --primary-color: #45d1d1;
  background-color: rgba($color: #45d1d1, $alpha: 0.2);
}
.type-c {
  --primary-color: #f9826c;
  background-color: rgba($color: #f9826c, $alpha: 0.2);
}
.type-d {
  --primary-color: #003993;
  background-color: rgba($color: #003993, $alpha: 0.2);
}
.type-null {
  --primary-color: #099b1c;
  background-color: rgba($color: #099b1c, $alpha: 0.2);
}
</style>
