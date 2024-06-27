import { BattleItem } from '../models/battleItem.js';
import config from '../utils/config.js';

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

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

const deleteBattleItem = async (req, res) => {
  try {
    const name = req.params.name;
    const { adminPassword } = req.body;

    if (adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Incorrect admin password' });
    }

    const deletedBattleItem = await BattleItem.findOneAndDelete({ name });

    if (!deletedBattleItem) {
      return res.status(404).json({ message: 'Battle item not found' });
    }

    res.json({ message: 'Battle item deleted successfully' });
  }catch (error) {
    res.status(500).json({ error: 'Failed to delete battle item' });
  }
};

const addNewBattleItem = async (req, res) => {
  try {
    const battleItem = req.body;
    const newBattleItem = new BattleItem(battleItem);
    const savedBattleItem = await newBattleItem.save();
    res.json(savedBattleItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getBattleItems, getBattleItemByName, updateBattleItemQuantity, deleteBattleItem, addNewBattleItem };
