<script setup lang="ts">
import { IGrid } from "../models/IGrid";
import Grid from "./Grid.vue";

interface IBoard {
  gridList: IGrid[];
}

defineProps<IBoard>();

defineEmits<{
  (e: "handleGrid", id: number): void;
}>();
</script>
<template>
  <div id="board">
    <Grid
      v-for="(grid, index) in 9"
      :key="index"
      :id="index"
      @handleGrid="(id: number) => { $emit('handleGrid', id) }"
    ></Grid>
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
