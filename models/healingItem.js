import mongoose from 'mongoose';

const healingItemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    effect: { type: String }, // Description of the potion's healing properties
    spriteUrl: { type: String }, // URL for the potion's image
    quantity: { type: Number, default: 0 }
});

export const HealingItem = mongoose.model('HealingItem', healingItemSchema);