import mongoose from 'mongoose';
const { Schema } = mongoose;

const pokeballSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: { type: String }, // Brief description of the Poké Ball's properties
    spriteUrl: { type: String }, // URL for the Poké Ball's image
    quantity: { type: Number, default: 0 }, // You start with 0 of each type
});

export const Pokeball = mongoose.model('Pokeball', pokeballSchema);
