import { BattleItem } from '../models/battleItem.js';

const getBattleItems = async (req, res) => {
  try {
    const battleItems = await BattleItem.find();
    res.status(200).json(battleItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBattleItemByName = async (req, res) => {
  try {
    const { name } = req.params;
    const battleItem = await BattleItem.findOne({ name });

    if (!battleItem) {
      return res.status(404).json({ message: 'Battle item not found' });
    }

    res.json(battleItem);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch Battle item' });
  }
}

const updateBattleItemQuantity = async (req, res) => {
  try {
    const name = req.params.name;
    const { quantityChange } = req.body;

    const updatedBattleItem = await BattleItem.findOneAndUpdate(
      { name },
      { quantity: quantityChange } ,
      { new: true }
    );

    if (!updatedBattleItem) {
      return res.status(404).json({ message: 'Battle item not found' });
    }

    res.json(updatedBattleItem);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getBattleItems, getBattleItemByName, updateBattleItemQuantity };
