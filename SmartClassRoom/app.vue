<script setup lang="ts">
import "~/assets/css/main.css";
import { useStore } from "~/stores/user";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const path = computed(() =>route.path)
const store = useStore();
const token = useCookie("jwt_token");
const refresh = useCookie("jwt_token_refresh");
const response = await fetch("http://localhost:8000/api/token/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    username: "admin",
    password: "Welcome12",
  }),
});
const data = await response.json();
token.value = data.access;
refresh.value = data.refresh;
store.set_jwt = data.access;
store.set_rjwt = data.refresh;
router.beforeEach((to, from) => {
  if (to.fullPath.startsWith("/MeasurementStations/")) {
    store.Classrooms = false;
    store.Measurements = true;
  } else {
    store.Classrooms = true;
    store.Measurements = false;
  }
});

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
