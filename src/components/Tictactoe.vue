<script setup lang="ts">
import { ref } from "vue";
import Players from "./Players.vue";
import { IBoard } from "../models/IBoard";
import Gridlist from "./Gridlist.vue";
import { Player } from "../models/Player";
import Clearboard from "./Clearboard.vue";

const boardState = ref<IBoard>({
  gridList: [],
});

const initialGridList = () => {
  for (let i = 0; i < 9; i++) {
    boardState.value.gridList.push({
      id: i,
      symbol: "",
      checked: false,
    });
  }
};

initialGridList();

const playerXState = ref<Player>(
  new Player("", true, false, Math.floor(Math.random() * 2) + 1)
);
const playerOState = ref<Player>(
  new Player("", false, true, Math.floor(Math.random() * 2) + 1)
);

const playerCount = ref<number>(0);

const addPlayers = (playerName: string) => {
  playerCount.value++;
  if (playerCount.value === 1) {
    playerXState.value.name = playerName;
    console.log(playerXState.value.start);

    if (playerXState.value.start === 1) {
      console.log("Player X starts");
    } else {
      console.log("Player O starts");
    }
  } else if (playerCount.value === 2) {
    playerOState.value.name = playerName;
    console.log(playerOState.value.start);

    while (true) {
      playerOState.value.start = Math.floor(Math.random() * 2) + 1; //
      if (playerOState.value.start !== playerXState.value.start) {
        break;
      }
    }
    console.log(playerOState.value.start);
  }
};

let winner = ref<boolean>(false);
let winningPlayer = ref<string>("");

const checkForWinner = (winnerSymbol: string) => {
  if (!winner.value) {
    if (playerXState.value.x && winnerSymbol === "X") {
      winningPlayer.value = playerXState.value.name + " won!";
      console.log(winningPlayer.value);
    } else {
      winningPlayer.value = playerOState.value.name + " won!";
      console.log(winningPlayer.value);
    }
    winner.value = true;
  }
};

let countState = ref<number>(0);

const gridClick = (id: number, symbol: string) => {
  const gridItem = boardState.value.gridList.find((item) => item.id === id);
  console.log(id);
  console.log(boardState.value.gridList);

  if (boardState.value.gridList[id].checked === true || winner.value === true) {
    return;
  }

  if (gridItem) {
    countState.value++;

    if (playerXState.value.start === 1) {
      if (countState.value % 2 === 1) {
        symbol = "/src/assets/x-solid.svg";
      } else {
        symbol = "/src/assets/o-solid.svg";
      }
    } else {
      if (countState.value % 2 === 1) {
        symbol = "/src/assets/o-solid.svg";
      } else {
        symbol = "/src/assets/x-solid.svg";
      }
    }
  }

  boardState.value.gridList[id].symbol = symbol;
  boardState.value.gridList[id].checked = true;
  console.log(boardState.value.gridList);
};

const restartGame = () => {
  console.log("restart game");
  boardState.value.gridList.forEach((grid) => {
    grid.symbol = "";
    grid.checked = false;
  });

  winningPlayer.value = "";
  winner.value = false;
  countState.value = 0;

  playerXState.value.start = Math.random() < 0.5 ? 1 : 2;
};
</script>

<template>
  <header>
    <h1>Tic Tac Toe</h1>
  </header>

  <section id="nameContainer">
    <Players v-if="playerCount < 2" @addPlayer="addPlayers"></Players>
    <section id="nameDisplay">
      <p class="playerX">Player <b>X</b> : {{ playerXState.name }}</p>
      <p class="playerO">Player <b>O</b> : {{ playerOState.name }}</p>
    </section>

    <section v-if="playerCount === 2">
      <h2 v-if="winner">
        {{ winningPlayer }}
      </h2>
      <h2
        v-else-if="!winner && boardState.gridList.every((item) => item.checked)"
      >
        It's a tie!
      </h2>
      <h2 v-else-if="playerXState.start === 1">
        {{ playerXState.name + " " + "starts!" }}
      </h2>
      <h2 v-else-if="playerOState.start === 1">
        {{ playerOState.name + " " + "starts!" }}
      </h2>
    </section>
  </section>

  <section class="boardContainer" v-if="playerCount === 2">
    <Gridlist
      :gridList="boardState.gridList"
      @handleGrid="gridClick"
      @handleWinner="checkForWinner"
    ></Gridlist>

    <section
      class="restartSection"
      v-if="boardState.gridList.every((item) => item.checked) && !winner"
    >
      <Clearboard
        :gridList="boardState.gridList"
        @handleRestart="restartGame"
      ></Clearboard>
    </section>

    <section class="restartSection" v-else-if="winner">
      <Clearboard
        :gridList="boardState.gridList"
        @handleRestart="restartGame"
      ></Clearboard>
    </section>
  </section>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 80px;
  border-bottom: solid black 1px;
}

#nameContainer {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 50%;

  #nameDisplay {
    position: relative;
    width: 100%;
    height: 30px;

    .playerX {
      position: absolute;
      left: 150px;
    }

    .playerO {
      position: absolute;
      right: 150px;
    }
  }
}

.boardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  width: 100%;
  height: 100%;
}

.restartSection {
  padding: 1em;
}
</style>
