<script setup lang="ts">
import { ref } from "vue";
import { IBoard } from "../models/IBoard";
import Gridlist from "./Gridlist.vue";
import { Player } from "../models/Player";
import Playerform from "./Playerform.vue";
import xSolid from "/x-solid.svg";
import oSolid from "/o-solid.svg";
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
  new Player("", true, false, Math.floor(Math.random() * 2) + 1, 0)
);
const playerOState = ref<Player>(
  new Player("", false, true, Math.floor(Math.random() * 2) + 1, 0)
);

const playerCount = ref<number>(0);

const addPlayers = (playerName: string) => {
  playerCount.value++;
  if (playerCount.value === 1) {
    playerXState.value.name = playerName;
  } else if (playerCount.value === 2) {
    playerOState.value.name = playerName;

    while (true) {
      playerOState.value.start = Math.floor(Math.random() * 2) + 1; //
      if (playerOState.value.start !== playerXState.value.start) {
        break;
      }
    }
  }
};

let winner = ref<boolean>(false);
let winningPlayer = ref<string>("");

const checkForWinner = (winnerSymbol: string) => {
  if (!winner.value) {
    if (playerXState.value.x && winnerSymbol === "X") {
      winningPlayer.value = playerXState.value.name + " won!";
      playerXState.value.score++;
    } else {
      winningPlayer.value = playerOState.value.name + " won!";
      playerOState.value.score++;
    }
    winner.value = true;
  }
};

let countState = ref<number>(0);

const gridClick = (id: number, symbol: string) => {
  const gridItem = boardState.value.gridList.find((item) => item.id === id);

  if (boardState.value.gridList[id].checked === true || winner.value === true) {
    return;
  }

  if (gridItem) {
    countState.value++;

    if (playerXState.value.start === 1) {
      if (countState.value % 2 === 1) {
        symbol = xSolid;

        console.log(symbol);
      } else {
        symbol = oSolid;

        console.log(symbol);
      }
    } else {
      if (countState.value % 2 === 1) {
        symbol = oSolid;
      } else {
        symbol = xSolid;
      }
    }
  }

  boardState.value.gridList[id].symbol = symbol;
  boardState.value.gridList[id].checked = true;
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

  while (true) {
    playerOState.value.start = Math.floor(Math.random() * 2) + 1;
    if (playerOState.value.start !== playerXState.value.start) {
      break;
    }
  }
};
</script>

<template>
  <header>
    <h1>Tic Tac Toe</h1>
  </header>

  <section id="nameContainer">
    <Playerform v-if="playerCount < 2" @addPlayer="addPlayers"></Playerform>
    <section id="nameDisplay">
      <p class="playerX"><b>X</b> : {{ playerXState.name }}</p>
      <p class="playerO"><b>O</b> : {{ playerOState.name }}</p>
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

    <section class="scoreSection">
      <b>
        <p>{{ playerXState.score }}</p>
      </b>
      <p>Score</p>

      <b>
        <p>{{ playerOState.score }}</p>
      </b>
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
      <Clearboard :gridList="boardState.gridList" @handleRestart="restartGame">
      </Clearboard>
    </section>

    <section class="restartSection" v-else-if="winner">
      <Clearboard :gridList="boardState.gridList" @handleRestart="restartGame">
      </Clearboard>
    </section>
  </section>
</template>

<style scoped>
header {
  position: fixed;
  background-color: white;
  z-index: 2;
  width: 80%;
  top: 30px;
  border-bottom: solid black 1px;
  
  @media (min-width: 1024px) {
    top: 0;
    width: 40%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

#nameContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 110px;
  gap: 0.2em;
  
  @media (min-width: 1024px) {
    width: 50%; 
    margin-top: 80px;
  }

  #nameDisplay {
    position: relative;
    width: 100%;
    height: 30px;
    
    .playerX {
      position: absolute;
      left: 80px;

      @media (min-width: 768px) {
        left: 150px;
      }
    }

    .playerO {
      position: absolute;
      right: 80px;

      @media (min-width: 768px) {
        right: 150px;
      }
    }
  }

  .scoreSection {
    width: 70%;
    display: flex;
    justify-content: space-around;
    border: solid black 1px;

    @media (min-width: 1024px) {
        width: 60%;
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
  margin-top: 2rem;
  
  @media (min-width: 1024px) {
    margin-top: 1rem;
  }
}

</style>
