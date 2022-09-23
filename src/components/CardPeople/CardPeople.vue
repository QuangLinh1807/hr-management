<template>
  <div
    class="card-people"
    :style="!hasAvatar ? 'padding-top: 20px' : 'padding-top: auto'"
    style="cursor: pointer"
    @click.self="$router.push(routeLinkEdit)"
  >
    <div class="dropdown inline-block" data-placement="right-start">
      <button class="dropdown-toggle">
        <more-vertical-icon
          size="1.5x"
          class="custom-class"
        ></more-vertical-icon>
      </button>
      <div class="dropdown-menu w-36">
        <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
          <router-link
            role="button"
            :to="routeLinkEdit"
            class="action"
            data-dismiss="dropdown"
            ><Edit2Icon class="w-4 h-4 mr-2 text-blue-900" />Update</router-link
          >
          <a
            href="#"
            class="action"
            @click.prevent="deleteUser"
            role="button"
            data-dismiss="dropdown"
            ><TrashIcon class="w-4 h-4 mr-2 text-gray-900" />
            Delete
          </a>
        </div>
      </div>
    </div>
    <div
      class="avatar h-2/3"
      @click="$router.push(routeLinkEdit)"
      style="padding-top: 25px"
    >
      <div class="avatar-image" v-if="hasAvatar">
        <img :src="user.avatar" alt="image-user" />
      </div>

      <Avatar :size="96" :username="user.fullname" v-if="!hasAvatar"></Avatar>
      <h2>{{ user.fullname }}</h2>
      <h3>
        {{ user.positionName }}
      </h3>
    </div>
    <div class="position h-1/3" @click="$router.push(routeLinkEdit)">
      <MiniSkillSet
        v-for="(skill, index) of listMainSkills"
        :key="index"
        :item="skill"
        :isHeight="true"
        >{{ skill }}</MiniSkillSet
      >
    </div>
  </div>
</template>

<script>
import MiniSkillSet from "../LeftSideProfile/MiniSkillSet.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    MiniSkillSet,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("popupDelete", [
      "SET_IS_SHOW",
      "SET_TITLE",
      "SET_NAME_DETAIL",
      "SET_CASE_DELETE",
    ]),
    deleteUser() {
      this.SET_IS_SHOW(this.user.accountId);
      this.SET_TITLE("employee");
      this.SET_NAME_DETAIL(this.user.fullname);
      this.SET_CASE_DELETE(6);
    },
  },
  computed: {
    routeLinkEdit() {
      return `/user-profile/${this.user.accountId}/over-view`;
    },
    isStatusActive() {
      return this.user.status === "active";
    },
    hasAvatar() {
      return this.user.avatar !== null;
    },
    listMainSkills() {
      const res = this.user.mainSkills;
      if (res.length > 3) {
        return res.slice(res.length - 3);
      } else {
        return res;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-avatar--wrapper {
  margin: 0 auto;
}
.card-people {
  //max-width: 17rem;
  min-width: calc(25%-1rem);
  background-color: #f4f9fd;
  transition: all 0.5s;
  @apply relative rounded-lg flex flex-col justify-center items-center text-center shadow overflow-hidden;

  // &:hover {
  //   transform: scale(1.01);
  // }
}

.card-pending {
  //max-width: 17rem;
  min-width: calc(25%-1rem);
  @apply relative rounded-lg bg-gray-100 flex flex-col justify-center items-center text-center opacity-80;
}

.dropdown {
  top: 5%;
  right: 5%;
  @apply absolute;
}

.avatar {
  @apply my-2 mx-auto py-4;
}

.avatar h2 {
  @apply mt-4 font-semibold text-lg;
}

.avatar h3 {
  @apply mt-1 font-semibold text-gray-700;
}
.position {
  @apply w-full border-t-2 border-gray-300 py-1 h-28;
}

.position {
  @apply py-2 px-4 flex flex-row flex-wrap justify-center;
}
.avatar-image {
  @apply mx-auto w-24 h-24 mt-4;
  //@apply w-24 h-24;
  img {
    padding: 2px;
    @apply w-full h-full  rounded-full mx-auto border-2 border-blue-500 block overflow-hidden;
    object-fit: cover;
  }
}

.custom-class {
  @apply transition-all hover:text-gray-500;
}

.action {
  @apply block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md;
}

button:focus {
  @apply focus:outline-none;
}

.card-pending {
  @apply opacity-70 cursor-not-allowed bg-gray-200;
}
</style>
