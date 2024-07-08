import express from 'express';
import { getItemPage } from '../controllers/allItemsController.js';

const router = express.Router();

router.get('/page', getItemPage);

export default router;