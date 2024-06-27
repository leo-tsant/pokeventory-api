import express from 'express';
import {
  getAllHeldItems,
  getHeldItemByName,
  updateHeldItemQuantity
} from '../controllers/heldItemsController.js';

const heldItemsRouter = express.Router();

heldItemsRouter.get('/', getAllHeldItems);

heldItemsRouter.get('/:name', getHeldItemByName);

heldItemsRouter.patch('/:name', updateHeldItemQuantity);

export default heldItemsRouter;
