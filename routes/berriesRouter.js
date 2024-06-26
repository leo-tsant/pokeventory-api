import express from 'express';
import { getAllBerries, getBerryByName } from '../controllers/berriesController.js';

const berriesRouter = express.Router();

// GET all Berries
berriesRouter.get('/', getAllBerries);

// GET a single Berry by name
berriesRouter.get('/:name', getBerryByName);

export default berriesRouter;