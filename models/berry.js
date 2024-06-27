import mongoose from 'mongoose';

const berrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  effect: { type: String }, // Brief description of the berry's effect
  spriteUrl: { type: String }, // URL for the berry's image
  quantity: { type: Number, default: 0 },
});

export const Berry = mongoose.model('Berry', berrySchema);
