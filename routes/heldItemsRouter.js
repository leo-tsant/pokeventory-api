import express from 'express';
import { getAllHeldItems, getHeldItemByName } from '../controllers/heldItemsController.js';

const heldItemsRouter = express.Router();

heldItemsRouter.get('/', getAllHeldItems);

heldItemsRouter.get('/:name', getHeldItemByName);

export default heldItemsRouter;