<template>
  <div class="login">
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="logo-morhn"
              :src="require(`@/assets/images/logo-mor.svg`)"
            />
          </a>
          <div class="my-auto">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              :src="require(`@/assets/images/illustration.svg`)"
            />
            <div
              class="
                -intro-x
                text-white
                font-medium
                text-4xl
                leading-tight
                mt-10
              "
            >
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div
              class="
                intro-x
                mt-5
                text-lg text-white text-opacity-70
                dark:text-gray-500
              "
            >
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <router-view />
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const elBody = document.querySelector("body");
    elBody.classList.add = "login";
  },
};
</script>
<style>
.logo-morhn {
  width: 12rem;
}
</style>
