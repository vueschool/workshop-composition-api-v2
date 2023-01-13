<script setup>
import { ref } from "vue";
import { onKeyPressed } from "@vueuse/core";

defineProps({
  src: String,
});

const playing = ref(false);

onKeyPressed(" ", (e) => {
  e.preventDefault();
  playing.value ? pause() : play();
});

const video = ref(null);

function play() {
  video.value.play();
  playing.value = true;
}

function pause() {
  video.value.pause();
  playing.value = false;
}
</script>
<template>
  <div class="relative video-wrapper">
    <video :src="src" ref="video" />
    <div
      v-if="video"
      class="controls absolute top-0 right-0 left-0 bottom-0 items-center justify-center flex"
    >
      <button @click="playing ? pause() : play()" class="p-2 text-6xl">
        {{ playing ? "⏸️" : "▶️" }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.controls {
  transition: 0.3s ease all;
  opacity: 0;
}
.video-wrapper:hover > .controls {
  opacity: 1;
}
</style>
