<template>
  <div>
    <h1>
      I’m a front-end developer driven by the challenge of solving complex
      problems and creating engaging, visually appealing web experiences
    </h1>
    <h1>INTERNAZIONALIZATION + CONTINUE ON THE POKER THEME !</h1>
    <div class="max-w-sm mx-auto">
      <div
        class="relative aspect-square"
        :style="{ transform: `rotate(${-eyeOffsetX * 0.5}deg)` }"
      >
        <img
          src="/casino/dealer.svg"
          alt="Davide"
          class="absolute inset-0 w-full h-full object-contain z-10"
          style="top: 0%; left: 0%; width: 70%"
        />
        <!--eyebrowl left-->
        <img
          src="/eyebrow.svg"
          alt="eye"
          class="absolute z-20"
          style="top: 31%; left: 25%; width: 10%"
          :style="{
            transform: `translate(${0}px, ${eyeOffsetY}px) rotateY(180deg)`,
          }"
        />
        <!--eyebrowl right-->
        <img
          src="/eyebrow.svg"
          alt="eye"
          class="absolute z-20"
          style="top: 31%; left: 35%; width: 10%"
          :style="{ transform: `translate(${0}px, ${eyeOffsetY}px) ` }"
        />
        <!-- Glasses -->
        <img
          src="/glasses2.svg"
          alt="eye"
          class="absolute z-20"
          style="top: 26%; left: 20%; width: 30%"
        />
        <!-- Left eye -->
        <img
          src="/eye.svg"
          alt="eye"
          class="absolute z-20"
          style="top: 8%; left: -15%; width: 80%"
          :style="{ transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)` }"
        />
        <!-- Right eye -->
        <img
          src="/eye.svg"
          alt="eye"
          class="absolute z-20"
          style="top: 8%; left: -4%; width: 80%"
          :style="{ transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)` }"
        />
        <!-- Nose (wrapped in a button) -->
        <button
          @click="handleClick"
          class="absolute z-30"
          style="
            top: 44%;
            left: 31%;
            width: 8%;
            background: transparent;
            border: none;
            cursor: pointer;
          "
        >
          <img src="/nose5.svg" alt="nose" class="w-full h-auto" />
        </button>

        <!-- mouth -->
        <img
          src="/mouth.svg"
          alt="mouth"
          class="absolute z-20 w-[20px]"
          style="top: 41%; left: 20%; width: 30%"
        />
        <!--anger nerve in the front-->
        <img
      v-show="isAngry"
      src="/anger.svg"
      alt="nerve"
      class="absolute z-20"
      style="top: 30%; left: 26%; width: 16px;"
    />
    
      </div>
    </div>
    <div>
      <CardShuffled />
    </div>
    <div>
    <div>
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('se')">se</button>
      <button @click="setLocale('it')">it</button>
      <p>{{ $t('welcome') }}</p>
    </div>
  </div>
  </div>
</template>
<script setup>
const { setLocale } = useI18n()
import CardShuffled from "~/components/CardShuffled.vue";
const isAngry= ref(false);
const eyeOffsetX = ref(0);
const eyeOffsetY = ref(0);

// Mouse move handler
const handleMouseMove = (e) => {
  // 1) Decide on the "center" of motion.
  //    Here, use the window center.
  //    For a container-based approach, see "Centering on a container" below.
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // 2) Calculate how far the mouse is from this center
  const offsetX = e.clientX - centerX;
  const offsetY = e.clientY - centerY;

  // 3) Scale down the movement so the eye only moves slightly
  const ratio = 0.015;
  eyeOffsetX.value = offsetX * ratio;
  eyeOffsetY.value = offsetY * ratio;
};
function handleClick() {
  isAngry.value= !isAngry.value;
  console.log(isAngry.value)
}
// Attach the event listener when component mounts
onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

// Clean up when component unmounts
onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>


