<script setup lang="ts">
import { ref } from "vue";
import { IGrid } from "../models/IGrid";

//skapa komponent för reset knapp
//behöver bara props från Tictactoe.vue???

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
  <button :showButton="restartButton" @click="handleRestart">
    Restart game
  </button>
</template>
<style scoped></style>
