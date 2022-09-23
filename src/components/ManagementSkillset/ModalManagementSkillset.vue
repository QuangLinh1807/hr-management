<template>
  <div>
    <div class="overlay" @click="actionCloseModal"></div>
    <div class="box-modal">
      <div class="flex justify-end">
        <x-circle-icon
          size="2x"
          class="exit-icon"
          @click="actionCloseModal"
        ></x-circle-icon>
      </div>
      <div class="mb-2 text-center">
        <h3 class="title-form">
          {{ listTitleForm[getTypeModal].title }}
        </h3>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div v-if="hasFileInput" class="relative">
            <img
              :src="formGroup.image"
              alt=""
              class="image-preview-form"
              v-if="getShowImagePreview"
            />
            <PictureInput
              ref="pictureInput"
              @change="onChange"
              width="400"
              height="600"
              accept="image/jpeg,image/png,image/jpg"
              size="4"
              :hideChangeButton="true"
              :customStrings="{
                drag: 'Drag or pick a image',
              }"
              :style="getOpacityImage"
            >
            </PictureInput>
          </div>
          <div class="mt-3 w-5/6 flex flex-col">
            <label class="ml-8 mb-2 font-medium">Title</label>
            <ValidationProvider
              rules="required|min:1|max:255"
              name="title"
              v-slot="{ errors }"
            >
              <input
                class="form-control ml-8"
                type="text"
                v-model.trim="formGroup.name"
                name="title"
                :class="[errors[0] ? 'error' : '']"
              />
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
          </div>
          <div class="mt-3 w-5/6 flex flex-col">
            <label class="ml-8 mb-2 font-medium">Description</label>
            <ValidationProvider
              rules="min:1|max:255"
              name="description"
              v-slot="{ errors }"
            >
              <input
                class="form-control ml-8"
                type="text"
                v-model="formGroup.description"
                :class="[errors[0] ? 'error' : '']"
              />
            </ValidationProvider>
          </div>
          <div
            class="mt-3 w-5/6 flex justify-center relative"
            v-if="
              (getTypeModal === listType.TYPE_CATEGORY) |
                (getTypeModal === listType.TYPE_EDIT_CATEGORY)
            "
          >
            <label class="ml-8 mb-2 font-medium mr-4">
              Select color title</label
            >
            <div
              class="box-color"
              :style="{ backgroundColor: formGroup.color }"
              @click="isColor = true"
            ></div>
            <div v-if="isColor" class="container-color">
              <div class="flex justify-end">
                <x-circle-icon
                  size="1.3x"
                  class="m-1 cursor-pointer"
                  @click="isColor = false"
                ></x-circle-icon>
              </div>
              <div class="color-container">
                <div
                  v-for="(item, index) of listColor"
                  :key="index"
                  class="box-color fix-color"
                  :style="{ backgroundColor: item }"
                  @click="selectedColor(item)"
                ></div>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-center">
            <button
              class="btn btn-primary btn-submit"
              type="submit"
              :disabled="isDisable"
            >
              {{ listTitleForm[getTypeModal].btn }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";
import PictureInput from "vue-picture-input";
import { mapGetters, mapMutations } from "vuex";
import { LIST_TYPE_MODAL } from "../../constants/typeModal";
import { LIST_COLOR } from "../../constants/listColor";

export default {
  components: {
    PictureInput,
  },
  data() {
    return {
      isDisable: false,
      isColor: false,
      formGroup: {
        name: null,
        description: "",
        image: null,
        color: "#007BC3",
      },
      listColor: LIST_COLOR,
      paramsRouter: this.$route.params.id,
      listType: LIST_TYPE_MODAL,
      listTitleForm: {
        category: {
          title: "Add Category",
          btn: "Add",
        },
        editCategory: {
          title: "Edit Category",
          btn: "Save",
        },
        subCategory: {
          title: "Add Subcategory",
          btn: "Add",
        },
        editSubCategory: {
          title: "Edit Subcategory",
          btn: "Save",
        },
        subDetailCategory: {
          title: "Add Detail Subcategory",
          btn: "Add",
        },
        editSubDetailCategory: {
          title: "Edit Detail Subcategory",
          btn: "Save",
        },
      },
    };
  },
  methods: {
    ...mapMutations("management", ["toggleCallApi", "closeModal"]),
    onChange() {
      if (this.$refs.pictureInput.file) {
        this.formGroup.image = this.$refs.pictureInput.file;
      } else {
        console.log("Old browser. No support for Filereader API");
        this.formGroup.image = null;
      }
    },
    selectedColor(color) {
      this.formGroup.color = color;
      this.isColor = false;
    },
    submitForm() {
      switch (this.getTypeModal) {
        case this.listType.TYPE_CATEGORY:
          this.somethingApi("postCategories", {
            description: this.formGroup.description,
            name: this.formGroup.name,
            color: this.formGroup.color,
          });
          break;
        case this.listType.TYPE_SUB_CATEGORY:
          this.somethingApi(
            "postListSubCategories",
            {
              description: this.formGroup.description,
              name: this.formGroup.name,
              multipartFile: this.getValueImage,
            },
            { categoryId: this.getIdClone }
          );
          break;
        case this.listType.TYPE_SUB_DETAIL_CATEGORY:
          this.somethingApi(
            "postDetailSubCategories",
            {
              description: this.formGroup.description,
              name: this.formGroup.name,
              multipartFile: this.getValueImage,
            },
            { subCategoryId: this.getIdClone }
          );
          break;
        case this.listType.TYPE_EDIT_CATEGORY:
          this.somethingApi(
            "putCategories",
            {
              description: this.formGroup.description,
              name: this.formGroup.name,
              color: this.formGroup.color,
            },
            { id: this.getIdClone }
          );
          break;
        case this.listType.TYPE_EDIT_SUB_CATEGORY:
          this.somethingApi(
            "putListSubCategories",
            {
              description: this.formGroup.description,
              name: this.formGroup.name,
              multipartFile: this.getValueImage,
            },
            { categoryId: this.paramsRouter, id: this.getIdClone }
          );
          break;
        case this.listType.TYPE_EDIT_SUB_DETAIL_CATEGORY:
          this.somethingApi(
            "putDetailSubCategories",
            {
              description: this.formGroup.description,
              name: this.formGroup.name,
              multipartFile: this.getValueImage,
            },
            {
              subCategoryId: this.formGroup.subCategoryId,
              detailSubCategoryId: this.getIdClone,
            }
          );
          break;
      }
    },
    actionCloseModal() {
      this.closeModal();
    },
    async somethingApi(mappingApi, payload, params = null) {
      var isPutApi = false;
      const formData = new FormData();

      if (payload.multipartFile) {
        isPutApi = true;
        for (const key in payload) {
          formData.append(key, payload[key]);
        }
      }
      const payloadApi = isPutApi
        ? { formData, ...params }
        : { ...payload, ...params };
      try {
        this.isDisable = true;
        const res = await api(mappingApi, payloadApi);
        if (!res.success) {
          throw new Error("An error occurred.");
        }
        this.$notify({
          group: "foo",
          title: "Success",
          text: `Successfully update`,
          type: "success",
        });
        this.actionCloseModal();
        this.toggleCallApi();
        this.isDisable = false;
      } catch (err) {
        this.$notify({
          group: "foo",
          title: "error",
          text: `${err.message}`,
          type: "error",
        });
      }
    },
    bindingFormGroup() {
      this.formGroup = Object.assign(this.formGroup, this.getContentClone);
    },
  },
  computed: {
    ...mapGetters("management", [
      "getTypeModal",
      "getIdClone",
      "getContentClone",
    ]),
    hasFileInput() {
      return (
        this.getTypeModal === this.listType.TYPE_SUB_CATEGORY ||
        this.getTypeModal === this.listType.TYPE_EDIT_SUB_CATEGORY ||
        this.getTypeModal === this.listType.TYPE_SUB_DETAIL_CATEGORY ||
        this.getTypeModal === this.listType.TYPE_EDIT_SUB_DETAIL_CATEGORY
      );
    },
    getValueImage() {
      var typeImage = typeof this.formGroup.image;
      return !this.formGroup.image || typeImage === "string"
        ? new File([""], this.formGroup.image, { type: "image/png" })
        : this.formGroup.image;
    },
    getOpacityImage() {
      return {
        opacity:
          !this.formGroup.image || typeof this.formGroup.image === "object"
            ? "1"
            : "0",
      };
    },
    getShowImagePreview() {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return !!pattern.test(this.formGroup.image);
    },
  },
  created() {
    this.bindingFormGroup();
  },
  watch: {
    $route: function (to, _) {
      this.paramsRouter = to.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  border-color: #ed5d5d;
  border-width: 2px;
  background-color: rgba($color: #ed5d5d, $alpha: 0.08);
  @apply rounded-md;
}
.error::placeholder {
  color: #ed5d5d;
}
.text-error {
  color: #ed5d5d;
  @apply h-5 w-full ml-8 mt-2;
}
.errorDate {
  background-color: #ed5d5d;
}
.error:focus {
  outline: none;
  border-color: #ed5d5d im !important;
  border-width: 2px;
  outline-offset: none !important;
  box-shadow: none !important;
}

.title-form {
  @apply font-bold text-xl ml-8 mr-12 pb-2 border-b-2 border-primary-1 mb-4;
}
.container-color {
  background-color: white;
  border: 1px solid gray;
  bottom: -231%;
  right: -30%;
  @apply absolute rounded-lg;
}
.color-container {
  width: 10vw;
  height: 22vh;
  @apply rounded-xl flex flex-wrap justify-around;
}
.box-upload {
  border: 1px solid rgba($color: #2c3e50, $alpha: 0.6);
  border-radius: 5px;
}
.overlay {
  position: fixed;
  right: 0;
  top: 0%;
  width: 120vw;
  height: 120vh;
  background-color: rgba($color: #000, $alpha: 0.4);
  z-index: 99;
}
.box-modal {
  width: 25vw;
  background-color: white;
  position: fixed;
  z-index: 99999999999;
  top: 14%;
  left: 37%;
  @apply rounded-xl flex-col flex;
}
.box-color {
  @apply w-16 h-6 cursor-pointer rounded-md;
}

.text-invalid {
  @apply h-6 flex justify-center text-error w-full ml-8 mt-2;
}

.btn-submit {
  @apply mx-8 mt-4 mb-8 w-full;
}

.exit-icon {
  @apply m-1 cursor-pointer hover:text-black;
}

.image-preview-form {
  width: 12.5rem;
  height: 12.5rem;
  max-width: 12.5rem;
  max-height: 12.5rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
<style>
.preview-container {
  width: 12.5rem !important;
  height: 12.5rem !important;
  max-width: 12.5rem !important;
  max-height: 12.5rem !important;
}
.picture-preview {
  width: 12.5rem !important;
  height: 12.5rem !important;
}
.picture-inner {
  top: -12.5rem !important;
}
</style>
