<template>
  <div class="container">
    <div class="deck card" @click="takeCard">
      <div class="card__back"></div>
    </div>

    <transition-group
      name="hand-card"
      tag="div"
      :css="false"
      @enter="enter"
      @leave="leave"
      class="hand"
    >
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        class="hand__card card"
        :class="['card--' + card.suit.name]" 
        @click="dropCard(card.id)"
      >
        <div class="card__face">
          <!-- Renders the top-left and bottom-right rank text (6,7, etc.) -->
          <div
            class="card__value"
            v-for="i in 2"
            :data-value="card.value"
            :data-suit="card.suit.name"
          ></div>

          <!-- Replace suit text with an image -->
          <div class="card__suit">
            <img
              :src="card.suit.icon"
              :alt="card.suit.name"
              style="max-height: 1em;"
            />
          </div>
        </div>
        <div class="card__back"></div>
      </div>
    </transition-group>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";

const SETTLE_DURATION = 100;
const DROP_DURATION = 200;
const CARDS_AMOUNT = 4;

// 1) Define SUITS as an array of objects with `name` + `icon` paths:
const SUITS = [
  { name: "React",   icon: "/techstack/react.svg" },
  { name: "Vue",   icon: "/techstack/vue.svg" },
  { name: "Node", icon: "/techstack/node.svg" },
  { name: "Docker",    icon: "/techstack/docker.svg" },
  { name: "Git",    icon: "/techstack/git.svg" },
  { name: "Aws",    icon: "/techstack/amazon.svg" },
  { name: "Js",    icon: "/techstack/js.svg" },
];

// Keep the same VALUES array if you only want suit images, not rank images
const VALUES = ["10", "J", "Q", "K", "A"];

// 2) Generate the deck so that each card.suit is an object containing { name, icon }
const CARDS = VALUES.flatMap((value, i) =>
  SUITS.map((suit, j) => ({
    id: `${i}-${j}`,
    value,
    suit,
  }))
);

const cards = ref([]);
const isDeckEnabled = ref(true);

// Transition hooks remain the same
function enter(el, done) {
  el.classList.add("hand__card--enter", "hand__card--flipped");
  el.style.pointerEvents = "none";

  setTimeout(() => {
    el.addEventListener(
      "transitionend",
      () => {
        el.style.pointerEvents = "all";
        done();
      },
      { once: true }
    );
    el.classList.remove("hand__card--enter");
  }, 0);
}

function leave(el, done) {
  isDeckEnabled.value = false;
  el.classList.add("hand__card--leave");
  el.classList.remove("hand__card--flipped");

  const onLeave = () => {
    el.removeEventListener("transitionend", onLeave);
    isDeckEnabled.value = true;
    setTimeout(done, SETTLE_DURATION);
  };

  el.addEventListener("transitionend", onLeave, false);
}

// Deal a card from deck to hand
function takeCard() {
  if (!isDeckEnabled.value) return;

  if (cards.value.length === CARDS_AMOUNT) {
    cards.value.shift(); // remove oldest card if at max capacity
  }
  const randomIndex = Math.floor(Math.random() * CARDS.length);
  cards.value.push(...CARDS.splice(randomIndex, 1));
}

// Drop a card from the hand back to the deck
function dropCard(id) {
  const dropIndex = cards.value.findIndex((card) => card.id === id);
  if (dropIndex !== -1) {
    CARDS.push(...cards.value.splice(dropIndex, 1));
  }
}

// Auto-deal on mount
onMounted(() => {
  let amount = 0;
  const intervalId = setInterval(() => {
    if (amount++ === CARDS_AMOUNT) {
      clearInterval(intervalId);
      return;
    }
    takeCard();
  }, DROP_DURATION);
});
</script>

<style>
html {
  --card-width: 20vmin;
  --card-height: calc(var(--card-width) * 1.6);
  --color-table: #228de4;
  --color-card-face: #ecebf3;
  --color-card-back: #920114;
  --color-suits-black: #0c120c;
  --color-suits-red: #c20114;
  --color-deck-shadow: #401111;
  font-family: Georgia, serif;
}

html,
body {
  width: 100%;
  min-height: 100%;
}

body {
  margin: 0;
  
  display: flex;
  flex-flow: column;
  align-items: center;
}

.container {
  background: var(--color-table);
  display: flex;
  flex-flow: column;
  align-items: center;
  flex: 1;
  padding-bottom: 10vmax;
  justify-content: center;
}

.card {
  font-size: calc(var(--card-width) / 5);
  position: relative;
  cursor: pointer;
  display: block;
  width: var(--card-width);
  height: var(--card-height);
  transform-style: preserve-3d;
  backface-visibility: visible;
  perspective: 100px;
}

.card--Node,
.card--Vue {
  color: #42b983;
}

.card--React,
.card--Docker {
  color: #085c73;
}
.card--Git,
.card--Aws {
  color: #FF9900;
}

.card__face,
.card__back {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 0.4em;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
  backface-visibility: hidden;
  transition: box-shadow 600ms ease-out;
}

.card__back {
  transform: rotate3d(0, 1, 0, 0deg);
  background-color: var(--color-card-back);
  background-image:
    repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3) 10%,
      transparent 0%,
      transparent 20%
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3) 10%,
      transparent 0%,
      transparent 20%
    );
  background-position: center center;
}

