<script setup lang="ts">

import { ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '../store';
import { DTOPokemon } from '../types/pokemon';

onMounted(async () => {
  await findAllPokemons();
});

const filter = ref('')

const store = usePokemonStore();

const filteredPokemons = computed(() => store.pokemons.filter((pokemon: DTOPokemon) => pokemon.name.trim().toLowerCase().includes(filter.value.trim().toLowerCase())))

const findAllPokemons = async () => { 
  await store.getPokemons()
};

</script>

<template>
  <div class=" bg-blue-400">
    <h3 class="flex justify-center p-16 text-4xl text-slate-50">Pokemon Finder</h3>
    <div class="w-full flex justify-center">
      <input v-model="filter" type="text" class="p-2 rounded-sm focus:outline-none" placeholder="Search ..." />    </div>
    <div class="mt-10 p-4 flex flex-wrap justify-center">
      <div class="ml-4 text-2xl text-slate-50" v-for="(pokemon, idx) in filteredPokemons" :key="idx">
        <router-link exact :to="{ name: 'About', params: { id: pokemon.id } }">{{ pokemon.name }}</router-link>
      </div>
    </div>
  </div>

  <router-view></router-view>
</template>