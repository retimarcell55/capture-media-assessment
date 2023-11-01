import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export type Vote = {
    id: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'POST') {
        const prisma = new PrismaClient()
        const { body } = req;

        try {
            await saveVoteToDatabase(prisma, body);
            res.status(200).send('Vote saved');
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

async function saveVoteToDatabase(prisma: PrismaClient, vote: Vote) {
    await prisma.vote.upsert({
        where: {
            pokemonId: vote.id
        },
        update: {
            count: {
                increment: 1
            }
        },
        create: {
            pokemonId: vote.id,
            count: 1
        }
    })
}
