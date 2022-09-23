<template>
  <thead>
    <tr class="text-left">
      <th class="people-select">
        <label class="label-chk">
          <input
            type="checkbox"
            class="form-checkbox focus:outline-none focus:shadow-outline"
            v-model="checked"
            @click="selectAll"
          />
        </label>
      </th>
      <th
        class="people-header"
        v-for="heading in headings"
        :key="heading.key"
        :class="{ [heading.key]: true }"
      >
        {{ heading.value }}
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
    selectAll: {
      type: Function,
    },
  },
  data() {
    return {
      headings: [
        // {
        //   key: "userId",
        //   value: "User ID",
        // },
        {
          key: "fullname",
          value: "FullName",
        },
        {
          key: "positionName",
          value: "Position",
        },
        // {
        //   key: "positionName",
        //   value: "Team",
        // },
        {
          key: "mainSkills",
          value: "Main Skill",
        },
        // {
        //   key: "status",
        //   value: "Status",
        // },
      ],
      checked: false,
    };
  },
  watch: {
    checked(val) {
      this.$emit("input", val);
    },
    value: {
      handler: function (val) {
        this.checked = val;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

.form-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  color: currentColor;
  background-color: #fff;
  border-color: #999ea5;
  border-width: 1px;
  border-radius: 0.25rem;
  height: 1.2em;
  width: 1.2em;
}

.form-checkbox:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.table-people {
  @apply border-collapse table-auto w-full whitespace-nowrap bg-white relative;
}

table th:first-child {
  border-radius: 0.5rem 0 0 0;
}

table th:last-child {
  border-radius: 0 0.5rem 0 0;
}
.people-select {
  @apply py-2 px-3 top-0 border-b border-gray-200 bg-gray-400;
}

.people-header {
  @apply bg-gray-400   top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs;
}

.label-chk {
  @apply text-green-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer;
}
</style>
