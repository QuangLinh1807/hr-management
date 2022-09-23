<template>
  <ValidationProvider
    v-slot="{ errors, classes }"
    :rules="inputField.rules"
    :name="inputField.name"
    class="val-input"
  >
    <v-select
      class="border-gray-300"
      :options="options"
      v-model.trim="inputField.model"
      :class="{ error: errors[0] }"
    ></v-select>
    <div class="text-error h-3 mb-2" :class="classes">{{ errors[0] }}</div>
  </ValidationProvider>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    inputField: {
      type: Object,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.error {
  border: 1px solid #ed5d5d;
  border-radius: 5px;
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
}
</style>
