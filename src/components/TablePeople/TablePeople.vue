<template>
  <div>
    <table class="table-people">
      <HeaderPeople :selectAll="selectAll" v-model="selectedAll"></HeaderPeople>
      <tbody>
        <tr v-for="user in employeeData" :key="user.accountId">
          <td class="data-people px-3">
            <label class="label-chk">
              <input
                type="checkbox"
                class="form-checkbox focus:outline-none focus:shadow-outline"
                :value="user.accountId"
                :name="user.accountId"
                v-model="selected"
                @click="selectItem"
              />
            </label>
          </td>
          <!--          <td class="data-people">-->
          <!--            <span class="text-people">{{ user.accountId }}</span>-->
          <!--          </td>-->
          <td class="data-people">
            <span
              class="text-people cursor-pointer text-name"
              @click="$router.push(routeLinkEdit(user.accountId))"
              >{{ user.fullname }}</span
            >
          </td>
          <td class="data-people">
            <span class="text-people">{{ user.positionName }}</span>
          </td>
          <!--          <td class="data-people">-->
          <!--            <span class="text-people">{{ user.positionName }}</span>-->
          <!--          </td>-->
          <td class="data-people">
            <span class="text-people">{{
              getMainSkills(user.mainSkills)
            }}</span>
          </td>
          <!--          <td class="data-people status">-->
          <!--            <span-->
          <!--              :class="listStatus[user.status].class"-->
          <!--              v-if="user.status !== null"-->
          <!--            >-->
          <!--              <span-->
          <!--                v-if="user.status !== null"-->
          <!--                class="dot-circle"-->
          <!--                :class="listStatus[user.status].dot"-->
          <!--              ></span-->
          <!--              >{{ user.status }}</span-->
          <!--            >-->
          <!--            <span-->
          <!--              :class="listStatus[user.status].class"-->
          <!--              v-if="user.status === null"-->
          <!--            >-->
          <!--              <span-->
          <!--                v-if="user.status === null"-->
          <!--                class="dot-circle"-->
          <!--                :class="listStatus[user.status].dot"-->
          <!--              ></span-->
          <!--              >Pending</span-->
          <!--            >-->
          <!--          </td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HeaderPeople from "./HeaderPeople.vue";
export default {
  components: {
    HeaderPeople,
  },
  props: {
    employeeData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      listStatus: {
        active: {
          class: "status-active",
          dot: "active-dot",
        },
        null: {
          class: "status-pending",
          dot: "pending-dot",
        },
      },
      selected: [],
      selectedAll: false,
    };
  },
  methods: {
    getMainSkills(mainSkill) {
      let str = mainSkill.map((item) => {
        return item.name;
      });
      return str.join(", ");
    },
    routeLinkEdit(accountId) {
      return `/user-profile/${accountId}/over-view`;
    },
    selectAll() {
      this.selected = [];
      if (!this.selectedAll) {
        for (let i in this.employeeData) {
          this.selected.push(this.employeeData[i].accountId);
        }
      }
    },
    selectItem() {
      this.selectedAll = false;
    },
  },
  watch: {
    selected(value) {
      this.$emit("change-select", value);
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
  border-spacing: 0;
  width: 100%;
  @apply border-collapse table-auto whitespace-nowrap bg-white relative shadow-md rounded-lg;
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

.data-people.status {
  padding-left: 1.5rem;
}

.text-people {
  @apply text-gray-700 px-6 py-3 flex items-center;
}
.text-name {
  @apply hover:text-blue-700;
}

.status-pending {
  @apply flex text-red-500  items-center rounded-md;
}

.status-active {
  @apply flex text-green-500  items-center rounded-md;
}

.dot-circle {
  @apply inline-block w-2 h-2 bg-green-400 rounded-full mr-2;
}

.active-dot {
  @apply bg-green-400;
}

.pending-dot {
  @apply bg-red-400;
}

table th:first-child {
  border-radius: 20px 0 0 0;
}

table th:last-child {
  border-radius: 0 20px 0 0;
}
</style>
