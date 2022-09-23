<template>
  <ValidationProvider
    v-slot="{ errors, classes }"
    :rules="textareaField.rules"
    class="val-textarea"
  >
    <textarea
      class="
        timeline-textarea
        form-control
        px-2
        py-1
        border-gray-300
        mb-1
        overflow-y-auto overflow-hidden
      "
      :name="textareaField.name"
      v-model.trim="textValue"
      :class="{ error: errors[0] }"
      :placeholder="textareaField.placeholder"
    />
    <div class="text-error text-error h-3 mb-2" :class="classes">
      {{ errors[0] }}
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    textareaField: {
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
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgb(164, 164, 164);
}
::-webkit-scrollbar-thumb:hover {
  background: #1c3271;
}
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
.timeline-textarea {
  overflow: hidden;
  height: 90px;
  overflow-y: auto;
  resize: none;
}
.val-textarea {
  width: calc(100% - 70px);
}
</style>
