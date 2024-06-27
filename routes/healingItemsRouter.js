import express from 'express';
import {
  getAllHealingItems,
  getHealingItemByName,
  updateHealingItemQuantity
} from '../controllers/healingItemsController.js';

const healingItemsRouter = express.Router();

healingItemsRouter.get('/', getAllHealingItems);

healingItemsRouter.get('/:name', getHealingItemByName);

healingItemsRouter.patch('/:name', updateHealingItemQuantity);

export default healingItemsRouter;