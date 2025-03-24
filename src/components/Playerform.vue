<script setup lang="ts">
import { ref } from "vue";

const userInput = ref<string>("");

let countInputs = ref<number>(0);

const emit = defineEmits<{
  (e: "addPlayer", text: string): void;
}>();

const handleSubmit = () => {
  if (userInput.value !== "") {
    emit("addPlayer", userInput.value);
    userInput.value = "";

    countInputs.value++;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      autofocus
      placeholder="Type player name"
      type="text"
      maxlength="15"
      v-model="userInput"
    />
    <button v-if="countInputs === 0">Add player X</button>
    <button v-if="countInputs >= 1">Add player O</button>
  </form>
</template>

<style scoped>
form {
  margin: 2em 0 2em 0;
  display: flex;

  input {
    border: none;
    padding: 1.2em;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s, box-shadow 0.3s;
    
    @media (min-width: 1024px) {
      width: 250px;
  }
  }

  input:focus {
    border-color: crimson;
    box-shadow: 0 0 5px rgba(220, 20, 60, 0.5);
    outline: none;
  }
}
</style>
