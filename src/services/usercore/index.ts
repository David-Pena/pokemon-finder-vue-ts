import axios, { AxiosResponse } from 'axios'
import { DTOMappedPokemon } from '../../types/pokemon';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const tryGetAllPokemons = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/pokemon?offset=0`);
        return data.results as DTOMappedPokemon[];
    } catch (error) {
        throw error;
    }
}

export const tryGetPokemonById = async (id: string): Promise<AxiosResponse<any, any>> => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}