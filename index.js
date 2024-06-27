import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './utils/config.js';
import logger from './utils/logger.js';

import pokemonRouter from './routes/pokemonRouter.js';
import berriesRouter from './routes/berriesRouter.js';
import battleItemsRouter from './routes/battleItemsRouter.js';
import healingItemsRouter from './routes/healingItemsRouter.js';
import heldItemsRouter from './routes/heldItemsRouter.js';
import pokeballsRouter from './routes/pokeballsRouter.js';

const app = express();
const PORT = config.PORT || 5000;

// Connect to database
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use('/api/pokemon', pokemonRouter);
app.use('/api/berries', berriesRouter);
app.use('/api/battle-items', battleItemsRouter);
app.use('/api/healing-items', healingItemsRouter);
app.use('/api/held-items', heldItemsRouter);
app.use('/api/pokeballs', pokeballsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
