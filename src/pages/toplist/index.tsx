import { Inter } from 'next/font/google'
import axios from "axios";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {VoteWithDetails} from "@/types";
import TopList from "@/components/topList";
import {useRouter} from "next/router";

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
    const router = useRouter();
    const [topList, setTopList] = useState<VoteWithDetails[]>([]);

    useEffect(() => {
        fetchTopListData();
    }, []);

    const fetchTopListData = async () => {
        axios.get('/api/toplist').then(response => {
            setTopList(response.data);
        }).catch(error => {
            toast.error(error);
            setTopList([]);
        });
    }

    const deleteAllCallback = () => {
        axios.delete('/api/clear-votes').then(() => {
            toast.info("Voting Reset");
            fetchTopListData();
        }).catch(error => {
            toast.error(error);
        });
    }

    return (
        <main
            className={`flex min-h-screen flex-col flex-wrap items-center lg:p-24 p-4 ${inter.className}`}
        >
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mt-8">TopList</h1>

            <TopList pokemons={topList} deleteAllCallback={deleteAllCallback}/>

            <div className="mt-8 lg:w-1/6 w-3/4">
                <button className="inline-flex w-full justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => router.push("/")}>
                    Back
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
        </main>
    )
}
