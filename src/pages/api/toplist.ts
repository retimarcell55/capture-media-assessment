import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'GET') {
        const prisma = new PrismaClient()
        try {
            const pokemons = await getTop10VotedPokemons(prisma);
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

async function getTop10VotedPokemons(prisma: PrismaClient) {
    return prisma.vote.findMany({
        take: 10,
        orderBy: {
            count: 'desc'
        },
        include: {
            pokemon: {
                include: {
                    abilities: true,
                    moves: true,
                    types: true,
                }
            }
        }
    });
}
