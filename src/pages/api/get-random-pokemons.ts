import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        const prisma = new PrismaClient();
        try {
            const pokemons = await getTwoDifferentRandomPokemon(prisma);
            res.status(200).json(pokemons);
        } catch (e) {
            console.error(e);
            res.status(500).send('Something went wrong');
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).send('Method not allowed');
    }
}

async function getTwoDifferentRandomPokemon(prisma: PrismaClient) {
    const firstPokemonId = Math.floor(Math.random() * 100) + 1;
    let secondPokemonId;

    do {
        secondPokemonId = Math.floor(Math.random() * 100) + 1;
    } while (firstPokemonId === secondPokemonId)

    const pokemon1 = await prisma.pokemon.findFirst({
        where: {
            id: firstPokemonId
        },
        include: {
            abilities: true,
            moves: true,
            types: true
        }
    });
    const pokemon2 = await prisma.pokemon.findFirst({
        where: {
            id: secondPokemonId
        },
        include: {
            abilities: true,
            moves: true,
            types: true
        }
    });
    return {pokemon1, pokemon2};
}


