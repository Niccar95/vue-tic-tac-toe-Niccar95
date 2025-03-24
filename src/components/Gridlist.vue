<script setup lang="ts">
import { IGrid } from "../models/IGrid";
import Grid from "./Grid.vue";
import xSolid from "/x-solid.svg";
import oSolid from "/o-solid.svg";

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
      (grid1.symbol === xSolid &&
        grid2.symbol === xSolid &&
        grid3.symbol === xSolid) ||
      (grid1.symbol === oSolid &&
        grid2.symbol === oSolid &&
        grid3.symbol === oSolid)
    ) {
      emit("handleWinner", grid1.symbol === xSolid ? "X" : "O");
      return true;
    }
  }

  return false;
};
</script>
<template>
  <div id="board">
    <Grid
      v-for="grid in props.gridList"
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
  width: 100%;
  height: 370px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom right, #dd5746, #ffffff, #dd5746);
  
  
  @media (min-width: 1024px) {
    width: 500px;
    height: 500px;
  }

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
