<template>
  <div class="card-objective">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(saveInfo)">
        <div class="intro-y">
          <div class="tit-obj">
            <h2 class="text-lg mr-auto font-bold">Objective</h2>
            <div>
              <button
                v-if="!isEditTable"
                class="mr-2 focus:outline-none"
                type="submit"
              >
                <SaveIcon class="text-blue-900" />
              </button>
              <button
                v-if="!isEditTable"
                class="focus:outline-none"
                @click="closeSave"
              >
                <XIcon class="text-red-700 focus:outline-none" />
              </button>

              <EditIcon
                class="
                  hover:text-primary-1
                  focus:border-none
                  focus:outline-none
                  text-blue-900
                  cursor-pointer
                "
                v-if="isEditTable"
                @click.prevent="toggleDisable"
              />
            </div>
          </div>

          <div class="h-60 flex items-center">
            <ValidationProvider
              rules="required|max: 2048"
              v-slot="{ errors }"
              name="Objective"
              class="w-full h-5/6 mx-4"
              v-if="!isEditTable"
            >
              <textarea
                class="text-obj"
                v-model.trim="textValue"
                :class="{ error: errors[0] }"
              >
              </textarea>
              <div v-if="!isEditTable" class="text-red-600 ml-2 mt-1">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
            <PerfectScrollbar class="h-5/6">
              <div
                v-if="isEditTable"
                class="
                  flex flex-col
                  sm:flex-row
                  w-full
                  h-5/6
                  px-8
                  py-2
                  rounded-lg
                  text-gray-600
                  focus:outline-none
                  focus:border-none
                  text-justify
                "
              >
                {{ textValue }}
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import api from "@/api/api";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isEditTable: true,
      textValue: "",
      dataApi: "",
      accId: "",
    };
  },
  watch: {
    getPersonalProfile: {
      handler: function (val) {
        if (val) {
          this.bindingValue();
        }
      },
    },
    $route: {
      handler: async function (to) {
        this.accId = to.params.id;
      },
      immediate: true,
    },
  },
  // async created() {
  //   await this.$store.dispatch("overview/getPersonalFromApi");
  // },
  computed: {
    ...mapGetters("overview", ["getPersonalProfile"]),
  },
  methods: {
    ...mapMutations("loading", ["SET_LOADING"]),
    bindingValue() {
      this.dataApi = this.getPersonalProfile.objective;
      this.textValue = this.dataApi;
      this.textValue = JSON.parse(JSON.stringify(this.dataApi));
    },
    async saveInfo() {
      this.isEditTable = true;
      this.dataApi = this.textValue;
      await this.putDataObjFromApi();
    },
    closeSave() {
      this.isEditTable = true;
      // this.bindingValue();
      this.textValue = JSON.parse(JSON.stringify(this.dataApi));
    },
    toggleDisable() {
      this.isEditTable = false;
    },
    async putDataObjFromApi() {
      this.SET_LOADING(true);
      try {
        const res = await api("putUserProfileApi", {
          data: { objective: this.dataApi },
          accountId: this.accId,
        });
        if (res) {
          this.SET_LOADING(false);
          this.$notify({
            group: "foo",
            title: "Upload Objective",
            text: "Successfully Upload Objective",
            type: "success",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.text-obj {
  border-radius: 4px;
  @apply p-2 text-gray-600 h-full focus:outline-none resize-none w-full;
}
.card-objective {
  // border: 1px solid #cecece;
  background-color: #f2f8fc;
  @apply w-full rounded overflow-hidden h-auto;
}
.tit-obj {
  border-bottom: 1px solid #fff;
  @apply flex items-center p-1 pl-3;
}
.active {
  border: 1px solid rgba($color: gray, $alpha: 0.2);
}
/* width */
::-webkit-scrollbar {
  width: 4px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.error {
  border-color: #ed5d5d;
  background-color: rgba($color: #ed5d5d, $alpha: 0.08);
}
</style>
