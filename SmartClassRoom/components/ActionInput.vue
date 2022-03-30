<template>

    <div v-if="store.show" class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal">
        <div @click.self="close_modal()" class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>

        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">

           
            <div class="px-6 py-4 text-left modal-content">

                <div class="flex items-center justify-center pb-3">
                    <p class="text-2xl font-bold text-center">Add Classroom</p>
                </div>

                <div class="mt-6">
                <!-- <p>Canfirm the deletion of this item</p> -->
                    <div>
                        <label for="username" class="block text-sm text-gray-800 dark:text-gray-200">Name</label>
                        <input type="text" v-model="Room_name" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    </div>

                    <div class="mt-4">
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm text-gray-800 dark:text-gray-200">Description</label>
                        </div>

                        <input type="text" v-model="Room_desc" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    </div>

                    <div class="mt-4">
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm text-gray-800 dark:text-gray-200">Room Number</label>
                        </div>

                        <input type="text" v-model="Room_number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                    </div>
                    
            

                    <div class="mt-6 ">
                        <button type="submit"   class="flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                        
                        <span class="m-2 text-white" @click="create_classroom(Room_name, Room_desc, Room_number)">Add Classroom</span>
                        
                    </button>
                    </div>
                    


                </div>
            
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { useStore } from "~/stores/user";
const store = useStore()

debugger;
function close_modal() {
    store.show = false
}
</script>
