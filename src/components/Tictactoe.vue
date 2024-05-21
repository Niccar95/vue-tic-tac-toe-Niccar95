<script setup lang="ts">
import { ref } from "vue";
import Players from "./Players.vue";
import { IBoard } from "../models/IBoard";
import Gridlist from "./Gridlist.vue";
import { Player } from "../models/Player";

const boardState = ref<IBoard>({
  gridList: [],
});

const initializeGridList = () => {
  for (let i = 0; i < 9; i++) {
    boardState.value.gridList.push({
      id: i,
      symbol: "",
      checked: false,
    });
  }
};

initializeGridList();

const playerXState = ref<Player>(
  new Player("", true, false, Math.floor(Math.random() * 2) + 1)
);
const playerOState = ref<Player>(
  new Player("", false, true, Math.floor(Math.random() * 2) + 1)
);

const playerCount = ref<number>(0);

const addPlayers = (playerName: string) => {
  playerCount.value++;
  if (playerCount.value === 1) {
    playerXState.value.name = playerName;
    console.log(playerXState.value);

    if (playerXState.value.start === 1) {
      console.log("Player X starts");
    } else {
      console.log("Player O starts");
    }
  } else if (playerCount.value === 2) {
    playerOState.value.name = playerName;
    console.log(playerOState.value);
  }
};

let countState = ref<number>(0);

const gridClick = (id: number, symbol: string) => {
  const gridItem = boardState.value.gridList.find((item) => item.id === id);
  console.log(id);
  console.log(boardState.value.gridList);

  if (boardState.value.gridList[id].checked === true) {
    return;
  }

  if (gridItem) {
    countState.value++;

    if (playerXState.value.start === 1) {
      if (countState.value % 2 === 1) {
        symbol = "X";
      } else {
        symbol = "O";
      }
    } else {
      if (countState.value % 2 === 1) {
        symbol = "O";
      } else {
        symbol = "X";
      }
    }
  }

  boardState.value.gridList[id].symbol = symbol;
  boardState.value.gridList[id].checked = true;
  console.log(boardState.value.gridList);
};

const resetButton = ref<boolean>(false);
</script>

<template>
  <Players v-if="playerCount < 2" @addPlayer="addPlayers"></Players>
  <div>
    <p>Player X: {{ playerXState.name }}</p>
    <p>Player O: {{ playerOState.name }}</p>

    <section v-if="playerCount === 2">
      <p v-if="playerXState.start === 1">
        {{ playerXState.name + " " + "starts!" }}
      </p>
      <p v-else="playerOState.start === 1">
        {{ playerOState.name + " " + "starts!" }}
      </p>
    </section>
  </div>
  <div v-if="playerCount === 2">
    <Gridlist
      :gridList="boardState.gridList"
      @handleGrid="gridClick"
    ></Gridlist>

    <div v-if="boardState.gridList.every((item) => item.checked)">
      <button :showButton="resetButton">Restart game</button>
    </div>
  </div>
</template>

<style scoped></style>
