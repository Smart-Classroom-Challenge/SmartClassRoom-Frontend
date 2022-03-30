<script lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useStore } from "~/stores/user";
// router get props
export default {
  setup() {
    const store = useStore();
    const Stations = ref({});
    async function getStations(id: any) {
      const response = await fetch(
        `http://localhost:8000/api/MeasurementStations/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.set_jwt}`,
          },
        }
      );
      const data = await response.json();
      Stations.value = data;
      debugger;
    }

    onMounted(() => {
      getStations(useRoute().params.id);
    });
    return {
      Stations,
    };
  },
};
</script>

<template>
  <div>
    <ActionInputM></ActionInputM>
    <h1>{{ Stations.url || 'Loading...' }}</h1>
  </div>
</template>
