<script setup lang="ts">
import { useStore } from "~/stores/user";
const router = useRouter();
const store = useStore();
debugger;
const IotDevices = await fetch(`http://localhost:8000/api/Classrooms/`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.set_jwt}`,
  },
})
  .then((r) => r.json())
  .then((data) => data.results);
function goToMessurmentStatitons(id: bigint) {
  router.push(`/MeasurementStations/${id}`);
}
function goToAllStations() {
    debugger;
    router.push(`/MeasurementStations/all`);
}
</script>

<template>
  <div>
    <ActionInput></ActionInput>
    <h1 class="pt-2 text-4xl title">Classrooms</h1>
    <div class="container px-4 mx-auto my-12 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <!-- Column -->
        <div
          class="w-full px-1 my-5 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        >
          <!-- Article -->
          <article
            @click="goToAllStations()"
            class="overflow-hidden rounded-lg shadow-lg"
          >
            <a >
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
                <a class="text-black no-underline hover:underline" >
                    All Stations
                </a>
              </h1>
              <p class="text-sm text-grey-darker"></p>
            </header>

            <footer
              class="flex items-center justify-between p-2 leading-none md:p-4"
            >
              <a
                class="flex items-center text-black no-underline hover:underline"
                
              >
                <p class="ml-2 text-sm">XX</p>
              </a>
              <a
                class="no-underline text-grey-darker hover:text-red-dark"
              >
                <span class="hidden">Like</span>
                <i class="fa fa-heart"></i>
              </a>
            </footer>
          </article>
          <!-- END Article -->
        </div>
        <!-- Column -->
        <div
          v-for="file in IotDevices"
          :key="file.source"
          class="w-full px-1 my-5 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
        >
          <!-- Article -->
          <article
            @click="goToMessurmentStatitons(file.id)"
            class="overflow-hidden rounded-lg shadow-lg"
          >
            <a >
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
                <a class="text-black no-underline hover:underline" >
                  {{ file.description }}
                </a>
              </h1>
              <p class="text-sm text-grey-darker">id: {{ file.id }}</p>
            </header>

            <footer
              class="flex items-center justify-between p-2 leading-none md:p-4"
            >
              <a
                class="flex items-center text-black no-underline hover:underline"
                
              >
                <p class="ml-2 text-sm">Room Number: {{ file.room_number }}</p>
              </a>
              <a
                class="no-underline text-grey-darker hover:text-red-dark"
                
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
