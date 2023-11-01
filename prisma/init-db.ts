const { PrismaClient } = require('@prisma/client');
const { Pokemon, PokemonClient } = require('pokenode-ts');

const prisma = new PrismaClient()

async function main() {
    const api = new PokemonClient();

    for(let pokemonId = 1; pokemonId <= 100; pokemonId++) {
        await api
            .getPokemonById(pokemonId)
            .then(
                async (data: any) => {
                    const pokemon: typeof Pokemon = data;

                    await prisma.pokemon.create({
                        data: {
                            id: pokemon.id,
                            name: pokemon.name,
                            height: pokemon.height,
                            weight: pokemon.weight,
                            imageUrl: pokemon.sprites.front_default,
                            base_experience: pokemon.base_experience,
                            abilities: {
                                create: pokemon.abilities.map((ability: any) => {
                                    return {
                                        name: ability.ability.name,
                                    }
                                })
                            },
                            moves: {
                                create: pokemon.moves.map((move: any) => {
                                    return {
                                        name: move.move.name,
                                    }
                                })
                            },
                            types: {
                                create: pokemon.types.map((type: any) => {
                                    return {
                                        name: type.type.name,
                                    }
                                })
                            }
                        },
                    })
                }
            )
            .catch((error: any) => console.error(error));
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
