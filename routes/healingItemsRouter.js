import express from 'express';
import { getAllHealingItems, getHealingItemByName } from '../controllers/healingItemsController.js';

const healingItemsRouter = express.Router();

healingItemsRouter.get('/', getAllHealingItems);

healingItemsRouter.get('/:name', getHealingItemByName);

export default healingItemsRouter;