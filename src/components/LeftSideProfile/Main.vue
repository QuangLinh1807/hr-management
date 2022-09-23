<template>
  <div class="sideBox">
    <div class="leftside-avt">
      <img :src="avatarUser" alt="" v-if="avatarUser !== null" />
      <PictureInput
        class="picture-input-avatar"
        ref="pictureInput"
        @change="onChange"
        accept="image/jpeg,image/png,/image/jpg"
        size="4"
        :hideChangeButton="true"
        :customStrings="{
          drag: 'Upload Image',
        }"
      >
      </PictureInput>

      <Avatar
        v-if="avatarUser === null"
        class="vue-avt"
        :username="fullname"
      ></Avatar>
      <div class="bg-upload-avt">
        <CameraIcon class="icon-upload" />
      </div>
    </div>
    <div class="boxTitle">
      <div class="full-name-leftside" v-tooltip.bottom="fullname">
        {{ fullname }}
      </div>
      <p>{{ namePos }}</p>
    </div>
    <div class="boxSkill">
      <div class="title-skills">Main Skills</div>
      <div class="boxItem mb-10">
        <ChipCardSkill
          v-for="(item, index) of listSkills"
          :key="index"
          :item="item"
          :isHeight="true"
        ></ChipCardSkill>
      </div>
    </div>
    <div class="boxSkill">
      <div class="title-skills">Hobby</div>
      <div class="boxItem">
        <HobbyCard></HobbyCard>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapGetters, mapMutations } from "vuex";
import ChipCardSkill from "./ChipCardSkill.vue";
import HobbyCard from "./HobbyCard.vue";
import PictureInput from "vue-picture-input";

export default {
  components: {
    ChipCardSkill,
    HobbyCard,
    PictureInput,
  },
  props: ["id"],
  data() {
    return {
      accId: null,
      selectedFile: "",
      listSkills: [],
      avatarUser: "",
      fullname: "",
      position: "",
      namePos: "",
    };
  },
  watch: {
    position(newValue) {
      console.log(newValue);
      let positionName = this.getPositionUser.find(
        (item) => this.position === item.id
      );
      this.namePos = positionName.name;
    },
    getPersonalProfile: {
      handler: function (val) {
        if (val) {
          this.bindingFullname();
        }
      },
    },
    $route: {
      handler: async function (to) {
        this.accId = to.params.id;
        const res = await this.$store.dispatch("overview/getPersonalFromApi", {
          accountId: to.params.id,
        });
        if (res) {
          // this.$router.push({ name: "over-view" });
        } else {
          this.$router.push({ name: "NotFoundAccountId" });
        }
      },
      immediate: true,
    },
  },
  async created() {},
  computed: {
    ...mapGetters("overview", ["getPersonalProfile"]),
    ...mapGetters("overview", ["getPositionUser"]),
    isStatusActive() {
      return this.user.status === "Active";
    },
    hasAvatar() {
      return this.user.avatar !== "";
    },
  },

  methods: {
    ...mapMutations("loading", ["SET_LOADING"]),
    bindingFullname() {
      this.fullname = this.getPersonalProfile.fullname;
      // this.position = this.formatPosition[this.getPersonalProfile.positionId];
      this.position = this.getPersonalProfile.positionId;
      this.avatarUser = this.getPersonalProfile.avatar;
      this.listSkills = this.getPersonalProfile.mainSkills;
    },

    async onChange() {
      if (this.$refs.pictureInput.file) {
        this.selectedFile = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
        this.selectedFile = "";
      }
      const fd = new FormData();
      fd.append("avatar", this.selectedFile);
      const res = await api("postAvatarProfileApi", {
        avatar: fd,
        accountId: this.accId,
      });
      this.SET_LOADING(true);
      if (res.success) {
        await this.$store.dispatch("overview/getPersonalFromApi", {
          accountId: this.accId,
        });
        this.SET_LOADING(false);
        this.$notify({
          group: "foo",
          title: "Upload Avatar",
          text: "Successfully Upload Avatar",
          type: "success",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vue-avt {
  width: 100% !important;
  height: 100% !important;
  font: 90px / 50px Helvetica, Arial, sans-serif !important;
  @apply inset-0 absolute;
}
.icon-upload {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  transition: 0.2s linear;
  z-index: 9;
  color: #fff;
  @apply absolute;
}
.full-name-leftside {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
// .full-name-leftside:hover {
//   overflow: visible;
// }
.boxSkill {
  .title-skills {
    @apply text-xl w-full font-medium ml-1 mb-2;
  }
  .boxItem {
    @apply flex justify-center flex-wrap w-full;
  }
  @apply w-full mt-4 relative;
}
.sideBox {
  width: 19%;
  min-width: 220px;
  @apply p-4 mr-6 mt-4 block relative;
}
.leftside-avt {
  border-radius: 50%;
  height: 280px;
  @apply relative overflow-hidden cursor-pointer w-full;
}
.bg-upload-avt {
  content: "";
  background-color: #00000040;
  z-index: 0;
  opacity: 0;
  transition: 0.2s linear;
  @apply absolute inset-0;
}
.leftside-avt:hover .bg-upload-avt {
  opacity: 1;
}
.leftside-avt img {
  width: 100%;
  min-height: 100%;
  object-fit: cover;
}
.picture-input-avatar {
  opacity: 0;
  z-index: 1;
  @apply absolute inset-0;
}
.boxTitle {
  div {
    font-weight: 500;
    @apply text-3xl;
  }
  p {
    font-style: italic;
    font-weight: 600;

    @apply text-base my-2 font-normal;
  }
  width: 100%;
  text-align: center;
  border-bottom: 1px solid rgba(gray, 0.4);
  @apply mt-4;
}
.btn-save-avt {
  z-index: 10002;
  top: 260px;
  right: 20px;
  @apply absolute;
  .feather {
    width: 34px;
    height: 34px;
    @apply text-green-600;
  }
}
.btn-cancel-avt {
  z-index: 10002;
  top: 20px;
  right: 20px;
  @apply absolute;
  .feather {
    width: 36px;
    height: 36px;
    @apply text-red-600;
  }
}
.preview-container::before {
  content: "";
  width: 20px;
  height: 20px;
  @apply absolute;
}
@media (max-width: 1650px) {
  .leftside-avt {
    height: 200px;
  }
}
</style>
<style lang="scss">
.picture-inner-text {
  color: #fff;
}
.picture-preview {
  background-color: #00000040 !important;
}
.preview-container {
  @apply relative;
}
</style>
