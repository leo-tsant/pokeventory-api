import express from 'express';
import { getAllPokemon, getPokemonByPokedexNumber, getPokemonByName } from '../controllers/pokemonController.js';

const pokemonRouter = express.Router();

// GET all Pokémon
pokemonRouter.get('/', getAllPokemon);

// GET a single Pokémon by Pokédex number
pokemonRouter.get('/:pokedexNumber', getPokemonByPokedexNumber);

//GET a single Pokémon by name
pokemonRouter.get('/name/:name', getPokemonByName);

export default pokemonRouter;