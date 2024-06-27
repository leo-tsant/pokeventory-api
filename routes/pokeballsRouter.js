import express from 'express';
import {
  getAllPokeballs,
  getPokeballByName,
  updatePokeballQuantity, deletePokeball
} from '../controllers/pokeballsController.js';

const pokeballsRouter = express.Router();

pokeballsRouter.get('/', getAllPokeballs);

pokeballsRouter.get('/:name', getPokeballByName);

pokeballsRouter.patch('/:name', updatePokeballQuantity);

pokeballsRouter.delete('/:name', deletePokeball);

export default pokeballsRouter;
