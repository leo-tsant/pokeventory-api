import express from 'express';
import {
  getAllBerries,
  getBerryByName,
  updateBerryQuantity, 
  deleteBerry, 
  addNewBerry,
} from '../controllers/berriesController.js';

const berriesRouter = express.Router();

// GET all Berries
berriesRouter.get('/', getAllBerries);

// GET a single Berry by name
berriesRouter.get('/:name', getBerryByName);

// PATCH request to update a Berry's quantity
berriesRouter.patch('/:name', updateBerryQuantity);

// DELETE request to delete a Berry
berriesRouter.delete('/:name', deleteBerry);

// POST request to add a new Berry
berriesRouter.post('/', addNewBerry);

export default berriesRouter;
