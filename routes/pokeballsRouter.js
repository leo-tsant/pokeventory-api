import express from 'express';
import { getAllPokeballs, getPokeballByName } from '../controllers/pokeballsController.js';

const pokeballsRouter = express.Router();

pokeballsRouter.get('/', getAllPokeballs);

pokeballsRouter.get('/:name', getPokeballByName);

export default pokeballsRouter;