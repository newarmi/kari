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
          d="M351.5 655C348 668.5 397.5 752 447.5 764C497.5 776 507.768 837.5 538 837.5C572 837.5 618.431 887.448 671.5 884.5C725.5 881.5 846 873 875 891C904 909 910.5 982.5 976.5 986C1042.5 989.5 1150.17 1020.5 1214 1020.5C1280.5 1020.5 1514 894.5 1503 740C1525.17 828 1584.9 999.5 1646.5 999.5"
          stroke="blue"
          stroke-width="5"
      />
      <path
          ref="redLineRef"
          d="M351.5 655C348 668.5 397.5 752 447.5 764C497.5 776 507.768 837.5 538 837.5C572 837.5 618.431 887.448 671.5 884.5C725.5 881.5 846 873 875 891C904 909 910.5 982.5 976.5 986C1042.5 989.5 1150.17 1020.5 1214 1020.5C1280.5 1020.5 1514 894.5 1503 740C1525.17 828 1584.9 999.5 1646.5 999.5"
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
