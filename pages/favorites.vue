<template>
    <div class=" min-h-screen container mx-auto px-5 py-24 ">
        <h1 class="text-2xl font-bold mb-4">Favorites List</h1>
        <template v-if="projects && !isLoading">
            <!-- Add Swiper component here to display project cards -->
            <Swiper :slides-per-view="3" :space-between="50" :modules="modules" :pagination="{ clickable: true }">
                <!-- Use v-for to iterate over project items and create cards -->
                <swiper-slide class="swiper-slide pb-12" v-for="project in projects" :key="project.id">
                    <div class="card overflow-hidden border border-gray-300 rounded-lg shadow-lg p-4">
                        <h2 class="text-lg font-semibold">{{ project.title }}</h2>
                        <img :src="project.image" class="mt-2 rounded-lg w-full h-auto">
                        <p class="mt-2 description">{{ truncateDescription(project.description) }}</p>
                    </div>
                </swiper-slide>
            </Swiper>
        </template>
        <template v-else>
             <!-- If no data is available, show this message instead of the swiper slides-->
             <div class="d-flex justify-center text-center mt-8 ">
                Loading...
            </div>
        </template>
    </div>
</template>


<script setup lang="ts">
import FavoritesServices from "@/services/favorites/favorites"
import { useFavoritesStore } from '~/stores/favorites';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


const modules = [Navigation, Pagination, Scrollbar, A11y]
const projects = ref([]) as any
const isLoading = ref(false)

const getFavoriteList = async () => {
    isLoading.value = true
    await FavoritesServices.favoriteListService().then((res: any) => {
        projects.value = res.blocks[0].projects
        isLoading.value = false
    }).catch((err: any) => {
        console.log("error", err);
        isLoading.value = false
    })
}

const truncateDescription = (description:any) => {
      const maxLength = 200;
      if (description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + '...';
      }
 }

getFavoriteList()
</script>

<style scoped>

</style>