<template>
  <div>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
      @click.self.stop.prevent="toggleModal()"
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div class="flex flex-col p-1 rounded-t">
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black focus:outline-none"
              v-on:click="toggleModal()"
            >
              <span style="color: red"> × </span>
            </button>
            <div class="flex justify-center align-middle w-full">
              <img
                src="https://tek4.vn/wp-content/uploads/2021/02/icons8-javascript-480.png"
                width="80px;"
                height="80px"
                alt=""
              />
            </div>
            <div class="flex justify-center align-middle w-full">
              <span class="font-bold">JAVASCRIPT</span>
            </div>
          </div>
          <!--body-->
          <div class="w-full">
            <div class="m-4 border border-gray-700 rounded leading-loose">
              <div class="grid grid-cols-4 gap-4 w-full border-b border-black">
                <div class="col-span-2">
                  <p class="font-bold ml-4">Framework / Library</p>
                </div>
                <div class="flex justify-center font-bold">Year</div>
                <div class="flex justify-center font-bold">Level</div>
              </div>
              <ValidationObserver ref="observer">
                <div
                  class="grid grid-cols-4 gap-4 w-full border-b border-black"
                >
                  <div class="col-span-2"><p class="pr-2 ml-4">vuejs</p></div>
                  <div class="flex justify-center">
                    <input
                      type="text"
                      class="w-3/4 border-0 focus:outline-none text-center"
                      value="5"
                    />
                  </div>
                  <div class="flex justify-center W-1/2">
                    <label class="sr-only">A</label>
                    <select
                      class="focus:outline-none focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent sm:text-sm rounded-md"
                    >
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                </div>
              </ValidationObserver>
            </div>
          </div>

          <!--footer-->
          <div class="flex items-center justify-center p-6 rounded-b">
            <button
              class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleModal()"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  data() {
    return {
      titles: [
        { id: 1, text: "frameWork Name", value: "frameWorkName" },
        { id: 2, text: "year ", value: "year" },
        { id: 3, text: "score", value: "score" },
      ],
      formData: [
        {
          model: "",
          name: "year",
          type: "text",
          rule: "required|numeric",
        },
        {
          model: "",
          name: "score",
          type: "select",
          rule: "required|numeric",
        },
      ],
    };
  },

  props: {
    showModal: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    toggleModal: {
      type: Function,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
