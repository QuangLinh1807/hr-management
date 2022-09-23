<template>
  <div>
    <div class="container">
      <div class="error-page">
        <div class="-intro-x lg:mr-20">
          <img
            alt="Icewall Tailwind HTML Admin Template"
            class="h-48 lg:h-auto"
            :src="require(`@/assets/images/error-illustration.svg`)"
          />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <div class="intro-x text-8xl font-medium">404</div>
          <div class="intro-x text-xl lg:text-3xl font-medium mt-5">
            Oops. This page has gone missing.
          </div>
          <div class="intro-x text-lg mt-3">
            You may have mistyped the address or the page may have moved.
          </div>
          <!-- <a class="back-home" href="/dashboard">Back to Home</a> -->
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.error-page {
  @apply flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left;
}
.back-home {
  border: 2px solid #fff;
  @apply py-3 px-4 text-white rounded-md dark:border-dark-5 dark:text-gray-300 mt-10 font-bold inline-block;
}
</style>
