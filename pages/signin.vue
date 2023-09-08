<template>
    <main class="min-h-screen bg-[#1a1a1a]">
        <section class="container mx-auto px-5 py-24 text-gray-400">
            <form @submit.prevent="login()"
                class="bg-opacity-50 mx-auto mt-10 flex w-full flex-col rounded-lg bg-[#242424] p-8 shadow-lg md:mt-0 md:w-1/2 lg:w-2/6">
                <h2 class="mb-5 text-lg font-medium text-[#aac8e4]">Register</h2>
                <!-- Email input -->
                <div class="relative mb-4">
                    <label for="email" class="text-sm leading-7 text-gray-400">Email:</label>
                    <div class="relative">

                        <input v-model="formData.email" type="email" id="email" name="email" @change="v$.email.$touch"
                            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent"
                            :class="{
                                'border-red-500 focus:border-red-500': v$.email.$error,
                                'border-[#42d392] ': !v$.email.$invalid,
                            }" placeholder="e.g. example@email.com">

                        <Icon v-if="!v$.email.$invalid || v$.email.$error"
                            class="absolute right-2 h-full text-xl text-green-500"
                            :class="{ 'text-green-500': !v$.email.$invalid, 'text-yellow-500': v$.email.$error }"
                            :name="`heroicons-solid:${!v$.email.$error ? 'check-circle' : 'exclamation'}`" />
                    </div>
                    <p class="text-red-500" v-if="v$.email.$error"> {{ v$.email.required.$message }}</p>
                </div>
                <!-- Password input -->
                <div class="relative mb-4">
                    <label for="password" class="text-sm leading-7 text-gray-400">Password:</label>
                    <div class="relative">
                        <input v-model="formData.password" type="password" id="password" name="password"
                            @change="v$.password.$touch" :class="{
                                'border-red-500 focus:border-red-500': v$.password.$error,
                                'border-[#42d392] ': !v$.password.$invalid,
                            }"
                            class="bg-opacity-20 w-full rounded border border-gray-600 bg-transparent py-1 px-3 text-base leading-8 text-gray-100 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-transparent focus:ring-2 focus:ring-transparent">
                    </div>
                    <p class=" text-red-500" v-if="v$.password.$error"> {{ v$.password.required.$message }}</p>
                </div>
                <button type="submit" :disabled="v$.$invalid"
                    class="rounded border-0 bg-blue-500 py-2 px-8 font-bold text-white transition-colors duration-500 focus:outline-none">
                    <span v-if="!isLoading">Sign In</span>
                    <span v-else>Loading...</span>
                </button>
            </form>
        </section>
    </main>
</template>
  
<script setup>
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useAuthStore } from '~/stores/auth';
import AuthServices from "@/services/auth/auth"
definePageMeta({
    layout: "signinLayout",
});
const router = useRouter();
const store = useAuthStore()
const isLoading = ref(false)
const formData = reactive({
    email: '',
    password: '',
});
const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage('The email field is required', required),
            email: helpers.withMessage('Invalid email format', email),
        },
        password: {
            required: helpers.withMessage('The password field is required', required),
            minLength: minLength(6),
        },
    };
});
const v$ = useVuelidate(rules, formData);


const login = () => {
    isLoading.value = true;
    v$.value.$validate();
    let payload = {
        device_os: "Mac OSX",
        device_type: "browser",
        "email": formData.email,
        "password": formData.password,
        uniq_device_id: "5yovprzyvffcrgnf3tn7bm3txrlma53owg"
    }
    if (!v$.value.$error) {
        AuthServices.loginService(payload).then((response) => {
            // Handle successful login, set isAuthenticated to true in Pinia
            store.isAuthenticated = true;
            useAuthStore().setAuthToken(response.data.auth_token)
            store.setUser(response.data.data)
            isLoading.value = false
            // Redirect to the home page or another appropriate page   
            router.push('/')
        })
            .catch((error) => {
                isLoading.value = false

                // Handle Axios error (e.g., network error)
                console.error('Axios error:', error);
            });
    }  else{
        isLoading.value = false

    }
}


</script>
<style scoped>
button:disabled {
    background-color: rgba(59, 131, 246, 0.566) !important;
    color: #fff !important;
}
</style>