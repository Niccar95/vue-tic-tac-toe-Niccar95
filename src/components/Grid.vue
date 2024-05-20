<script setup lang="ts">
//import { Player } from "../models/Player";

interface IGrid {
  id: number;
}

const props = defineProps<IGrid>();

const emit = defineEmits<{
  (e: "handleGrid", id: number): void;
}>();

const handleGrid = () => {
  emit("handleGrid", props.id);
};
</script>
<template>
  <div @click="handleGrid"></div>
</template>
<style scoped></style>
