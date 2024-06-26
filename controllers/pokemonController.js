import { Pokemon } from '../models/pokemon.js';

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
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name: name });

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokémon not found' });
        }

        res.json(pokemon);
    } catch (err) {
        console.error('Error fetching Pokémon:', err.message);
        res.status(500).json({ error: 'Failed to fetch Pokémon' });
    }
}

export { getAllPokemon, getPokemonByPokedexNumber, getPokemonByName };