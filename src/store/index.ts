import { ref } from 'vue';
import { defineStore } from 'pinia';
import { tryGetAllPokemons } from '../services/usercore';
import { DTOPokemon } from '../types/pokemon';

export const usePokemonStore = defineStore('pokemons', () => {
    const pokemons = ref<DTOPokemon[]>([])

    const getPokemons = async () => {
        const records = await tryGetAllPokemons();
        
        pokemons.value = records.map((pokemon, idx) => { 
            return { name: pokemon.name, id: (idx+1) }
        });
    }

    return {
        pokemons,
        getPokemons,
    }
})