.card__face {
  padding: 0.5em;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transform: rotate3d(0, 1, 0, 180deg);
  background: var(--color-card-face);
}

.card__suit {
  font-size: 2.5em;
}

.card__value {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.2em;
  display: flex;
  flex-flow: column;
  align-items: center;
  transform: scale(-1);
  line-height: 1;
}

.card__value:first-of-type {
  bottom: auto;
  right: auto;
  top: 0;
  left: 0;
  transform: none;
}

.card__value::before {
  content: attr(data-value);
}

.card__value::after {
  font-size: 0.7em;
  content: attr(data-suit);
}

.deck.card {
  transform: rotate3d(0, 1, 0, 0deg);
}

.deck.card .card__back {
  box-shadow:
    0 6px 0 0 var(--color-deck-shadow),
    2px 6px 16px 0 rgba(0, 0, 0, 0.6);
}

.hand {
  position: relative;
  width: calc(
    var(--card-width) * 5.5
  ); /* Because $cards-amount=4 => 4+1.5=5.5 */
  height: var(--card-height);
  perspective: 1000px;
  perspective-origin: 50% 100%;
}

.hand__card {
  --base-offset-y: 20%;
  --rotation-x-ratio: 0;
  --translate-z: 100px;
  --translate-y: 0%;
  --rotation-z: 0deg;
  position: absolute;
  top: 0;
  transform: translate3d(
      -50%,
      calc(var(--base-offset-y) + var(--translate-y)),
      var(--translate-z)
    )
    rotate3d(var(--rotation-x-ratio), 1, 0.1, var(--rotation-z));
  transition: all 620ms ease-out;
  will-change: left, top, transform;
}

.hand__card:hover {
  --translate-z: 150px;
}

.hand__card--flipped {
  --rotation-z: 180deg;
}

.hand__card--enter.hand__card:nth-child(n):nth-last-child(n),
.hand__card--leave.hand__card:nth-child(n):nth-last-child(n) {
  --base-offset-y: 0%;
  --rotation-z: 0deg;
  --rotation-x-ratio: 0;
  --translate-y: 0%;
  --translate-z: 0px;
  left: 50%;
  top: -100%;
  pointer-events: none;
}

.hand__card--enter.hand__card:nth-child(n):nth-last-child(n) .card__face,
.hand__card--enter.hand__card:nth-child(n):nth-last-child(n) .card__back,
.hand__card--leave.hand__card:nth-child(n):nth-last-child(n) .card__face,
.hand__card--leave.hand__card:nth-child(n):nth-last-child(n) .card__back {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}

.hand__card--enter {
  transition: none;
  z-index: 1;
}

.hand__card--leave {
  z-index: 1;
}

/* 
     The following ruleset expands the SCSS loops:
     @for $i from 1 through 5 { ... } for $j from 1 through $amount ...
     (since $cards-amount = 4)
  */

/* i=1; amount=1; shift=0; step=50% */
.hand__card:nth-child(1):nth-last-child(1) {
  left: 50%;
}

/* i=2; amount=2; shift=0; step=33.3333...% */
.hand__card:nth-child(1):nth-last-child(2) {
  --translate-y: 10%;
  --rotation-x-ratio: 0.1;
  left: 33.3333%;
}
.hand__card:nth-child(2):nth-last-child(1) {
  --translate-y: 10%;
  --rotation-x-ratio: -0.1;
  left: 66.6667%;
}

/* i=3; amount=3; shift=0; step=25% */
.hand__card:nth-child(1):nth-last-child(3) {
  --translate-y: 10%;
  --rotation-x-ratio: 0.1;
  left: 25%;
}
.hand__card:nth-child(2):nth-last-child(2) {
  left: 50%;
}
.hand__card:nth-child(3):nth-last-child(1) {
  --translate-y: 10%;
  --rotation-x-ratio: -0.1;
  left: 75%;
}

/* i=4; amount=4; shift=0; step=20% */
.hand__card:nth-child(1):nth-last-child(4) {
  --translate-y: 10%;
  --rotation-x-ratio: 0.1;
  left: 20%;
}
.hand__card:nth-child(2):nth-last-child(3) {
  --rotation-x-ratio: 0.05;
  left: 40%;
}
.hand__card:nth-child(3):nth-last-child(2) {
  --rotation-x-ratio: -0.05;
  left: 60%;
}
.hand__card:nth-child(4):nth-last-child(1) {
  --translate-y: 10%;
  --rotation-x-ratio: -0.1;
  left: 80%;
}

/* i=5; amount=4; shift=1; step=20% */
.hand__card:nth-child(2):nth-last-child(4) {
  --translate-y: 10%;
  --rotation-x-ratio: 0.1;
  left: 20%;
}
.hand__card:nth-child(3):nth-last-child(3) {
  --rotation-x-ratio: 0.05;
  left: 40%;
}
.hand__card:nth-child(4):nth-last-child(2) {
  --rotation-x-ratio: -0.05;
  left: 60%;
}
.hand__card:nth-child(5):nth-last-child(1) {
  --translate-y: 10%;
  --rotation-x-ratio: -0.1;
  left: 80%;
}
</style>
