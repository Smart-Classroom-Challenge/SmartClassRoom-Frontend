<template>
  <main class="text-center">
    <Navbar></Navbar>
    <NuxtPage />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import '~/assets/css/main.css'
import { useStore } from '~/stores/user'
debugger;
const store = useStore()
const token = useCookie('jwt_token')
debugger;
if (!token.value) {
  const response = await fetch('http://127.0.0.1:8000/api/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": "admin",
      "password": "Welcome12"
    }),
  }).then((r) => r.json())
  debugger;
  store.set_jwt = response.access
  store.set_rjwt = response.refresh
  token.value = response.access
} 
</script>
