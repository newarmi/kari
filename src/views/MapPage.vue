<script setup lang="ts">
import {useStore} from "vuex";
import MapComponent from "../components/MapComponent.vue";
import {onMounted, ref, watch} from "vue";
import {gsap} from 'gsap';
import {IUpdateDataEvent} from "../store";

const blueLineRef = ref<SVGPathElement | null>(null)
const redLineRef = ref<SVGPathElement | null>(null)

const store = useStore()

store.getters.getChannel.addEventListener('message', ({data}: MessageEvent<IUpdateDataEvent>) => {
  store.dispatch('updateData', data)
})


const moveLine = (proc: number, ref: SVGPathElement) => {
  console.log(proc)
  const diff = 100 - proc
  gsap.to(ref, {
    strokeDasharray: `${proc}% ${diff}%`,
    duration: 5,
    ease: "power1.out"
  });
}

watch(() => store.getters.getBlueProc, (val: number) => {
  if (blueLineRef.value) {
    moveLine(val, blueLineRef.value)
  }

})
watch(() => store.getters.getRedProc, (val: number) => {
  if (redLineRef.value) {
    moveLine(val, redLineRef.value)
  }
})

onMounted(() => {
  gsap.set(blueLineRef.value, {
    strokeDasharray: `0 100%`,
  });
  gsap.set(redLineRef.value, {
    strokeDasharray: `0 100%`,
  });

  setTimeout(() => store.dispatch('updateDataLS'))
});

</script>

<template>
  <div>
    <MapComponent>
      <path ref="blueLineRef"
            d="M354 677C369 698.833 408.6 751.3 447 768.5C495 790 522.21 821.733 536 837C550 852.5 620 865 648 880.5C676 896 735.5 898.5 846.5 892C957.5 885.5 908.5 955.5 975 989.5C1041.5 1023.5 1406.5 946.5 1502 736.5"
            stroke="blue" stroke-width="3"/>
      <path
          ref="redLineRef"
          d="M354 677C369 698.833 408.6 751.3 447 768.5C495 790 522.21 821.733 536 837C550 852.5 620 865 648 880.5C676 896 735.5 898.5 846.5 892C957.5 885.5 908.5 955.5 975 989.5C1041.5 1023.5 1406.5 946.5 1502 736.5"
          stroke="red" stroke-width="3"
          transform="translate(0, 4)"
      />
    </MapComponent>


  </div>
</template>

<style scoped>

</style>
