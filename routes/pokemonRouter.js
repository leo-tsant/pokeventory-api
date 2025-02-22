import express from 'express';
import {
  getAllPokemon,
  getPokemonPage,
  getPokemonByPokedexNumber,
  getPokemonByName,
  deletePokemonByPokedexNumber,
  deletePokemonByName,
  addNewPokemon,
} from '../controllers/pokemonController.js';

const pokemonRouter = express.Router();

// GET all Pokémon
pokemonRouter.get('/', getAllPokemon);

// GET page of Pokémon
pokemonRouter.get('/page', getPokemonPage);

// GET a single Pokémon by Pokédex number
pokemonRouter.get('/:pokedexNumber', getPokemonByPokedexNumber);

// GET a single Pokémon by name
pokemonRouter.get('/name/:name', getPokemonByName);

// DELETE a Pokémon by Pokédex number
pokemonRouter.delete('/delete/:pokedexNumber', deletePokemonByPokedexNumber);

// DELETE a Pokémon by name
pokemonRouter.delete('/delete/:name', deletePokemonByName);

// POST request to add a new Pokémon
pokemonRouter.post('/add/:name', addNewPokemon);

export default pokemonRouter;
