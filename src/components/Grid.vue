<script setup lang="ts">
import { Player } from "../models/Player";

//import { Player } from "../models/Player";

interface IGrid {
  id: number;
  symbol: string;
  checked: boolean;
}

const props = defineProps<IGrid>();

const emit = defineEmits<{
  (e: "handleGrid", id: number, symbol: string, checked: boolean): void;
}>();

const handleGrid = () => {
  emit("handleGrid", props.id, props.symbol, props.checked);
};
</script>
<template>
  <div @click="handleGrid">{{ props.symbol }}</div>
</template>
<style scoped></style>
