<script lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useStore } from "~/stores/user";
// router get props
export default {
  setup() {
    const store = useStore();
    const Stations = ref({});

    const stations = reactive([]);
    async function getStations(id: any) {
      const response = await fetch(
        `http://localhost:8000/api/MeasurementStations/?fk_classroom=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.set_jwt}`,
          },
        }
      );
      const data = await response.json();
      debugger;
      data.results.forEach((doc) => {
        debugger;
        fetch(
          `http://127.0.0.1:8000/api/ConnectionHistory/?fk_measurement_station=${doc.id}&filter_type=latest`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.set_jwt}`,
            },
          }
        )
          .then((response) => response.json())
          .then((jsonResponse) => {
            debugger;
            doc.details = jsonResponse.results[0];
            debugger;
            stations.push(doc);
          });
      });
    }

    const searchedProducts = computed(() => {
      return stations.filter((product) => {
        return (
          product.name.toLowerCase().indexOf(store.search.toLowerCase()) != -1
        );
      });
    });
    onMounted(() => {
      getStations(useRoute().params.id);
    });
    return {
      Stations,
      searchedProducts,
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
            @click="goToDetails(file.id)"
            class="overflow-hidden rounded-lg shadow-lg"
          >
            <a>
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
                <a class="text-black no-underline hover:underline">
                  {{ file.name }}
                </a>
              </h1>
              <p class="text-sm text-grey-darker">id: {{ file.id }}</p>
            </header>

             <header
              class="flex items-center justify-between p-2 leading-tight md:p-4"
            >
              <h2 class="text-lg">
                <a class="text-black no-underline hover:underline">
                  IP Adresse: {{file.details.ip_address}}
                </a>
              </h2>
              
              <h2 class="text-lg">
                <a class="text-black no-underline hover:underline">
                 Bluethooth Status : {{file.details.bluetooth_connected}}
                </a>
              </h2>
            </header>
            <div class="pl-10 text-left">
            <p class="text-md text-grey-darker">ping_backend: {{file.details.ping_backend}}</p>
            <p>time: {{file.details.time}}</p>
            <p>wlan_signal_strength: {{file.details.wlan_signal_strength}}</p>
            <p>ping_broker: {{file.details.ping_backend}}</p>
            <p>ping_grafana: {{file.details.ping_grafana}}</p>
            </div>
            <footer
              class="flex items-center justify-between p-2 leading-none md:p-4"
            >
              <a
                class="flex items-center text-black no-underline hover:underline"
              > 
                <p class="ml-2 text-sm">Room Number: {{ file.fk_classroom }}</p>
  
              </a>
              <a class="no-underline text-grey-darker hover:text-red-dark">
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
