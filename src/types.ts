import {Prisma} from "@prisma/client";

export type PokemonWithDetails = Prisma.PokemonGetPayload<{
    include: {
        abilities: true,
        moves: true,
        types: true,
        votes: true
    }
}>

export type VoteWithDetails = Prisma.VoteGetPayload<{
    include: {
        pokemon : true
    }
}>
