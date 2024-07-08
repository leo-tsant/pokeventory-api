import { HealingItem } from '../models/healingItem.js';
import { BattleItem } from '../models/battleItem.js';
import { Berry } from '../models/berry.js';
import { HeldItem } from '../models/heldItem.js';
import { Pokeball } from '../models/pokeball.js';

export const getItemPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        // 1. Fetch all items from all collections:
        const [allHealingItems, allBattleItems, allBerries, allHeldItems, allPokeballs] = await Promise.all([
            HealingItem.find(),
            BattleItem.find(),
            Berry.find(),
            HeldItem.find(),
            Pokeball.find()
        ]);

        // 2. Combine all items into a single array:
        const allItems = [
            ...allHealingItems.map((item) => Object.assign({}, item.toObject(), { category: 'healingItem' })),
            ...allBattleItems.map((item) => Object.assign({}, item.toObject(), { category: 'battleItem' })),
            ...allBerries.map((item) => Object.assign({}, item.toObject(), { category: 'berry' })),
            ...allHeldItems.map((item) => Object.assign({}, item.toObject(), { category: 'heldItem' })),
            ...allPokeballs.map((item) => Object.assign({}, item.toObject(), { category: 'pokeball' })),
        ];

        // 3. Apply pagination to the combined array:
        const startIndex = skip;
        const endIndex = Math.min(skip + limit, allItems.length); // Ensure we don't go beyond the array length
        const itemsOnPage = allItems.slice(startIndex, endIndex);

        // 4. Calculate the total number of items:
        const total = allItems.length;

        res.json({ data: itemsOnPage, total, allItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
