import { HeldItem } from '../models/heldItem.js';
import config from '../utils/config.js';

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

const getAllHeldItems = async (req, res) => {
  try {
    const heldItems = await HeldItem.find();
    res.json(heldItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHeldItemByName = async (req, res) => {
  try {
    const { name } = req.params;
    const heldItem = await HeldItem.findOne({ name });
    if (!heldItem) {
      return res.status(404).json({ message: 'Held item not found' });
    }
    res.json(heldItem);
  } catch (err) {
    console.error('Error fetching held item:', err.message);
    res.status(500).json({ error: 'Failed to fetch held item' });
  }
};

const updateHeldItemQuantity = async (req, res) => {
  try {
    const name = req.params.name;
    const { quantityChange } = req.body;

    const updatedHeldItem = await HeldItem.findOneAndUpdate(
      { name },
      { quantity: quantityChange },
      { new: true }
    );
    if (!updatedHeldItem) {
      return res.status(404).json({ message: 'Held item not found' });
    }
    res.json(updatedHeldItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteHeldItem = async (req, res) => {
  try {
    const name = req.params.name;
    const { adminPassword } = req.body;

    if (adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Incorrect admin password' });
    }

    const deletedHeldItem = await HeldItem.findOneAndDelete({ name });

    if (!deletedHeldItem) {
      return res.status(404).json({ message: 'Held item not found' });
    }

    res.json({ message: 'Held item deleted successfully'});
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete held item' });
    }
}

export { getAllHeldItems, getHeldItemByName, updateHeldItemQuantity, deleteHeldItem};
