<template>
  <div class="special relative">
    <NavigationMenu />
    <slot />
  </div>
</template>
<script setup></script>
<style>
.special {
  background: linear-gradient(to top, #09203f 0%, #537895 100%);
  height: 100vh;
}
</style>
