<script setup lang="ts">
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
  <div @click="handleGrid">
    <img v-if="props.symbol" :src="props.symbol" alt="symbol" />
  </div>
</template>
<style scoped></style>
