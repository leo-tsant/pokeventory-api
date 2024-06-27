import express from 'express';
import { getBattleItems, getBattleItemByName, updateBattleItemQuantity } from '../controllers/battleItemsController.js';

const battleItemsRouter = express.Router();

battleItemsRouter.get('/', getBattleItems);

battleItemsRouter.get('/:name', getBattleItemByName);

battleItemsRouter.patch('/:name', updateBattleItemQuantity);

export default battleItemsRouter;
