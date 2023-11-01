import { Inter } from 'next/font/google'
import Spinner from "@/components/spinner";
import PokemonCard from "@/components/pokemonCard";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PokemonDetailsModal from "@/components/pokemonDetailsModal";
import {PokemonWithDetails} from "@/types";
import {useRouter} from "next/router";

const inter = Inter({ subsets: ['latin'] })

type PokemonResponse = {
    pokemon1: PokemonWithDetails,
    pokemon2: PokemonWithDetails
}

export default function Home() {
    const router = useRouter();
    const [pokemonData, setPokemonData] = useState<PokemonResponse>();
    const [isPokemonDataLoading, setIsPokemonDataLoading] = useState<boolean>(true);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonWithDetails | undefined>(undefined);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const fetchPokemonData = async () => {
        setIsPokemonDataLoading(true);
        axios.get('/api/get-random-pokemons').then(response => {
            setPokemonData(response.data);
        }).catch(error => {
            toast.error(error);
            setPokemonData(undefined);
        }).finally(() => {
            setIsPokemonDataLoading(false);
        });
    }

    const voteCallback = (pokemonId: number) => {
      axios.post('/api/vote', {
          id: pokemonId
      }).then(() => {
          toast.info("Vote saved");
          fetchPokemonData();
      }).catch(error => {
          toast.error(error);
      });
    }

    const moreInfoCallback = (pokemonId: PokemonWithDetails) => {
        openModal(pokemonId);
    }

    const openModal = (selectedPokemon: PokemonWithDetails) => {
        setSelectedPokemon(selectedPokemon);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedPokemon(undefined);
        setModalIsOpen(false);
    }

    return (
    <main
      className={`flex min-h-screen flex-col flex-wrap items-center lg:p-24 p-4 ${inter.className}`}
    >
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white md:mt-8">Pokemon Voting App</h1>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        { isPokemonDataLoading ? <Spinner /> : pokemonData ? (
            <div className="flex justify-evenly flex-wrap">
              <PokemonCard pokemon={pokemonData.pokemon1} voteCallback={voteCallback} moreInfoCallback={moreInfoCallback}/>
              <PokemonCard pokemon={pokemonData.pokemon2} voteCallback={voteCallback} moreInfoCallback={moreInfoCallback}/>
            </div>
            ) : null
        }
        </div>

        <div className="mt-8 lg:w-1/6 w-3/4">
            <button className="inline-flex w-full justify-center items-center px-4 py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => router.push("/toplist")}>
                TopList
            </button>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"/>
        { modalIsOpen && <PokemonDetailsModal pokemon={selectedPokemon!} closeModalCallback={closeModal}/> }
    </main>
    )
}
