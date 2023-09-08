// stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Define your authentication state here
    isAuthenticated: false,
    authToken: null, // Store the authentication token
    user: null, // Store user information
    // Add other authentication-related state properties here
  }),
  actions: {
    setAuthToken(token : any) {
        this.authToken = token;
        this.isAuthenticated = true
        localStorage.setItem('authToken', token); // Save in local storage
        localStorage.setItem('isAuthenticated', this.isAuthenticated); // Save in local storage
      },
  
      setUser(user : any) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user)); // Save in local storage
      },
  
    // Define actions for authentication here
    login() {
      // Implement your login logic here
      // You may use Axios to make a POST request to the sign-in API
      // Set isAuthenticated to true if login is successful
    },
    logout() {
      // Implement your logout logic here
      // Set isAuthenticated to false
      this.authToken = null;
      this.user = null;
      this.isAuthenticated = false
      localStorage.removeItem('authToken'); // Remove from local storage
      localStorage.removeItem('user'); // Remove from local storage
    },
  },
  
});
