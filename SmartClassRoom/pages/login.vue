<script setup lang="ts">
import { computed } from "vue";
import { useStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const token = useCookie("jwt_token");
const refresh = useCookie("jwt_token_refresh");
async function signin(email, password) {
  console.log(email);
  console.log(password);
  const response = await fetch("http://localhost:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });
  const data = await response.json();
  token.value = data.access;
  refresh.value = data.refresh;
  store.set_jwt = data.access;
  store.set_rjwt = data.refresh;
  debugger
  if (store.set_jwt) {
    window.location.href = 'http://localhost:3000';
  }
}
</script>

<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-50">
    <body class="h-full">
    ```
  -->
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="w-auto h-12 mx-auto"
        src="~/assets/FHNW.png/"
        alt="Workflow"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm text-center text-gray-600">
        Or
        {{ " " }}
        <a  class="font-medium text-indigo-600 hover:text-indigo-500">
          start your 14-day free trial
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div class="mt-1">
              <input
                v-model="email"
                id="username"
                name="username"
                required="true"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required="true"
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              @click="signin(email, password)"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
