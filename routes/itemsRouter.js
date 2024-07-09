import express from 'express';
import { getAllItems, getItemPage, getItemByName, createItem, updateItem, deleteItem } from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllItems);

router.get('/page', getItemPage);

router.get('/:name', getItemByName);

router.post('/', createItem);

router.patch('/:name', updateItem);

router.delete('/:name', deleteItem);

export default router;