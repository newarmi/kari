<script setup lang="ts">
import {ref} from "vue";
import {useStore} from "vuex";

const store = useStore()

const blue = ref<number>(store.getters.getBlue)
const red = ref<number>(store.getters.getRed)
const apply = () => {
  store.dispatch('changeValue', {
        red: red.value,
        blue: blue.value
      }
  )
}
</script>

<template>
  <nav>
    <a target="_blank" href="/map">Карта</a>
  </nav>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="p-4 mb-10 shadow-md rounded-lg">
        <p>Галубой: {{ store.getters.getBlue }}</p>
        <p>Красный: {{ store.getters.getRed }}</p>
      </div>
      <form class="p-4 shadow-md rounded-lg" @submit.prevent="apply">
        <div class="mb-2">
          <div class="flex items-center justify-between">
            <label for="blue" class="block text-sm font-medium leading-6 text-gray-900">Галубой</label>
          </div>
          <div class="mt-2">
            <input
                v-model.number="blue"
                id="blue"
                type="number"
                placeholder="300"
                class="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="mb-2">
          <div class="flex items-center justify-between">
            <label for="red" class="block text-sm font-medium leading-6 text-gray-900">Красный</label>
          </div>
          <div class="mt-2">
            <input
                v-model.number="red"
                id="red"
                type="number"
                placeholder="300"
                class="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <button type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Применить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
