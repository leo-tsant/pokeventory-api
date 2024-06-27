import { Pokeball } from '../models/pokeball.js';

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

export { getAllPokeballs, getPokeballByName, updatePokeballQuantity};
