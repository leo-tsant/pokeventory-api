import { BattleItem } from '../models/battleItem.js';

const getBattleItems = async (req, res) => {
    try {
        const battleItems = await BattleItem.find();
        res.status(200).json(battleItems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { getBattleItems };
