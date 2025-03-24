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
    New game
  </button>
</template>
<style scoped>
#restartButton {
  width: 200px;
  padding: 1.2em;
}
</style>
