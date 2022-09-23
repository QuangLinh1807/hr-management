<template>
  <div class="pt-3 px-8">
    <TopBar />
    <div class="wrapper">
      <div class="wrapper-box">
        <div class="content">
          <div class="flex">
            <LeftSideProfile />
            <div class="boxContent">
              <div class="boxTabs">
                <router-link
                  v-for="tab of listTab"
                  :class="['tabItem', nameRouter == tab.name ? 'active' : '']"
                  :key="tab.id"
                  :to="'/user-profile/' + $route.params.id + '/' + tab.name"
                  >{{ tab.text }}
                  <component class="mr-2" :is="tab.icon"></component>
                </router-link>
              </div>
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/TopBar.vue";
import LeftSideProfile from "../components/LeftSideProfile/Main.vue";
export default {
  components: {
    TopBar,
    LeftSideProfile,
  },
  data() {
    return {
      listTab: [
        {
          id: 1,
          text: "Overview",
          name: "over-view",
          icon: "BookOpenIcon",
        },
        {
          id: 2,
          text: "Skillset",
          name: "skill-set",
          icon: "ActivityIcon",
        },
        {
          id: 3,
          text: "Timeline",
          name: "time-line",
          icon: "ClockIcon",
        },
      ],
      nameRouter: this.$route.name,
    };
  },
  watch: {
    $route(to) {
      this.nameRouter = to.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.tabItem {
  // background-color:rgba($color: lightblue, $alpha: 0.2);
  z-index: 9999;
  border-radius: 5px 5px 0 0;
  font-size: 15px;
  color: rgba($color: #1a2e71, $alpha: 0.3);
  @apply flex flex-row-reverse justify-center items-center w-40 h-10 text-primary-1;
}
.active {
  // background-color: lightblue;
  // border-bottom: 3px solid;
  font-weight: bold;
  position: relative;
  //  color: #007bc3;
  @apply border-gray-900 text-primary-1;
}
.active::after {
  content: "";
  display: block;
  height: 4px;
  background-color: #1a2e71;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 5px;
}
.boxContent {
  width: 80vw;
  @apply p-4 mt-4;
}
.boxTabs {
  border-bottom: 1px solid rgba($color: gray, $alpha: 0.2);
  @apply flex mb-4;
}
</style>
