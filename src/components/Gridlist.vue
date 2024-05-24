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
    const grid1 = props.gridList[first];
    const grid2 = props.gridList[second];
    const grid3 = props.gridList[third];

    if (
      (grid1.symbol === "/src/assets/x-solid.svg" &&
        grid2.symbol === "/src/assets/x-solid.svg" &&
        grid3.symbol === "/src/assets/x-solid.svg") ||
      (grid1.symbol === "/src/assets/o-solid.svg" &&
        grid2.symbol === "/src/assets/o-solid.svg" &&
        grid3.symbol === "/src/assets/o-solid.svg")
    ) {
      emit(
        "handleWinner",
        grid1.symbol === "/src/assets/x-solid.svg" ? "X" : "O"
      );
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
  height: 500px;
  width: 500px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom right, #dd5746, #ffffff, #dd5746);

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    background-color: white;
    transition: transform 0.2s ease-in-out;
  }

  div:hover {
    background: linear-gradient(
      to bottom right,
      rgb(235, 235, 235),
      white,
      rgb(235, 235, 235)
    );
    transform: scale(97%);
  }
}
</style>
