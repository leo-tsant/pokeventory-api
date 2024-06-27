import express from 'express';
import {
  getAllPokemon,
  getPokemonByPokedexNumber,
  getPokemonByName, deletePokemonByPokedexNumber, deletePokemonByname
} from '../controllers/pokemonController.js';

const pokemonRouter = express.Router();

// GET all Pokémon
pokemonRouter.get('/', getAllPokemon);

// GET a single Pokémon by Pokédex number
pokemonRouter.get('/:pokedexNumber', getPokemonByPokedexNumber);

// GET a single Pokémon by name
pokemonRouter.get('/name/:name', getPokemonByName);

// DELETE a Pokémon by Pokédex number
pokemonRouter.delete('/:pokedexNumber', deletePokemonByPokedexNumber);

// DELETE a Pokémon by name
pokemonRouter.delete('/name/:name', deletePokemonByname);

export default pokemonRouter;
