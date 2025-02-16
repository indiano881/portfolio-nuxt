<template>
  <div>
    <div>
      <h1>
      I’m a front-end developer driven by the challenge of solving complex
      problems and creating engaging, visually appealing web experiences
    </h1>
    <h1>INTERNAZIONALIZATION + CONTINUE ON THE POKER THEME !</h1>
    </div>
    <Dealer />
    <CardShuffled />
  
    <div>
        <button @click="setLocale('en')">en</button>
        <button @click="setLocale('se')">se</button>
        <button @click="setLocale('it')">it</button>
        <p>{{ $t("welcome") }}</p>
    </div>
  </div>
</template>
<script setup>
const { setLocale } = useI18n();
import CardShuffled from "~/components/CardShuffled.vue";
const isAngry = ref(false);
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
  isAngry.value = !isAngry.value;
  console.log(isAngry.value);
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
