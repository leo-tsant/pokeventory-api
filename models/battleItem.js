import mongoose from 'mongoose';

const battleItemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    effect: { type: String }, // Brief description of the item's effect
    spriteUrl: { type: String }, // URL for the battle item's image
    quantity: { type: Number, default: 0 }
});

export const BattleItem = mongoose.model('BattleItem', battleItemSchema);