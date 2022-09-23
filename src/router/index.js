import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: () => import("../layouts/BasicLayout.vue"),
    meta: {
      requiresAuth: true,
      admin: true,
    },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "DashboardPage",
        meta: {
          requiresAuth: true,
          admin: true,
        },
        component: () => import("../views/dashboard/Dashboard.vue"),
      },
      {
        path: "/people",
        meta: {
          requiresAuth: true,
          admin: true,
        },
        name: "PeoplePage",
        component: () => import("../views/people/People.vue"),
      },
      {
        path: "/management-skillset",
        component: () =>
          import("../views/management-skillset/ManagementPage.vue"),
        children: [
          {
            meta: {
              requiresAuth: true,
              admin: true,
            },
            path: ":id",
            name: "DetailSection",
            component: () =>
              import("../views/management-skillset/DetailSection.vue"),
            props: true,
          },
          {
            path: "/",
            meta: {
              requiresAuth: true,
              admin: true,
            },
            name: "manage-skill",
            component: () =>
              import("../views/management-skillset/ManagementSkillset.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/",
    component: () => import("../layouts/NoAuthLayout.vue"),
    meta: {
      guest: true,
    },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/Login.vue"),
      },
      {
        path: "/api/forgot-password",
        name: "Forgotpassword",
        component: () => import("../views/auth/ForgotPassword.vue"),
      },
      {
        path: "/api/forgot-password/confirm-reset/:token",
        name: "ResetPassword",
        component: () => import("../views/auth/ResetPassword.vue"),
        beforeEnter: (to, from, next) => {
          if (
            /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(
              to.params.token
            )
          ) {
            next();
          } else {
            next("/login");
          }
        },
      },
    ],
  },
  {
    path: "/user-profile/:id",
    redirect: "/user-profile/:id/over-view",
    name: "user-profile",
    meta: {
      requiresAuth: true,
      user: true,
      admin: false,
    },
    props: true,
    component: () => import("../layouts/UserLayout.vue"),
    children: [
      {
        path: "over-view",
        name: "over-view",
        meta: {
          requiresAuth: true,
          user: true,
          admin: false,
        },
        component: () => import("../views/user-profile/Overview.vue"),
      },
      {
        path: "skill-set",
        name: "skill-set",
        meta: {
          requiresAuth: true,
          user: true,
          admin: false,
        },
        component: () => import("../views/user-profile/SkillSet.vue"),
      },
      {
        path: "time-line",
        name: "time-line",
        meta: {
          requiresAuth: true,
          user: true,
          admin: false,
        },
        component: () => import("../views/user-profile/TimeLine.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/error/ErrorPage.vue"),
    name: "NotFound",
  },
  {
    path: "/not-found",
    component: () => import("../views/error/ErrorPage.vue"),
    name: "NotFoundAccountId",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "side-menu--active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("jwtToken")) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      if (to.matched.some((record) => record.meta.admin || record.meta.user)) {
        next();
      } else if (to.matched.some((record) => record.meta.user)) {
        next({
          path: "user-profile",
          params: { id: localStorage.getItem("accountId") },
        });
      } else {
        next({ path: "not-found" });
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!localStorage.getItem("jwtToken")) {
      next();
    } else {
      next({
        name: "user-profile",
        params: { id: store.getters.personalInfo.accountId },
      });
    }
  } else {
    next();
  }
});

export default router;
