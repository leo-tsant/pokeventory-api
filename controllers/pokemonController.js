import { Pokemon } from '../models/pokemon.js';
import config from '../utils/config.js';

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

const getAllPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPokemonByPokedexNumber = async (req, res) => {
  try {
    const pokedexNumber = parseInt(req.params.pokedexNumber, 10); // Parse the ID to a number
    const pokemon = await Pokemon.findOne({ pokedexNumber });

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }

    res.json(pokemon);
  } catch (err) {
    console.error('Error fetching Pokémon:', err.message);
    res.status(500).json({ error: 'Failed to fetch Pokémon' });
  }
};

const getPokemonByName = async (req, res) => {
  try {
    const { name } = req.params;
    const pokemon = await Pokemon.findOne({ name });

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }

    res.json(pokemon);
  } catch (err) {
    console.error('Error fetching Pokémon:', err.message);
    res.status(500).json({ error: 'Failed to fetch Pokémon' });
  }
};

const deletePokemonByPokedexNumber = async (req, res) => {
  try {
      const pokedexNumber = parseInt(req.params.pokedexNumber, 10);
      const { adminPassword } = req.body; // Get the password from the request body

      if (adminPassword !== ADMIN_PASSWORD) {
          return res.status(401).json({ error: 'Incorrect admin password' });
      }

      const deletedPokemon = await Pokemon.findOneAndDelete({ pokedexNumber });

      if (!deletedPokemon) {
          return res.status(404).json({ message: 'Pokémon not found' });
      }

      res.json({ message: 'Pokémon deleted successfully' });
  } catch (err) {
      console.error('Error deleting Pokémon:', err.message);
      res.status(500).json({ error: 'Failed to delete Pokémon' });
  }
};

const deletePokemonByname = async (req, res) => {
  try {
      const name = req.params.name;
      const { adminPassword } = req.body; // Get the password from the request body

      if (adminPassword !== ADMIN_PASSWORD) {
          return res.status(401).json({ error: 'Incorrect admin password' });
      }

      const deletedPokemon = await Pokemon.findOneAndDelete({ name });

      if (!deletedPokemon) {
          return res.status(404).json({ message: 'Pokémon not found' });
      }

      res.json({ message: 'Pokémon deleted successfully' });
  } catch (err) {
      console.error('Error deleting Pokémon:', err.message);
      res.status(500).json({ error: 'Failed to delete Pokémon' });
  }
}

export { getAllPokemon, getPokemonByPokedexNumber, getPokemonByName, deletePokemonByPokedexNumber, deletePokemonByname };
