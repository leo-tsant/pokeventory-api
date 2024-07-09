import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  effect: { type: String },
  spriteUrl: { type: String },
  quantity: { type: Number, default: 0 },
});

export const Item = mongoose.model('Item', itemSchema);
