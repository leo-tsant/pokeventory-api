import { HeldItem } from '../models/heldItem.js';

const getAllHeldItems = async (req, res) => {
    try {
        const heldItems = await HeldItem.find();
        res.json(heldItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getHeldItemByName = async (req, res) => {
    try {
        const name = req.params.name;
        const heldItem = await HeldItem.findOne({ name: name });
        if (!heldItem) {
            return res.status(404).json({ message: 'Held item not found' });
        }
        res.json(heldItem);
    }
    catch (err) {
        console.error('Error fetching held item:', err.message);
        res.status(500).json({ error: 'Failed to fetch held item' });
    }
}

export { getAllHeldItems, getHeldItemByName };