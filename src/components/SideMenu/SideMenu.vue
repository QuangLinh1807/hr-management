<template>
  <!-- BEGIN: Side Menu -->
  <nav class="side-nav">
    <ul>
      <!-- BEGIN: First Child -->
      <template v-for="(menu, menuKey) in LIST_MENU">
        <li
          v-if="menu == 'devider'"
          :key="menu + menuKey"
          class="side-nav__devider my-6"
        ></li>
        <li v-else :key="menu + menuKey">
          <router-link
            :to="menu.pageName"
            class="side-menu"
            :class="{
              'side-menu--open': menu.activeDropdown,
            }"
          >
            <div class="side-menu__icon">
              <component :is="menu.icon" />
            </div>
            <div class="side-menu__title">
              {{ menu.title }}
              <div
                v-if="menu.subMenu"
                class="side-menu__sub-icon"
                :class="{ 'transform rotate-180': menu.activeDropdown }"
              >
                <!-- <ChevronDownIcon /> -->
              </div>
            </div>
          </router-link>
          <!-- BEGIN: Second Child -->
          <transition @enter="enter" @leave="leave">
            <ul v-if="menu.subMenu && menu.activeDropdown">
              <li
                v-for="(subMenu, subMenuKey) in menu.subMenu"
                :key="subMenuKey"
              >
                <a
                  href="javascript:;"
                  class="side-menu"
                  :class="{ 'side-menu--active': subMenu.active }"
                >
                  <div class="side-menu__icon">
                    <ActivityIcon />
                  </div>
                  <div class="side-menu__title">
                    {{ subMenu.title }}
                    <div
                      v-if="subMenu.subMenu"
                      class="side-menu__sub-icon"
                      :class="{
                        'transform rotate-180': subMenu.activeDropdown,
                      }"
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </a>
                <!-- BEGIN: Third Child -->
                <transition @enter="enter" @leave="leave">
                  <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                    <li
                      v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                      :key="lastSubMenuKey"
                    >
                      <a
                        href="javascript:;"
                        class="side-menu"
                        :class="{
                          'side-menu--active': lastSubMenu.active,
                        }"
                      >
                        <div class="side-menu__icon">
                          <ZapIcon />
                        </div>
                        <div class="side-menu__title">
                          {{ lastSubMenu.title }}
                        </div>
                      </a>
                    </li>
                  </ul>
                </transition>
                <!-- END: Third Child -->
              </li>
            </ul>
          </transition>
          <!-- END: Second Child -->
        </li>
      </template>
      <!-- END: First Child -->
    </ul>
  </nav>
  <!-- END: Side Menu -->
</template>

<script>
import Velocity from "velocity-animate";
import { LIST_MENU } from "@/constants/listMenu";
export default {
  data() {
    return {
      LIST_MENU,
    };
  },
  methods: {
    enter(el, done) {
      Velocity(el, "slideDown", { duration: 300 }, { complete: done });
    },

    leave(el, done) {
      Velocity(el, "slideUp", { duration: 300 }, { complete: done });
    },
  },
};
</script>
<style lang="scss" scoped>
.side-menu.active {
  background: #0f2664;
}
.side-menu {
  transition: 0.1s linear;
}
</style>
