<script setup lang="ts">
import { ref } from "vue";

const userInput = ref<string>("");

const emit = defineEmits<{
  (e: "addPlayer", text: string): void;
}>();

const handleSubmit = () => {
  if (userInput.value !== "") {
    emit("addPlayer", userInput.value);
    userInput.value = "";
  }

  console.log(userInput.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="userInput" />
    <button>Add player name</button>
  </form>
</template>

<style scoped></style>
