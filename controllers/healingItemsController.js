import { HealingItem } from "../models/healingItem.js";

const getAllHealingItems = async (req, res) => {
    try {
        const healingItems = await HealingItem.find();
        res.json(healingItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getHealingItemByName = async (req, res) => {
    try {
        const name = req.params.name;
        const healingItem = await HealingItem.findOne({ name: name });

        if (!healingItem) {
            return res.status(404).json({ message: 'Healing item not found' });
        }

        res.json(healingItem);
    }
    catch (err) {
        console.error('Error fetching healing item:', err.message);
        res.status(500).json({ error: 'Failed to fetch healing item' });
    }
}

export { getAllHealingItems, getHealingItemByName };