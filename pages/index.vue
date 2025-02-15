<template>
  <div>
    <h1>
      I’m a front-end developer driven by the challenge of solving complex
      problems and creating engaging, visually appealing web experiences
    </h1>
    <h1>INTERNAZIONALIZATION + CONTINUE ON THE POKER THEME !</h1>
    <div class="max-w-sm mx-auto">
      <div class="relative aspect-square ">
        <img src="/casino/dealer.svg"  alt="Davide" class="absolute inset-0 w-full h-full object-contain z-10 " style="top: 0%;left: 0%;width: 70%;"/>
        <!-- Right eye -->
        <img src="/eye.svg" alt="eye"class="absolute z-20"style="top: 0%;left: -15%;width: 100%;" :style="{transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`  }"/>
        <!-- Left eye -->
        <img src="/eye.svg" alt="eye" class="absolute z-20" style="top: 0%; left: -25%; width: 100%; " :style="{transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`  }"/>
        <!-- nose -->
        <img src="/nose3.svg" alt="nose3" class="absolute z-20 w-[20px]" style="top: 43%; left: 32%; width: 6%;" @click="()=>console.log('click')"/>
        <!-- mouth -->
        <img src="/mouth.svg" alt="mouth" class="absolute z-20 w-[20px]" style="top: 41%; left: 20%; width: 30%;" />
      </div>
    </div>
  </div>
</template>
<script setup>
const eyeOffsetX = ref(0)
const eyeOffsetY = ref(0)

// Mouse move handler
const handleMouseMove = (e) => {
  // 1) Decide on the "center" of motion.
  //    Here, use the window center. 
  //    For a container-based approach, see "Centering on a container" below.
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  // 2) Calculate how far the mouse is from this center
  const offsetX = e.clientX - centerX
  const offsetY = e.clientY - centerY

  // 3) Scale down the movement so the eye only moves slightly
  const ratio = 0.02
  eyeOffsetX.value = offsetX * ratio
  eyeOffsetY.value = offsetY * ratio
}

// Attach the event listener when component mounts
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

// Clean up when component unmounts
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>
