<script  lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

// router get props
export default {
  setup() {
    const Stations = ref({})

    const getStations = (param: any) => {
      fetch(`http://localhost:8000/api/MeasurementStations/${param}`)
        .then(res => res.json())
        .then((data) => {
          Stations.value = data
        })
        .catch((err) => {
          console.log(err)
        })
      // Flag.value = result
    }

    onMounted(() => {
      getStations(useRoute().params.id)
    })
    return {
      Stations,
    }
  },
}
</script>



<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>