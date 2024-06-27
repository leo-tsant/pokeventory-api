import { HealingItem } from '../models/healingItem.js';
import config from '../utils/config.js';

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

const getAllHealingItems = async (req, res) => {
  try {
    const healingItems = await HealingItem.find();
    res.json(healingItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHealingItemByName = async (req, res) => {
  try {
    const { name } = req.params;
    const healingItem = await HealingItem.findOne({ name });

    if (!healingItem) {
      return res.status(404).json({ message: 'Healing item not found' });
    }

    res.json(healingItem);
  } catch (err) {
    console.error('Error fetching healing item:', err.message);
    res.status(500).json({ error: 'Failed to fetch healing item' });
  }
};

const updateHealingItemQuantity = async (req, res) => {
  try {
    const name = req.params.name;
    const { quantityChange } = req.body;

    const updatedHealingItem = await HealingItem.findOneAndUpdate(
        { name },
        { quantity: quantityChange },
        { new: true }
      );

    if (!updatedHealingItem) {
      return res.status(404).json({ message: 'Healing item not found' });
    }

    res.json(updatedHealingItem);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteHealingItem = async (req, res) => {
  try {
    const name = req.params.name;
    const { adminPassword } = req.body;

    if (adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Incorrect admin password' });
    }

    const deletedHealingItem = await HealingItem.findOneAndDelete({ name });

    if (!deletedHealingItem) {
      return res.status(404).json({ message: 'Healing item not found' });
    }

    res.json({ message: 'Healing item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to healing item' });
  }
};

export { getAllHealingItems, getHealingItemByName, updateHealingItemQuantity, deleteHealingItem };
