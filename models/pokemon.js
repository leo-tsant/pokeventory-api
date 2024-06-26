import mongoose from 'mongoose';

// Create schema for Pokemon
const pokemonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    pokedexNumber: { type: Number, required: true, unique: true },
    primaryType: { type: String, required: true },
    secondaryType: { type: String },
    baseStats: {
        hp: { type: Number, required: true },
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        specialAttack: { type: Number, required: true },
        specialDefense: { type: Number, required: true },
        speed: { type: Number, required: true },
    },
    spriteUrl: { type: String }, // URL for the Pokémon's image
});

// Create model for Pokemon
export const Pokemon = mongoose.model('Pokemon', pokemonSchema);

