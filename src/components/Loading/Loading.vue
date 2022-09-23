<template>
  <div v-if="loading" :loading="loading" class="bg-loading">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Loading",
  computed: {
    ...mapGetters("loading", ["loading"]),
  },
};
</script>

<style scoped>
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.bg-loading {
  z-index: 51;
  background-color: #ffffff42;
  @apply fixed inset-0;
}
.loader {
  z-index: 10000;
  color: #0f2664;
  font-size: 10px;
  margin: 80px auto;
  position: absolute;
  top: 30%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}

.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader:after {
  left: 3.5em;
}

@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }

  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }

  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
