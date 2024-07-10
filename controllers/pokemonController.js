import { Pokemon } from '../models/pokemon.js';
import axios from 'axios';

const getAllPokemon = async (req, res) => {
	try {
		const pokemon = await Pokemon.find();
		res.json(pokemon);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getPokemonPage = async (req, res) => {
	try {
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 20;
		const skip = (page - 1) * limit;

		// Fetch Pokémon data with pagination
		const [pokemon, total] = await Promise.all([
			Pokemon.find().skip(skip).limit(limit), // Fetch Pokémon with skip and limit
			Pokemon.countDocuments() // Count total Pokémon documents
		]);

		res.json({ data: pokemon, total });
	} catch (error) {
		console.error("Error fetching Pokémon data:", error);
		res.status(500).json({ message: "Failed to fetch Pokémon data." });
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

const deletePokemonByName = async (req, res) => {
	try {
		const name = req.params.name;

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

const addNewPokemon = async (req, res) => {
	try {
		const { name } = req.params;

		// Fetch data from PokeAPI
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
		const pokemonDetails = response.data;

		// Create a new Pokémon instance with the fetched data
		const pokemonInstance = new Pokemon({
			name: pokemonDetails.name || 'Unknown',
			pokedexNumber: pokemonDetails.id || 0,
			primaryType: pokemonDetails.types[0]?.type.name || 'Unknown',
			secondaryType: pokemonDetails.types[1]?.type.name || undefined,
			baseStats: {
				hp: pokemonDetails.stats[0]?.base_stat || 0,
				attack: pokemonDetails.stats[1]?.base_stat || 0,
				defense: pokemonDetails.stats[2]?.base_stat || 0,
				specialAttack: pokemonDetails.stats[3]?.base_stat || 0,
				specialDefense: pokemonDetails.stats[4]?.base_stat || 0,
				speed: pokemonDetails.stats[5]?.base_stat || 0,
			},
			cryUrl: pokemonDetails.cries.latest || null,
			spriteUrl: pokemonDetails.sprites.front_default || 'https://via.placeholder.com/150',
			canBeDeleted: true,
		});

		// Save to database
		await pokemonInstance.save();

		res.status(201).json(pokemonInstance);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			res.status(404).json({ error: 'Pokémon not found' });
		} else if (error.code === 11000) { // Duplicate key error
			res.status(400).json({ error: 'Pokémon already exists in the database' });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
};

export { getAllPokemon, getPokemonByPokedexNumber, getPokemonByName, deletePokemonByPokedexNumber, deletePokemonByName, addNewPokemon, getPokemonPage };
