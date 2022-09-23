<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        <chevrons-left-icon
          size="1.5x"
          class="custom-class"
        ></chevrons-left-icon>
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        <chevron-left-icon size="1.5x" class="custom-class"></chevron-left-icon>
      </button>
    </li>

    <li v-for="(page, index) in pages" class="pagination-item" :key="index">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        <chevron-right-icon
          size="1.5x"
          class="custom-class"
        ></chevron-right-icon>
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        <chevrons-right-icon
          size="1.5x"
          class="custom-class"
        ></chevrons-right-icon>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (
        this.currentPage === this.totalPages &&
        this.totalPages > this.maxVisibleButtons
      ) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    },
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
  },
};
</script>

<style>
.pagination {
  @apply list-none;
}

.pagination-item:not(:last-child) {
  margin-right: 0.55rem;
  @apply inline-block;
}

.pagination-item button {
  @apply px-3 py-2 rounded text-black;
}

.pagination-item button:focus {
  @apply outline-none border-none;
}

.active {
  @apply bg-gray-400 text-black;
}

button:disabled {
  cursor: not-allowed;
}
</style>
