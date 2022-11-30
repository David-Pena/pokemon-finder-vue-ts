export interface IPokemon {
    name: string;
    url: string;
    id: number;
}

export type DTOMappedPokemon = Omit<IPokemon, 'id'>
export type DTOPokemon = Omit<IPokemon, 'url'>;