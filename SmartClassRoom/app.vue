<script setup lang="ts">
import "~/assets/css/main.css";
import { useStore } from "~/stores/user";
import { useRouter } from "vue-router";
import {useRoute} from 'vue-router'
import {computed} from 'vue'
const route=useRoute();
const router = useRouter();
const store = useStore();
const token = useCookie("jwt_token");
const refresh = useCookie("jwt_token_refresh");
const path = computed(() =>route.path)

if (!token.value && !refresh.value) {
  router.push("/login");
} else if (refresh.value) {
  debugger;
  const refresh = useCookie("jwt_token_refresh");
  if (refresh.value) {
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      refresh: refresh.value,
    }),
  });
  const data = await response.json();
  token.value = data.access;
  store.set_jwt = data.access;
  }
 
  
} else if(token.value && refresh.value) {
  store.set_jwt(token.value);
  store.set_rjwt(refresh.value);
}
if (path.value.startsWith("/MeasurementStations/")) {
    store.Classrooms = false;
    store.Measurements = true;
  } else {
    store.Classrooms = true;
    store.Measurements = false;
  }


</script>

<template>
  <main class="text-center">
    <Navbar></Navbar>
    <NuxtPage />
    <Footer />
  </main>
</template>
