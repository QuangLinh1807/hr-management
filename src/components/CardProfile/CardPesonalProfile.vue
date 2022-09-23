<template>
  <div class="card-personal-profile">
    <ValidationObserver v-slot="{ handleSubmit }" :setErrors="setErrors">
      <form @submit.prevent="handleSubmit(saveInfo)">
        <div class="intro-y personal-info">
          <div class="tit-personal">
            <h2 class="text-lg mr-auto font-bold">Personal Profile</h2>
            <div class="ml-auto flex items-center">
              <button
                v-if="!isEditable"
                class="mr-2 focus:outline-none"
                type="submit"
              >
                <SaveIcon class="text-blue-900" />
              </button>
              <button
                v-if="!isEditable"
                class="focus:outline-none"
                @click="closeSave"
              >
                <XIcon class="text-red-700 focus:outline-none" />
              </button>
              <EditIcon
                v-if="isEditable"
                @click="toggleDisable"
                class="
                  hover:text-primary-1
                  text-blue-900
                  focus:outline-none
                  cursor-pointer
                "
              />
            </div>
          </div>
          <div
            class="px-2 pt-4 w-full"
            v-for="item of listFields"
            :key="item.id"
          >
            <div class="flex items-start flex-col sm:flex-row w-full">
              <div class="mr-5 w-3/12 pl-6">
                <div class="font-medium">{{ item.label }}</div>
              </div>
              <ValidationProvider
                v-if="!isEditable"
                :rules="item.rules"
                v-slot="{ errors }"
                class="w-full"
                :setErrors="['abc']"
                :name="item.name"
              >
                <input
                  class="personal-input form-control"
                  v-model.trim="item.value"
                  :name="item.name"
                  v-if="!isEditable && item.type === 'text'"
                  :class="[errors[0] ? 'error' : '']"
                />

                <v-select
                  v-if="!isEditable && item.type === 'select'"
                  :options="item.optionS"
                  v-model.trim="item.value"
                  class="w-5/6"
                  :class="{ error: errors[0] }"
                  :name="item.name"
                  :reduce="(option) => option.code"
                >
                  <template #search="{ attributes, events }" :name="item.name">
                    <input
                      class="vs__search h-7"
                      v-bind="attributes"
                      v-on="events"
                      :name="item.name"
                    />
                  </template>
                </v-select>
                <DatePicker
                  v-if="!isEditable && item.type === 'date'"
                  v-model.trim="item.value"
                  format="DD/MM/YYYY"
                  value-type="DD/MM/YYYY"
                  :name="item.name"
                  class="w-5/6"
                  :disabled-date="disabledBeforeToday"
                  input-class="form-control"
                  :class="{ error: errors[0] }"
                ></DatePicker>
                <div v-if="!isEditable" class="h-2 mt-1 text-error">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
              <div
                v-if="isEditable"
                class="break-words w-2/4 h-auto flex items-center"
              >
                {{ getValueShowInSreen(item) }}
              </div>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import api from "@/api/api";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    DatePicker,
  },
  props: {
    departmentList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      setErrors: {
        required: ["qwer", "The email field must be a valid email"],
        name: ["The name field is required"],
        age: ["The age field must be a valid number"],
      },
      accId: null,
      isEditable: true,
      listFields: [
        {
          id: 1,
          name: "fullname",
          label: "Full Name",
          value: "",
          type: "text",
          rules: "required|min:4|max:255",
        },
        {
          id: 2,
          label: "Gender",
          name: "gender",
          value: "",
          type: "select",
          select: [],
          optionS: [],
          rules: "required",
        },
        {
          id: 3,
          label: "Birthday",
          name: "birthday",
          value: "",
          type: "date",
          rules: "required",
        },
        {
          id: 4,
          label: "Position",
          name: "positionId",
          value: "",
          type: "select",
          select: [],
          optionS: [],
          rules: "required",
        },
        {
          id: 5,
          label: "Team",
          name: "departmentId",
          value: "",
          type: "select",
          select: [],
          optionS: [],
          rules: "required",
        },
        {
          id: 6,
          label: "Phone Number",
          name: "phone",
          value: "",
          type: "text",
          rules: "required|numeric|min:5|max:20",
        },
        {
          id: 7,
          label: "Address",
          name: "address",
          value: "",
          type: "text",
          rules: "required|min:1|max:255",
        },
        // {
        //   id: 8,
        //   label: "Email",
        //   name: "email",
        //   value: "",
        //   type: "text",
        //   rules: "required|email|min:4|max:255",
        // },
      ],
      formGroup: [],
      optionGender: [
        {
          code: 0,
          label: "Male",
        },
        {
          code: 1,
          label: "Female",
        },
        {
          code: 2,
          label: "Other",
        },
      ],
      optionPosition: [],
      optionDepartment: [],
    };
  },
  watch: {
    getPersonalProfile: {
      handler: function (val) {
        if (val) {
          this.bindingListFields();
        }
      },
      immediate: true,
      deep: true,
    },
    getPositionUser: {
      handler: function (val) {
        if (val) {
          this.optionPosition = this.getPositionUser.map((item) => ({
            label: item.name,
            code: item.id,
          }));
        }
      },
      immediate: true,
    },
    departmentList: {
      handler: function (val) {
        if (val) {
          this.optionDepartment = this.departmentList.map((item) => ({
            label: item.name,
            code: item.id,
          }));
        }
      },
      immediate: true,
    },
    $route: {
      handler: async function (to) {
        this.accId = to.params.id;
      },
      immediate: true,
    },
    flagChange(newValue) {
      if (newValue === true) {
        this.bindingListFields();
        this.$store.commit("SET_FLAG_CHANGE", false);
      }
    },
  },
  async created() {
    await this.$store.dispatch("overview/getPositionFromApi");
  },
  computed: {
    ...mapGetters("overview", ["getPersonalProfile"]),
    ...mapGetters("overview", ["getPositionUser"]),
  },
  methods: {
    ...mapMutations("loading", ["SET_LOADING"]),
    toggleDisable() {
      this.isEditable = false;
    },
    saveInfo() {
      this.isEditable = true;
      this.listFields.forEach(
        (item) => (this.formGroup[item.name] = item.value)
      );
      this.putDataFromApi();
    },
    closeSave() {
      this.isEditable = true;
      this.bindingListFields();
    },
    formatDate() {
      return this.formGroup.birthday;
    },
    bindingListFields() {
      this.formGroup = {
        ...this.getPersonalProfile,
      };
      this.listFields = this.listFields.map((item) => ({
        ...item,
        value: this.formGroup[item.name],
      }));
    },
    getValueShowInSreen(item) {
      if (item.name === "positionId") {
        item.optionS = this.optionPosition;
        return (
          this.optionPosition.length > 0 &&
          this.optionPosition?.find((position) => position.code === item.value)
            ?.label
        );
      }
      if (item.name === "departmentId") {
        item.optionS = this.optionDepartment;
        return (
          this.optionDepartment.length > 0 &&
          this.optionDepartment?.find(
            (department) => department.code === item.value
          )?.label
        );
      }
      if (item.name === "gender") {
        item.optionS = this.optionGender;
        const resultGender =
          this.optionGender.length > 0 &&
          this.optionGender?.find((gender) => gender.code === item.value);
        return resultGender ? resultGender.label : "";
      }
      if (item.type === "date") {
        return this.formatDate();
      }
      return item.value;
    },
    async putDataFromApi() {
      this.SET_LOADING(true);
      try {
        const res = await api("putUserProfileApi", {
          data: {
            address: this.formGroup.address,
            birthday: this.formGroup.birthday,
            gender: this.formGroup.gender,
            email: this.formGroup.email,
            fullname: this.formGroup.fullname,
            phone: this.formGroup.phone,
            departmentId: this.formGroup.departmentId,
            positionId: this.formGroup.positionId,
          },
          accountId: this.accId,
        });
        if (res.success) {
          this.SET_LOADING(false);
          await this.$store.dispatch("overview/getPersonalFromApi", {
            accountId: this.accId,
          });
          this.$notify({
            group: "foo",
            title: "success",
            text: "Successfully save Personal Profile",
            type: "success",
          });
          this.isEditable = true;
        } else {
          this.isEditable = false;
          throw new Error(res.data.response.data.errors[0].message);
        }
      } catch (err) {
        this.$notify({
          group: "err",
          title: "Error",
          text: err.message,
          type: "error",
        });
      }
    },
    disabledBeforeToday(date) {
      return date > new Date();
    },
  },
};
</script>
<style lang="scss" scoped>
.mx-icon-calendar {
  display: block !important;
}
.tit-personal {
  border-bottom: 1px solid #fff;
  @apply flex items-center p-1  pl-3 dark:border-dark-5;
}
.error {
  border-color: #ed5d5d;
  border-width: 2px;
  background-color: rgba($color: #ed5d5d, $alpha: 0.08);
  @apply rounded-md;
}
.error::placeholder {
  color: #ed5d5d;
}
.text-error {
  color: #ed5d5d;
}
.errorDate {
  background-color: #ed5d5d;
}
.error:focus {
  outline: none;
  border-color: #ed5d5d !important;
  border-width: 2px;
  outline-offset: none !important;
  box-shadow: none !important;
}
.card-personal-profile {
  // border: 1px solid #cecece;
  background-color: #f2f8fc;
  @apply rounded overflow-hidden w-3/5 h-full mr-8;
}
.personal-info {
  @apply pb-8 w-full;
}
.personal-input {
  border-color: rgba(60, 60, 60, 0.26);
  @apply w-5/6;
}
</style>
<style lang="scss">
.vs__dropdown-toggle {
  background-color: white !important;
}
</style>
