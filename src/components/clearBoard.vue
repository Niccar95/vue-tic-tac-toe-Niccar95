<script setup lang="ts">
import { ref } from "vue";
import { IGrid } from "../models/IGrid";

interface IBoard {
  gridList: IGrid[];
}

defineProps<IBoard>();

const emit = defineEmits<{
  (e: "handleRestart"): void;
}>();

const handleRestart = () => {
  emit("handleRestart");
};

const restartButton = ref<boolean>(false);
</script>
<template>
  <button id="restartButton" :showButton="restartButton" @click="handleRestart">
    Restart game
  </button>
</template>
<style scoped>
#restartButton {
  border: solid black;
  padding: 1em;
  font-weight: 500;
  background-color: #1a1a1a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: crimson;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
