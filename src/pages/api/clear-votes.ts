import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";

export type Vote = {
    id: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == 'DELETE') {
        const prisma = new PrismaClient()

        try {
            await clearVotes(prisma);
            res.status(200).send('Votes deleted');
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

async function clearVotes(prisma: PrismaClient) {
    await prisma.vote.deleteMany();
}
