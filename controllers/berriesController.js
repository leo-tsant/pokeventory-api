import { Berry } from '../models/berry.js';
import config from '../utils/config.js';

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

const getAllBerries = async (req, res) => {
  try {
    const berries = await Berry.find();
    res.json(berries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBerryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const berry = await Berry.findOne({ name });

    if (!berry) {
      return res.status(404).json({ message: 'Berry not found' });
    }

    res.json(berry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Berry' });
  }

};

const updateBerryQuantity = async (req, res) => {
  try {
    const name = req.params.name;
    const { quantityChange } = req.body;

    const updatedBerry = await Berry.findOneAndUpdate(
      { name },
      { quantity: quantityChange },
      { new: true }
    );

    if (!updatedBerry) {
      return res.status(404).json({ message: 'Berry not found' });
    }

    res.json(updatedBerry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteBerry = async (req, res) => {
  try {
    const name = req.params.name;
    const { adminPassword } = req.body;

    if (adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Incorrect admin password' });
    }

    const deletedBerry = await Berry.findOneAndDelete({ name });

    if (!deletedBerry) {
      return res.status(404).json({ message: 'Berry not found' });
    }

    res.json({ message: 'Berry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete berry' });
  }
}

const addNewBerry = async (req, res) => {
  try {
    const newBerry = new Berry(req.body);
    const savedBerry = await newBerry.save();

    res.json(savedBerry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllBerries, getBerryByName, updateBerryQuantity, deleteBerry, addNewBerry };
