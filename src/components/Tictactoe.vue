<script setup lang="ts">
import { ref } from "vue";
import Players from "./Players.vue";
import { IBoard } from "../models/IBoard";

const boardState = ref<IBoard>({
  gridList: [],
});

const playerX = ref<string>("");

const playerO = ref<string>("");

const playerCount = ref<number>(0);

const addPlayers = (playerName: string) => {
  playerCount.value++;
  if (playerCount.value === 1) {
    playerX.value = playerName;
  } else if (playerCount.value === 2) {
    playerO.value = playerName;
  }
};
</script>

<template>
  <Players @addPlayer="addPlayers"></Players>
  <div>
    <p>Player X: {{ playerX }}</p>
    <p>Player O: {{ playerO }}</p>
  </div>
</template>

<style scoped></style>
