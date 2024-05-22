<script setup lang="ts">
import { IGrid } from "../models/IGrid";

import Grid from "./Grid.vue";

interface IBoard {
  gridList: IGrid[];
}

const props = defineProps<IBoard>();

const emit = defineEmits<{
  (e: "handleGrid", id: number, symbol: string): void;
  (e: "handleWinner", winner: string): void;
}>();

const winPatterns: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWin = (): boolean => {
  for (const pattern of winPatterns) {
    const [first, second, third] = pattern;
    const box1 = props.gridList[first];
    const box2 = props.gridList[second];
    const box3 = props.gridList[third];

    if (
      (box1.symbol === "X" && box2.symbol === "X" && box3.symbol === "X") ||
      (box1.symbol === "O" && box2.symbol === "O" && box3.symbol === "O")
    ) {
      emit("handleWinner", box1.symbol);
      return true;
    }
  }

  return false;
};
</script>
<template>
  <div id="board">
    <Grid
      v-for="grid in gridList"
      :key="grid.id"
      :id="grid.id"
      :symbol="grid.symbol"
      :checked="grid.checked"
      @handleGrid="(id: number, symbol: string) => { $emit('handleGrid', id, symbol), checkForWin() }"
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
