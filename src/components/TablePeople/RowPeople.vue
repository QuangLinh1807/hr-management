<template>
  <tr>
    <td class="data-people px-3">
      <label class="label-chk" :for="user.userId">
        <input
          type="checkbox"
          class="form-checkbox focus:outline-none focus:shadow-outline"
          :value="user.userId"
          :id="user.userId"
          @input="onChange"
          @click="selectItem"
        />
      </label>
    </td>
    <!--    <td class="data-people">-->
    <!--      <span class="text-people">{{ user.userId }}</span>-->
    <!--    </td>-->
    <td class="data-people">
      <span class="text-people">{{ user.fullName }}</span>
    </td>
    <td class="data-people">
      <span class="text-people">{{ user.position }}</span>
    </td>
    <td class="data-people">
      <span class="text-people">{{ user.team }}</span>
    </td>
    <td class="data-people">
      <span class="text-people">{{ user.mainSkill }}</span>
    </td>
    <!--    <td class="data-people">-->
    <!--      <circle-icon size="2x" class="custom-class bg-green"></circle-icon>-->
    <!--      <span :class="listStatus[user.status].class">{{ user.status }}</span>-->
    <!--    </td>-->
  </tr>
</template>

<script>
export default {
  props: ["user", "value", "selectItem"],
  data() {
    return {
      listStatus: {
        Active: {
          class: "status-active",
        },
        Pending: {
          class: "status-pending",
        },
      },
    };
  },
  methods: {
    onChange(e) {
      let currentValue = [...this.value];
      if (e.target.checked) {
        currentValue.push(e.target.value);
      } else {
        let index = currentValue.findIndex((item) => item === e.target.value);
        currentValue.splice(index, 1);
      }
      this.$emit("input", currentValue);
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

.people-select {
  @apply py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100;
}

.people-header {
  @apply bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs;
}

.label-chk {
  @apply text-green-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer;
}

.data-people {
  @apply border-dashed border-t border-gray-200;
}

.text-people {
  @apply text-gray-700 px-6 py-3 flex items-center;
}

.status-pending {
  @apply bg-red-600 py-2 px-3 opacity-60 text-white flex justify-center items-center w-1/2 rounded-md border-red-600;
}

.status-active {
  @apply bg-green-600 py-2 px-3 opacity-60 text-white flex justify-center items-center w-1/2 rounded-md border-green-600;
}
</style>
