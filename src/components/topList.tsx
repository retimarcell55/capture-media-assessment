import {VoteWithDetails} from "@/types";

type Props = {
    pokemons: VoteWithDetails[],
    deleteAllCallback: () => void
}

export default function TopList({ pokemons, deleteAllCallback }: Props) {

    const toplistContainer = (
        <>
            <div className="md:w-96 w-full text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                { pokemons.map((item, index) => (
                        <div key={item.pokemon.id} className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg dark:bg-gray-800 dark:border-gray-700 bg-white">
                            <img className="w-10 h-10" aria-hidden="true" src={item.pokemon.imageUrl!} alt={item.pokemon.name}/>
                            <div>
                                {index + 1}# { item.pokemon.name }
                            </div>
                            <div>
                                Votes: { item.count }
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className="mt-8 lg:w-1/6 w-3/4">
                <button className="inline-flex w-full justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={deleteAllCallback}>
                    Reset Votes
                </button>
            </div>
        </>
    );

    return (
        <>
            { pokemons.length > 0 ? toplistContainer : <div className="md:w-96 sm:w-full text-gray-900 dark:text-white text-center">No votes yet</div> }
        </>
    );
}
