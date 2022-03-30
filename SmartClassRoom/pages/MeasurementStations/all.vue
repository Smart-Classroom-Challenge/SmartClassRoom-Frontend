<script lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useStore } from "~/stores/user";
import { reactive, computed } from 'vue'

// router get props
export default {
  setup() {
    const store = useStore();
    const stations = reactive([]);
    async function getStations() {
      const response = await fetch(
        `http://localhost:8000/api/MeasurementStations/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.set_jwt}`,
          },
        }
      );
      const data = await response.json();
      debugger
      data.results.forEach((doc) => {
          stations.push(doc);
        });
    }

    const searchedProducts = computed(() => {
      return stations.filter((product) => {
        return (
          product.name
            .toLowerCase()
            .indexOf(store.search.toLowerCase()) != -1
        );
      });
    });

    

    onMounted(async () => {
      getStations();
    });
    return {
      stations,
      searchedProducts
    };
  },
};
</script>

<template>
  <div>
    <ActionInputM></ActionInputM>
    <h1 class="pt-2 text-4xl title">Measurement Stations</h1>
    <div class="container px-4 mx-auto my-12 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <div
          v-for="file in searchedProducts"
          :key="file.source"
          class="w-full px-1 my-5 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        >
          <!-- Article -->
          <article
            @click="goToMessurmentStatitons(file.id)"
            class="overflow-hidden rounded-lg shadow-lg"
          >
            <a href="#">
              <img
                alt="Placeholder"
                class="block w-full h-auto"
                src="https://picsum.photos/600/400/?random"
              />
            </a>

            <header
              class="flex items-center justify-between p-2 leading-tight md:p-4"
            >
              <h1 class="text-lg">
                <a class="text-black no-underline hover:underline" href="#">
                  {{ file.name }}
                </a>
              </h1>
              <p class="text-sm text-grey-darker">id: {{ file.id }}</p>
            </header>

            <footer
              class="flex items-center justify-between p-2 leading-none md:p-4"
            >
              <a
                class="flex items-center text-black no-underline hover:underline"
                href="#"
              >
                <p class="ml-2 text-sm">Room Number: {{ file.fk_classroom }}</p>
              </a>
              <a
                class="no-underline text-grey-darker hover:text-red-dark"
                href="#"
              >
                <span class="hidden">Like</span>
                <i class="fa fa-heart"></i>
              </a>
            </footer>
          </article>
          <!-- END Article -->
        </div>
        <!-- END Column -->
      </div>
    </div>
  </div>
</template>
