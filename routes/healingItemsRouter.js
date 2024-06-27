import express from 'express';
import {
  getAllHealingItems,
  getHealingItemByName,
  updateHealingItemQuantity, 
  deleteHealingItem,
  addNewHealingItem,
} from '../controllers/healingItemsController.js';

const healingItemsRouter = express.Router();

healingItemsRouter.get('/', getAllHealingItems);

healingItemsRouter.get('/:name', getHealingItemByName);

healingItemsRouter.patch('/:name', updateHealingItemQuantity);

healingItemsRouter.delete('/:name', deleteHealingItem);

healingItemsRouter.post('/', addNewHealingItem);

export default healingItemsRouter;