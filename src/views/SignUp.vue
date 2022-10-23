<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import Swal from 'sweetalert2';

const router = useRouter();

const form = ref({
    name: 'Unknown',
    email: '',
    password: ''
});

const rules = {
    name: { required },
    email: { email, required },
    password: { minLength: minLength(8), required }
};

const v$ = useVuelidate(rules, form);

const handleSubmit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    Swal.showLoading();
}

</script>

<template>
    <div class="flex justify-center flex-col items-center lg:py-72 md:py-48">
        <div class="bg-slate-800 flex flex-col items-center p-10 rounded-lg shadow-lg">
            <div class="w-full max-w-xs">
                <h5 class="text-2xl text-white font-semibold text-center">Sign Up</h5>
                <form class="px-8 pt-6 pb-0 mb-4" @submit.prevent="handleSubmit">
                    <div class="mb-4" :class="{ error: v$.name.$errors.length }">
                        <label class="block text-white text-sm font-bold mb-2" for="name">
                            Name
                        </label>
                        <input
                            v-model="form.name"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                            id="name" type="text" placeholder="Name" />
                        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                            <div class="error-msg text-xs text-red-400">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="mb-4" :class="{ error: v$.email.$errors.length }">
                        <label class="block text-white text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input
                            v-model="form.email"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                            id="email" type="text" placeholder="Email" />
                        <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                            <div class="error-msg text-xs text-red-400">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="mb-6" :class="{ error: v$.password.$errors.length }">
                        <label class="block text-white text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input
                            v-model="form.password"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="Password" />
                        <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                            <div class="error-msg text-xs text-red-400">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>

            </div>

        </div>
        <p class="text-center text-slate-400 text-xs mt-5">
            &copy;2022 David Peña. All rights reserved.
        </p>
    </div>
</template>
