// store/favorites.js
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
  }),

  actions: {
    // Add a project to favorites
    addFavorite(project: any) {
      this.favorites.push(project);
    },

    // Remove a project from favorites
    removeFavorite(projectId  : any) {        
      const index = this.favorites.findIndex((project: { id: any; }) => project.id === projectId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
    isFavorite(projectId:any) {
        return this.favorites.some((project: { id: any; }) => project.id === projectId);
      },
  },

//   getters: {
//     // Check if a project is a favorite
//     isFavorite(projectId:any) {
//       return this.favorites.some((project: { id: any; }) => project.id === projectId);
//     },
//   },
});
