import mongoose from 'mongoose';

const heldItemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    effect: { type: String }, // Description of the item's effect
    spriteUrl: { type: String }, // URL for the held item's image
    quantity: { type: Number, default: 0 }
});

export const HeldItem = mongoose.model('HeldItem', heldItemSchema);

