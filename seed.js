// Populate the database with Pokémon and items from the PokéAPI

import mongoose from 'mongoose';
import axios from 'axios';
import { Pokemon } from './models/pokemon.js';
// import { Item } from './models/item.js';

import config from './utils/config.js'; // Assuming your config file is in the 'utils' folder

const fetchPokemonData = async () => {
  // Fetch Generation 1 Pokémon data from PokéAPI
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=151',
  );
  const data = response.data.results;

  const pokemonData = await Promise.all(
    data.map(async (pokemon) => {
      const pokemonResponse = await axios.get(pokemon.url);
      const pokemonDetails = pokemonResponse.data;

      // Create a Pokemon instance with defaults if necessary
      const pokemonInstance = new Pokemon({
        name: pokemonDetails.name || 'Unknown',
        pokedexNumber: pokemonDetails.id || 0,
        primaryType: pokemonDetails.types[0]?.type.name || 'Unknown',
        secondaryType: pokemonDetails.types[1]?.type.name || undefined,
        baseStats: {
          hp: pokemonDetails.stats[0]?.base_stat || 0,
          attack: pokemonDetails.stats[1]?.base_stat || 0,
          defense: pokemonDetails.stats[2]?.base_stat || 0,
          specialAttack: pokemonDetails.stats[3]?.base_stat || 0,
          specialDefense: pokemonDetails.stats[4]?.base_stat || 0,
          speed: pokemonDetails.stats[5]?.base_stat || 0,
        },
        cryUrl: pokemonDetails.cries.latest || null,
        spriteUrl:
          pokemonDetails.sprites.front_default ||
          'https://via.placeholder.com/150',
        canBeDeleted: false,
      });

      // Validate and then return
      await pokemonInstance.validate(); // This will apply the default values if needed
      return pokemonInstance;
    }),
  );

  return pokemonData;
};

// const fetchBattleItemData = async () => {
//   const response = await axios.get('https://pokeapi.co/api/v2/item-category/1/');
//   const data = response.data.items;

//   const itemData = await Promise.all(
//     data.map(async (item) => {
//       const itemResponse = await axios.get(item.url);
//       const itemDetails = itemResponse.data;

//       const itemInstance = new Item({
//         name: itemDetails.name || 'Unknown',
//         category: 'battle',
//         effect: itemDetails.effect_entries.find((entry) => entry.language.name === 'en')?.effect || 'Unknown',
//         spriteUrl: itemDetails.sprites.default || 'https://via.placeholder.com/150',
//         quantity: Math.floor(Math.random() * 10) + 1,
//       });

//       try {
//         await itemInstance.validate();
//         await itemInstance.save();
//       } catch (error) {
//         if (error.code !== 11000) { // Ignore duplicate key error
//           throw error;
//         }
//       }
//       return itemInstance;
//     })
//   );

//   return itemData;
// };

// const fetchBerryData = async () => {
//   const response = await axios.get('https://pokeapi.co/api/v2/berry?limit=64');
//   const data = response.data.results;

//   const berryData = await Promise.all(
//     data.map(async (berry) => {
//       const berryResponse = await axios.get(berry.url);
//       const berryDetails = berryResponse.data;

//       const berryDetailsResponse = await axios.get(berryDetails.item.url);

//       const berryEffect = berryDetailsResponse.data.flavor_text_entries.find((entry) => entry.language.name === 'en')?.text || 'Unknown';
//       const berrySprite = berryDetailsResponse.data.sprites.default;

//       const itemInstance = new Item({
//         name: berryDetails.name || 'Unknown',
//         category: 'berry',
//         effect: berryEffect.split('\n').join(' '),
//         spriteUrl: berrySprite || 'https://via.placeholder.com/150',
//         quantity: Math.floor(Math.random() * 30) + 1,
//       });

//       try {
//         await itemInstance.validate();
//         await itemInstance.save();
//       } catch (error) {
//         if (error.code !== 11000) { // Ignore duplicate key error
//           throw error;
//         }
//       }
//       return itemInstance;
//     })
//   );

//   return berryData;
// };

// const fetchHeldItemData = async (limit = 40) => {
//   const response = await axios.get('https://pokeapi.co/api/v2/item-category/12');
//   const heldItemCategoryDetails = response.data;
//   const heldItemIds = heldItemCategoryDetails.items.map((item) => item.name);

