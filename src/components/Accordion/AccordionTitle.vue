<template>
  <div class="box-section" @click="toggleAccordion">
    <div class="section-title">
      {{ name }}
    </div>
    <component :is="arrow" :class="transitionClass"></component>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    toggleAccordion: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      arrow: "ChevronUpIcon",
    };
  },
  computed: {
    transitionClass() {
      return [this.status ? "arrow-active" : "", "transition-all duration-500"];
    },
  },
};
</script>

<style lang="scss" scoped>
.box-section {
  @apply h-14 px-4 rounded-lg w-full flex justify-between items-center cursor-pointer bg-gray-100 transition-all duration-500;
}
.box-section:hover {
  @apply bg-gray-500 bg-opacity-30 transition-all duration-500;
}

.section-title {
  @apply text-lg font-semibold;
}
.arrow-active {
  @apply transition-all duration-500 rotate-180;
}
</style>
