<template>
  <div class="card-hobby">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(saveInfo)">
        <div class="tit-hobby">
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
        <div class="w-full">
          <div class="edit-hobby w-full" v-if="!isEditTable">
            <textarea class="textarea-hobby" v-model.trim="textHobby">
            </textarea>
          </div>
          <PerfectScrollbar class="scroll-hobby">
            <div
              v-if="isEditTable"
              class="w-full px-3 py-1 rounded-lg text-gray-600"
            >
              {{ textHobby }}
            </div>
          </PerfectScrollbar>
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
      textHobby: "",
      dataApi: "",
      paramsId: this.$route.params.id,
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
  },
  computed: {
    ...mapGetters("overview", ["getPersonalProfile"]),
  },
  props: {
    accountID: {
      type: String,
      default: () => {
        return "";
      },
    },
  },

  methods: {
    ...mapMutations("loading", ["SET_LOADING"]),
    bindingValue() {
      this.dataApi = this.getPersonalProfile.hobby;
      this.textHobby = this.dataApi;
      this.textHobby = JSON.parse(JSON.stringify(this.dataApi));
    },
    async saveInfo() {
      this.isEditTable = true;
      this.dataApi = this.textHobby;
      await this.putDataHobbyFromApi();
    },
    closeSave() {
      this.isEditTable = true;
      this.textHobby = JSON.parse(JSON.stringify(this.dataApi));
    },
    toggleDisable() {
      this.isEditTable = false;
    },
    async putDataHobbyFromApi() {
      this.SET_LOADING(true);
      try {
        const res = await api("putUserProfileApi", {
          data: { hobby: this.dataApi },
          accountId: this.paramsId,
        });
        console.log(res);
        if (res) {
          this.SET_LOADING(false);
          this.$notify({
            group: "foo",
            title: "Upload Hobby",
            text: "Successfully Upload Hobby",
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
.textarea-hobby {
  border: 1px solid #cecece;
  overflow: hidden;
  outline: none;
  border-radius: 4px;
  @apply p-2 text-gray-600 h-full resize-none w-full overflow-hidden overflow-y-auto;
}
.scroll-hobby {
  max-height: 200px;
}
.edit-hobby {
  height: 200px;
}
.card-hobby {
  // border: 1px solid #cecece;
  @apply w-full rounded overflow-hidden h-auto;
}
.card-hobby::after {
  content: "";
  height: 40px;
  top: 0;
  z-index: 0;
  @apply absolute w-full;
}
.card-hobby:hover .tit-hobby {
  opacity: 1;
}
.tit-hobby {
  top: 2px;
  right: 10px;
  opacity: 0;
  transition: 0.2s linear;
  z-index: 2;
  @apply absolute;
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
</style>
