import express from 'express';
import { getBattleItems, getBattleItemByName, updateBattleItemQuantity, deleteBattleItem } from '../controllers/battleItemsController.js';

const battleItemsRouter = express.Router();

battleItemsRouter.get('/', getBattleItems);

battleItemsRouter.get('/:name', getBattleItemByName);

battleItemsRouter.patch('/:name', updateBattleItemQuantity);

battleItemsRouter.delete('/:name', deleteBattleItem);

export default battleItemsRouter;
