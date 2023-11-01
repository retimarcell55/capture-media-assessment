import {PokemonWithDetails} from "@/types";

type Props = {
    pokemon: PokemonWithDetails
    voteCallback: (pokemonId: number) => void
    moreInfoCallback: (pokemon: PokemonWithDetails) => void
};

export default function PokemonCard({ pokemon, voteCallback, moreInfoCallback }: Props) {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={pokemon.imageUrl!} alt={pokemon.name}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{pokemon.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{pokemon.id}# pokemon</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                       onClick={() => voteCallback(pokemon.id)}>
                        Vote
                    </button>
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                       onClick={() => moreInfoCallback(pokemon)}>
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}
