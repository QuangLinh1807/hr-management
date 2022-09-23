<template>
  <ValidationProvider
    :mode="inputField.mode"
    v-slot="{ errors, classes }"
    :rules="inputField.rules"
    class="val-input"
    :bails="false"
    :vid="inputField.vid"
  >
    <input
      :title="inputField.title"
      :type="inputField.type"
      class="
        intro-x
        login__input
        form-control
        py-3
        px-4
        border-gray-300
        block
        mt-3
        mb-1
      "
      :placeholder="inputField.placeholder"
      :name="inputField.name"
      v-model.trim="textValue"
      :class="{ error: errors[0] }"
    />
    <div class="text-error h-3 mb-2" :class="classes">{{ errors[0] }}</div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    inputField: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isError: false,
      textValue: "",
    };
  },
  watch: {
    textValue(val) {
      this.$emit("input", val);
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.error {
  border-color: #ed5d5d;
  background-color: rgba($color: #ed5d5d, $alpha: 0.08);
}
.error::placeholder {
  color: #ed5d5d;
}
.text-error {
  color: #ed5d5d;
}
.val-input {
  width: calc(100% - 70px);
  transform: i;
}
</style>
