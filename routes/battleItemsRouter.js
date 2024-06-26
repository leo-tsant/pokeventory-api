import express from 'express';
import { getBattleItems } from '../controllers/battleItemsController.js';

const battleItemsRouter = express.Router();

battleItemsRouter.get('/', getBattleItems);

export default battleItemsRouter;