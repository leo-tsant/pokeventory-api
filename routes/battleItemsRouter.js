import express from 'express';
import { getBattleItems, getBattleItemByName, updateBattleItemQuantity, deleteBattleItem, addNewBattleItem } from '../controllers/battleItemsController.js';

const battleItemsRouter = express.Router();

battleItemsRouter.get('/', getBattleItems);

battleItemsRouter.get('/:name', getBattleItemByName);

battleItemsRouter.patch('/:name', updateBattleItemQuantity);

battleItemsRouter.delete('/:name', deleteBattleItem);

battleItemsRouter.post('/', addNewBattleItem);
export default battleItemsRouter;
