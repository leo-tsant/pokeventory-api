import express from 'express';
import {
  getAllPokeballs,
  getPokeballByName,
  updatePokeballQuantity
} from '../controllers/pokeballsController.js';

const pokeballsRouter = express.Router();

pokeballsRouter.get('/', getAllPokeballs);

pokeballsRouter.get('/:name', getPokeballByName);

pokeballsRouter.patch('/:name', updatePokeballQuantity);

export default pokeballsRouter;
