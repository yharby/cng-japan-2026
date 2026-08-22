<script setup lang="ts">
const logo = `${import.meta.env.BASE_URL}carto-logo-positive.svg`
</script>

<template>
  <a href="https://carto.com/" target="_blank" rel="noopener noreferrer"
     class="carto-corner-logo" aria-label="Open the CARTO website in a new tab" @click.stop>
    <img :src="logo" alt="CARTO" />
  </a>
</template>

<style scoped>
.carto-corner-logo {
  position: absolute;
  z-index: 10;
  top: 0.82rem;
  right: 5.55rem;
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 1.05rem;
}

.carto-corner-logo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carto-corner-logo:focus-visible {
  border-radius: 2px;
  outline: 3px solid var(--c-portolan);
  outline-offset: 3px;
}
</style>

<style>
html.dark .carto-corner-logo img { filter: brightness(0) invert(1); }
</style>
