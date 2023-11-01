import {PokemonWithDetails} from "@/types";

type Props = {
    pokemon: PokemonWithDetails,
    closeModalCallback: () => void
}

export default function PokemonDetailsModal({pokemon, closeModalCallback} : Props) {
    return (
    <div id="pokemon-modal" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
        <div className="fixed inset-0 flex items-center justify-center md:p-8 sm:p-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-auto md:max-w-[75%] sm:w-full overflow-auto max-h-full">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {pokemon.name}
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModalCallback}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Height: {pokemon.height}m<br/>
                        Weight: {pokemon.weight}kg
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <span className="pr-4">
                            Abilities:
                        </span>
                        {pokemon.abilities.map((ability) => (
                            <button key={ability.id} type="button" className="text-white bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:border-gray-700" disabled>
                                {ability.name}
                            </button>
                        ))}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <span className="pr-4">
                            Moves:
                        </span>
                        {pokemon.moves.map((move) => (
                            <button key={move.id} type="button" className="text-white bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:border-gray-700" disabled>
                                {move.name}
                            </button>
                        ))}
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <span className="pr-4">
                            Types:
                        </span>
                        {pokemon.types.map((type) => (
                            <button key={type.id} type="button" className="text-white bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:border-gray-700" disabled>
                                {type.name}
                            </button>
                        ))}
                    </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={closeModalCallback}>Back</button>
                </div>
            </div>
        </div>
    </div>
    );
}
