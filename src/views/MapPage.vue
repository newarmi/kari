<script setup lang="ts">
import {useStore} from "vuex";
import MapComponent from "../components/MapComponent.vue";
import {onMounted, ref, watch} from "vue";
import {gsap} from 'gsap';
import {IUpdateDataEvent} from "../store";

const blueLineRef = ref<SVGPathElement | null>(null)
const redLineRef = ref<SVGPathElement | null>(null)

const store = useStore()
let length: number = 1725.2509765625

store.dispatch('updateDataLS')

store.getters.getChannel.addEventListener('message', ({data}: MessageEvent<IUpdateDataEvent>) => {
  store.dispatch('updateData', data)
})


const moveLine = (proc: number, ref: SVGPathElement) => {
  const offset = length * (1 - proc / 100)
  gsap.to(ref, {
    strokeDashoffset: offset,
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
  if (redLineRef.value && blueLineRef.value) {
    length = redLineRef.value.getTotalLength()
    console.log(length)

    gsap.set(blueLineRef.value, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
    gsap.set(redLineRef.value, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
    moveLine(store.getters.getRedProc, redLineRef.value)
    moveLine(store.getters.getBlueProc, blueLineRef.value)
  }
});

</script>

<template>
  <div>
    <MapComponent class="map">
      <path
          ref="blueLineRef"
          d="M278.5 839.5C333.5 807 222.5 602.5 349.5 656.5C334.833 668.5 310 721.5 358.5 715.5C410.259 709.097 418.5 747 446.5 768.5C474.5 790 489.5 838 536.501 838C590.028 838 602.623 883.54 672.501 886C743.501 888.5 852.858 874.506 876.5 892C901.5 910.5 894 944.5 973.5 987.5C1053 1030.5 1183.69 1021 1217.5 1021C1254.5 1021 1488 955 1505 740C1512 815.334 1550.1 973.3 1646.5 1002.5"
          stroke="blue"
          stroke-width="5"
      />
      <path
          ref="redLineRef"
          d="M278.5 839.5C333.5 807 222.5 602.5 349.5 656.5C334.833 668.5 310 721.5 358.5 715.5C410.259 709.097 418.5 747 446.5 768.5C474.5 790 489.5 838 536.501 838C590.028 838 602.623 883.54 672.501 886C743.501 888.5 852.858 874.506 876.5 892C901.5 910.5 894 944.5 973.5 987.5C1053 1030.5 1183.69 1021 1217.5 1021C1254.5 1021 1488 955 1505 740C1512 815.334 1550.1 973.3 1646.5 1002.5"
          stroke="red"
          stroke-width="5"
          transform="translate(0, 10)"
      />
    </MapComponent>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: auto;
}

path {
  fill: none;
}
</style>
