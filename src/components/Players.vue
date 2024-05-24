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
    <input placeholder="Type player name" type="text" v-model="userInput" />
    <button>Add player</button>
  </form>
</template>

<style scoped>
form {
  padding: 2em;

  input {
    border: none;
    width: 250px;
    padding: 1.2em;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  input:focus {
    border-color: crimson;
    box-shadow: 0 0 5px rgba(220, 20, 60, 0.5);
    outline: none;
  }
}
</style>
