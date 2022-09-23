<template>
  <div class="tab-section mb-1">
    <AccordionTitle
      :name="category.name"
      :toggleAccordion="toggle"
      :status="category.status"
    ></AccordionTitle>
    <transition name="fade">
      <ContentSkill
        :listSubCategory="category.listSubCategories"
        v-if="category.status"
        @update-skillset="$emit('update-skillset', $event)"
      ></ContentSkill>
    </transition>
  </div>
</template>
<script>
import ContentSkill from "./ContentSkill.vue";
import AccordionTitle from "./AccordionTitle.vue";
export default {
  components: {
    ContentSkill,
    AccordionTitle,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggle() {
      this.category.status = !this.category.status;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s, opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  @apply h-0 opacity-0;
}
.tab-section {
  @apply w-full rounded-lg bg-white;
}
</style>
