<script setup lang="ts">
import { IGrid } from "../models/IGrid";

interface IBoard {
  gridList: IGrid[];
}

const emit = defineEmits<{
  (e: "handleGrid", id: number): void;
}>();

const props = defineProps<IBoard>();
</script>
<template>
  <div id="board">
    <div
      :class="grid"
      v-for="(grid, index) in (props.gridList, 9)"
      :key="index"
      @click="emit('handleGrid', index)"
    ></div>
  </div>
</template>
<style scoped>
#board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  border: solid white 1px;
  height: 400px;
  width: 400px;

  div {
    border: solid white 1px;
    cursor: pointer;
  }
}
</style>
