<script setup lang="ts">

import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { tryGetPokemonById } from '../services/usercore';

const route = useRoute();

let isLoading = ref(false);

const pokemon: Record<string, any> = ref({})

const paramId = computed(() => route.params.id)

const getPokemonData = async () => {
    isLoading.value = true;

    const response = await tryGetPokemonById(paramId.value as string);

    if (response) {
        pokemon.value = response;
    }

    isLoading.value = false;
}

watch(paramId, async () => {
    await getPokemonData()
}, { immediate: true })

</script>

<template>
    <h3 v-if="isLoading" class="mx-auto max-w-md flex justify-center py-6 sm:py-12">Loading...</h3>
    <div v-else class="relative flex flex-col justify-center overflow-hidden py-6 sm:py-12">
        <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div class="mx-auto max-w-md">
                <h3 class="text-2xl font-semibold uppercase">{{ pokemon.name }}</h3>
                <code class="font-bold">Types: </code>
                <code v-for="({ type }, idx) in pokemon.types" :key="idx" class="text-sm text-gray-900 mr-2">{{ type.name.concat(idx != pokemon.types.length - 1 ? ',' : '') }}</code>
                <div class="flex justify-center">
                    <img class="w-48" :src="pokemon.sprites.front_shiny" />
                    <img class="w-48" :src="pokemon.sprites.back_shiny" />
                </div>
                <div class="divide-y divide-gray-300/50">
                    <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
                        <p>Abilities:</p>
                        <ul class="space-y-4" v-for="(skill, idx) in pokemon.abilities" :key="idx">
                            <li class="flex items-center">
                                <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="11" />
                                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                                </svg>
                                <code class=" text-gray-800 ml-4 uppercase">
                                    {{ skill.ability.name }}
                                </code>
                            </li>
                        </ul>
                        <br />
                        <code class="font-bold text-gray-900 uppercase mr-2" v-for="({ base_stat, stat }, idx) in pokemon.stats" :key="idx">
                            {{ stat.name }}: <span class="text-gray-500">{{ base_stat.toString().concat(idx != pokemon.stats.length - 1 ? ',' : '') }}</span>
                        </code>
                    </div>
                    <div class="pt-8 text-base font-semibold leading-7">
                        <p class="text-gray-900">Want to dig deeper into PokéAPI?</p>
                        <p>
                            <a href="https://pokeapi.co/docs/v2#pokemon" target="blank" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>