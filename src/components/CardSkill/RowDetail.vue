<template>
  <div class="title-row">
    <div class="text-name-skill">
      <span v-tooltip.bottom="rowData.name">{{ rowData.name }}</span>
    </div>
    <div>
      <input
        type="text"
        name="exp"
        :value="getValueInput"
        @input="onChange"
        @keypress="onlyForCurrency"
        autocomplete="off"
      />
    </div>
    <div>
      <div
        class="overlay"
        v-if="isOverlay"
        @click="isOverlay = false"
        :style="getStyleSelect"
      ></div>
      <ul :id="getIdSelect">
        <li class="cursor-pointer ml-3" @click="toggleOverlay">
          <span class="level" :class="listLevel[level].classLevel">{{
            listLevel[level].label
          }}</span>
          <chevron-down-icon
            size="1.3x"
            class="custom-class"
          ></chevron-down-icon>
        </li>
        <li>
          <ul class="select-level" :style="getPosition" v-if="isOverlay">
            <option-level
              v-for="(value, level) in listLevel"
              :key="level"
              :selectedLevel="selectedLevel"
              :levelData="value"
              :level="level"
              v-show="level != select"
            >
            </option-level>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

//
<script>
import OptionLevel from "../CardSkill/OptionLevel.vue";
import listLevel from "../../constants/listLevel";

export default {
  components: {
    OptionLevel,
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    year: {
      required: true,
    },
    level: {
      required: true,
    },
    order: {
      required: true,
    },
  },
  data() {
    return {
      listLevel: listLevel,
      select: this.level,
      exp: this.year,
      isOverlay: false,
      mouseX: null,
      mouseY: null,
    };
  },
  methods: {
    toggleOverlay() {
      let x = document.getElementById(this.getIdSelect);
      this.isOverlay = !this.isOverlay;
      this.mouseX = this.getOffsetLeft(x) - 25;
      if (this.order <= 2) {
        this.mouseY = this.getOffsetTop(x) + x.clientHeight - 106;
      }
      if (this.order > 2) {
        this.mouseY =
          this.getOffsetTop(x) + x.clientHeight - 106 - (this.order - 2) * 37;
      }
    },
    selectedLevel(value) {
      this.select = value;
      this.isOverlay = false;
    },
    getOffsetLeft(elem) {
      let offsetLeft = 0;
      do {
        if (!isNaN(elem.offsetLeft)) {
          offsetLeft += elem.offsetLeft;
        }
      } while ((elem = elem.offsetParent));
      return offsetLeft;
    },
    getOffsetTop(elem) {
      let offsetTop = 0;
      do {
        if (!isNaN(elem.offsetTop)) {
          offsetTop += elem.offsetTop;
        }
      } while ((elem = elem.offsetParent));
      return offsetTop;
    },
    onChange(e) {
      const { value } = e.target;
      if (value === "-") {
        this.exp = "-";
      } else if (+value >= 1) {
        this.exp = +value;
      } else {
        this.exp = null;
      }
    },
    onlyForCurrency($event) {
      let pattern = /((-)|(^\d+\.{0,1}\d{0,0}$))/;
      if (!pattern.test(this.getValueInput)) {
        $event.preventDefault();
      }
    },
  },
  computed: {
    getPosition() {
      return { top: this.mouseY + "px", left: this.mouseX + "px" };
    },
    getIdSelect() {
      return `level-${this.rowData.id}-${Math.random()}`;
    },
    getValueInput() {
      return this.year === null ? "-" : this.year;
    },
    getStyleSelect() {
      return {
        top: this.mouseY - 400 + "px",
        left: 0 + "px",
      };
    },
  },
  watch: {
    select(value) {
      const id = this.rowData.listEmployeeSkills[0].id;
      const year = this.year === "-" ? null : this.year;
      const level = value === "null" || value === null ? null : +value;
      this.$emit("edit-detail", {
        id: this.rowData.id,
        listEmployeeSkills: [
          {
            id: id,
            year: year,
            level: level,
          },
        ],
      });
    },
    exp(value) {
      const id = this.rowData.listEmployeeSkills[0].id;
      const year = value === "-" || value === null ? null : value;
      const level =
        this.level === "null" || this.level === null ? null : +this.level;
      this.$emit("edit-detail", {
        id: this.rowData.id,
        listEmployeeSkills: [
          {
            id: id,
            year: year,
            level: level,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.5rem;
  border-color: #dcdcdc;
  @apply w-full py-2 text-center border-b items-center p-2 justify-between;
}

.text-name-skill {
  @apply text-left w-full truncate w-10;
}

.level {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  @apply font-bold p-1;
}

.overlay {
  width: 100vw;
  height: 200vh;
  min-width: 100vw;
  min-height: 200vh;
  z-index: 49;
  position: fixed;
}

input[type="number"],
input[type="text"] {
  -moz-appearance: none;
  @apply inline-block w-6 h-auto ml-4 bg-gray-300 text-center rounded-sm font-bold;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.select-level {
  box-shadow: 0px 1px 6px 0 #2e2e2e;
  @apply fixed rounded-sm mt-1 shadow-2xl z-50;
}

.not-border {
  @apply p-2 justify-between;
}

.type-s {
  --primary-color: #0079c4;
  background-color: rgba($color: #0079c4, $alpha: 0.2);
}
.type-a {
  --primary-color: #812991;
  background-color: rgba($color: #812991, $alpha: 0.2);
}
.type-b {
  --primary-color: #45d1d1;
  background-color: rgba($color: #45d1d1, $alpha: 0.2);
}
.type-c {
  --primary-color: #f9826c;
  background-color: rgba($color: #f9826c, $alpha: 0.2);
}
.type-d {
  --primary-color: #003993;
  background-color: rgba($color: #003993, $alpha: 0.2);
}
.type-null {
  --primary-color: #099b1c;
  background-color: rgba($color: #099b1c, $alpha: 0.2);
}
</style>
