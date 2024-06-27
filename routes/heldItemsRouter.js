import express from 'express';
import {
  getAllHeldItems,
  getHeldItemByName,
  updateHeldItemQuantity, 
  deleteHeldItem,
  addNewHeldItem,
} from '../controllers/heldItemsController.js';

const heldItemsRouter = express.Router();

heldItemsRouter.get('/', getAllHeldItems);

heldItemsRouter.get('/:name', getHeldItemByName);

heldItemsRouter.patch('/:name', updateHeldItemQuantity);

heldItemsRouter.delete('/:name', deleteHeldItem);

heldItemsRouter.post('/', addNewHeldItem);

export default heldItemsRouter;
