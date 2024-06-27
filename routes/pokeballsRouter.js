import express from 'express';
import {
  getAllPokeballs,
  getPokeballByName,
  updatePokeballQuantity, 
  deletePokeball,
  addNewPokeball,
} from '../controllers/pokeballsController.js';

const pokeballsRouter = express.Router();

pokeballsRouter.get('/', getAllPokeballs);

pokeballsRouter.get('/:name', getPokeballByName);

pokeballsRouter.patch('/:name', updatePokeballQuantity);

pokeballsRouter.delete('/:name', deletePokeball);

pokeballsRouter.post('/', addNewPokeball);

export default pokeballsRouter;