//   const heldItemData = await Promise.all(
//     heldItemIds.slice(0, limit).map(async (heldItemName) => {
//       const heldItemResponse = await axios.get(`https://pokeapi.co/api/v2/item/${heldItemName}/`);
//       const heldItemDetails = heldItemResponse.data;

//       const itemInstance = new Item({
//         name: heldItemDetails.name,
//         category: 'held',
//         effect: heldItemDetails.flavor_text_entries.find((entry) => entry.language.name === 'en')?.text.split('\n').join(' ') || 'Unknown',
//         spriteUrl: heldItemDetails.sprites.default,
//         quantity: Math.floor(Math.random() * 3) + 1,
//       });

//       try {
//         await itemInstance.validate();
//         await itemInstance.save();
//       } catch (error) {
//         if (error.code !== 11000) { // Ignore duplicate key error
//           throw error;
//         }
//       }
//       return itemInstance;
//     })
//   );

//   return heldItemData;
// };

// const fetchPokeballData = async () => {
//   const standardBallsResponse = await axios.get('https://pokeapi.co/api/v2/item-category/34');
//   const specialBallsResponse = await axios.get('https://pokeapi.co/api/v2/item-category/33');
//   const apricornBallsResponse = await axios.get('https://pokeapi.co/api/v2/item-category/39');

//   const standardBalls = standardBallsResponse.data.items;
//   const specialBalls = specialBallsResponse.data.items;
//   const apricornBalls = apricornBallsResponse.data.items;

//   const pokeballData = await Promise.all(
//     [...standardBalls, ...specialBalls, ...apricornBalls].map(async (ball) => {
//       const ballResponse = await axios.get(ball.url);
//       const ballDetails = ballResponse.data;

//       const itemInstance = new Item({
//         name: ballDetails.name || 'Unknown',
//         category: 'pokeball',
//         effect: ballDetails.flavor_text_entries.find((entry) => entry.language.name === 'en')?.text.split('\n').join(' ') || 'Unknown',
//         spriteUrl: ballDetails.sprites.default || 'https://via.placeholder.com/150',
//         quantity: Math.floor(Math.random() * 50) + 1,
//       });

//       try {
//         await itemInstance.validate();
//         await itemInstance.save();
//       } catch (error) {
//         if (error.code !== 11000) { // Ignore duplicate key error
//           throw error;
//         }
//       }
//       return itemInstance;
//     })
//   );

//   return pokeballData;
// };

// const fetchHealingItemData = async () => {
//   const first100ItemsResponse = await axios.get('https://pokeapi.co/api/v2/item?offset=0&limit=100');
//   const first100Items = first100ItemsResponse.data.results;

//   const healingItems = await Promise.all(
//     first100Items.map(async (item) => {
//       const itemResponse = await axios.get(item.url);
//       const itemDetails = itemResponse.data;

//       if (itemDetails.category.name === 'healing') {
//         const effectEntry = itemDetails.flavor_text_entries.find((entry) => entry.language.name === 'en');
//         const effect = effectEntry && effectEntry.text ? effectEntry.text.split('\n').join(' ') : 'Unknown';

//         const itemInstance = new Item({
//           name: itemDetails.name || 'Unknown',
//           category: 'healing',
//           effect,
//           spriteUrl: itemDetails.sprites.default || 'https://via.placeholder.com/150',
//           quantity: Math.floor(Math.random() * 20) + 1,
//         });

//         try {
//           await itemInstance.validate();
//           await itemInstance.save();
//         } catch (error) {
//           if (error.code !== 11000) { // Ignore duplicate key error
//             throw error;
//           }
//         }
//         return itemInstance;
//       } else {
//         return null;
//       }
//     })
//   );

//   return healingItems.filter((item) => item !== null);
// };

mongoose
  .connect(config.MONGO_URI, {
    /* options */
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    const pokemonData = await fetchPokemonData();
    // const battleItemData = await fetchBattleItemData();
    // const berryData = await fetchBerryData();
    // const heldItemData = await fetchHeldItemData();
    // const pokeballData = await fetchPokeballData();
    // const healingItemData = await fetchHealingItemData();

    return Promise.all([
      Pokemon.insertMany(pokemonData),
      // Item.insertMany([...battleItemData, ...berryData, ...heldItemData, ...pokeballData, ...healingItemData]),
    ]);
  })
  .then(() => {
    console.log('Database seeded successfully!');
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
  })
  .finally(() => {
    mongoose.disconnect();
  });
