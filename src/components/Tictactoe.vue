<script setup lang="ts">
import { ref } from "vue";
import Players from "./Players.vue";
import { IBoard } from "../models/IBoard";
import Gridlist from "./Gridlist.vue";
import { Player } from "../models/Player";

const boardState = ref<IBoard>({
  gridList: [],
});

const playerX = ref<string>("");
const playerO = ref<string>("");

const playerXState = ref<Player>(new Player(true, false));
const playerOState = ref<Player>(new Player(false, true));

const currentPlayer = ref();

const playerCount = ref<number>(0);

const addPlayers = (playerName: string) => {
  playerCount.value++;
  if (playerCount.value === 1) {
    playerX.value = playerName;

    currentPlayer.value = playerXState.value;
    console.log(currentPlayer.value);
  } else if (playerCount.value === 2) {
    playerO.value = playerName;

    currentPlayer.value = playerOState.value;
    console.log(currentPlayer.value);
  }
};

const gridClick = (id: number) => {
  console.log(id);
};
</script>

<template>
  <Players @addPlayer="addPlayers"></Players>
  <div>
    <p>Player X: {{ playerX }}</p>
    <p>Player O: {{ playerO }}</p>
  </div>
  <div v-if="playerCount === 2">
    <Gridlist
      :gridList="boardState.gridList"
      @handleGrid="gridClick"
    ></Gridlist>
  </div>
</template>

<style scoped></style>