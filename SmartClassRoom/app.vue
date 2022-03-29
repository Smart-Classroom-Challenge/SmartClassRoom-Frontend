<script setup lang="ts">
import "~/assets/css/main.css";
import { useStore } from "~/stores/user";
debugger;
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
</script>

<template>
  <main class="text-center">
    <Navbar></Navbar>
    <NuxtPage />
    <Footer />
  </main>
</template>
