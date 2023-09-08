<template>
    <div class=" min-h-screen container mx-auto px-5 py-24 ">
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold mb-4">Home</h1>
            <routerLink class="text-[#3b82f6]" to="/favorites">Check Your Favorite List</routerLink>
        </div>
        <template v-if="projects && !isLoading">
            <!-- Add Swiper component here to display project cards -->
            <Swiper :slides-per-view="3" :space-between="50" :modules="modules" :pagination="{ clickable: true }">
                <!-- Use v-for to iterate over project items and create cards -->
                <swiper-slide class="swiper-slide pb-12" v-for="project in projects" :key="project.id">
                    <!-- Display project details here -->
                    <div class="card overflow-hidden border border-gray-300 rounded-lg shadow-lg p-4">
                        <h2 class="text-lg font-semibold">{{ project.title }}</h2>
                        <img :src="project.image" class="mt-2 rounded-lg w-full h-auto">
                        <p class="mt-2 description">{{ truncateDescription(project.description) }}</p>
                        <!-- Add a favorite button here -->
                        <button @click="toggleFavorite(project)"
                            :class="isFavorite(project.id) ? 'text-red-500 bg-red-700' : ''"
                            class="mt-4 bg-blue-500  text-white font-bold py-2 px-4 rounded">
                            <Icon :name="`heroicons-solid:heart`" :class="isFavorite(project.id) ? 'bg-red-700' : ''" />
                        </button>
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
import HomeServices from "@/services/home/home"
import { useFavoritesStore } from '~/stores/favorites';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


const modules = [Navigation, Pagination, Scrollbar, A11y]
const projects = ref([]) as any
const isLoading = ref(false)
const favoritesStore = useFavoritesStore();

const getHomeProjects = async () => {
    isLoading.value = true;
    await HomeServices.projectsService().then((res: any) => {
        projects.value = res.blocks[4].projects
        isLoading.value = false
    }).catch((err: any) => {
        console.log("error", err);
        isLoading.value = false
    })
}
const toggleFavorite = (project: any) => {
    if (favoritesStore.isFavorite(project.id)) {
        favoritesStore.removeFavorite(project.id);
    } else {
        favoritesStore.addFavorite(project);
    }
}
// Check if a project is a favorite using Composition API
const isFavorite = (projectId: any) => {
    return favoritesStore.isFavorite(projectId);
};
const truncateDescription = (description:any) => {
      const maxLength = 200;
      if (description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + '...';
      }
 }
getHomeProjects()
</script>

<style scoped>

</style>