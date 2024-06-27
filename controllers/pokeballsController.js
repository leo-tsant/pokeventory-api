import { Pokeball } from '../models/pokeball.js';
import config from '../utils/config.js';

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

const getAllPokeballs = async (req, res) => {
  try {
    const pokeballs = await Pokeball.find();
    res.json(pokeballs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPokeballByName = async (req, res) => {
  try {
    const { name } = req.params;
    const pokeball = await Pokeball.findOne({
      name,
    });
    if (!pokeball) {
      return res.status(404).json({ message: 'Pokeball not found' });
    }
    res.json(pokeball);
  } catch (err) {
    console.error('Error fetching Pokeball:', err.message);
    res.status(500).json({ error: 'Failed to fetch Pokeball' });
  }
};

const updatePokeballQuantity = async (req, res) => {
  try {
    const name = req.params.name;
    const { quantityChange } = req.body;

    const updatedPokeball = await Pokeball.findOneAndUpdate(
      { name },
      { quantity: quantityChange },
      { new: true }
    );

    if (!updatedPokeball) {
      return res.status(404).json({ message: 'Pokeball not found' });
    }

    res.json(updatedPokeball);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deletePokeball = async (req, res) => {
  try {
    const name = req.params.name;
    const { adminPassword } = req.body;

    if (adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Incorrect admin password' });
    }

    const deletedPokeball = await Pokeball.findOneAndDelete({ name });

    if (!deletedPokeball) {
      return res.status(404).json({ message: 'Pokeball not found' });
    }

    res.json({ message: 'Pokeball deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pokeball' });
  }
}

const addNewPokeball = async (req, res) => {
  try {
    const pokeball = new Pokeball(req.body);
    const newPokeball = await pokeball.save();

    res.status(201).json(newPokeball);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export { getAllPokeballs, getPokeballByName, updatePokeballQuantity, deletePokeball, addNewPokeball};
