import mongoose from 'mongoose';
import axios from 'axios';
import { Pokemon } from './models/pokemon.js';
import { HealingItem } from './models/healingItem.js';
import { BattleItem } from './models/battleItem.js';
import { Berry } from './models/berry.js';
import { HeldItem } from './models/heldItem.js';
import { Pokeball } from './models/pokeball.js';
import config from './utils/config.js'; // Assuming your config file is in the 'utils' folder

const fetchPokemonData = async () => {
    // Fetch Generation 1 Pokémon data from PokéAPI
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
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
                    speed: pokemonDetails.stats[5]?.base_stat || 0
                },
                spriteUrl: pokemonDetails.sprites.front_default || 'https://via.placeholder.com/150',
            });

            // Validate and then return
            await pokemonInstance.validate(); // This will apply the default values if needed
            return pokemonInstance;
        })
    );

    return pokemonData;
};

const fetchBattleItemData = async () => {
    // Fetch Generation 1 battle items data from PokéAPI
    const response = await axios.get('https://pokeapi.co/api/v2/item-category/1/');
    const data = response.data.items;

    const battleItemData = await Promise.all(
        data.map(async (item) => {
            const itemResponse = await axios.get(item.url);
            const itemDetails = itemResponse.data;

            // Create a BattleItem instance with defaults if necessary
            const battleItemInstance = new BattleItem({
                name: itemDetails.name || 'Unknown',
                // Get the first english effect entry
                effect: itemDetails.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'Unknown',
                spriteUrl: itemDetails.sprites.default || 'https://via.placeholder.com/150',
                quantity: Math.floor(Math.random() * 10) + 1
            });

            // Validate and then return
            await battleItemInstance.validate(); // This will apply the default values if needed
            return battleItemInstance;
        })
    );

    return battleItemData;
}

const fetchBerryData = async () => {
    // Fetch Generation 1 berries data from PokéAPI
    const response = await axios.get('https://pokeapi.co/api/v2/berry?limit=64');
    const data = response.data.results;

    const berryData = await Promise.all(
        data.map(async (berry) => {
            const berryResponse = await axios.get(berry.url);
            const berryDetails = berryResponse.data;

            const berryDetailsResponse = await axios.get(berryDetails.item.url);

            const berryEffect = berryDetailsResponse.data.flavor_text_entries.find(entry => entry.language.name === 'en')?.text || 'Unknown';
            const berrySprite = berryDetailsResponse.data.sprites.default;

            // Create a Berry instance with defaults if necessary
            const berryInstance = new Berry({
                name: berryDetails.name || 'Unknown',
                effect: berryEffect.split('\n').join(' '),
                spriteUrl: berrySprite || 'https://via.placeholder.com/150',
                quantity: Math.floor(Math.random() * 30) + 1
            });

            // Validate and then return
            await berryInstance.validate(); // This will apply the default values if needed
            return berryInstance;
        })
    );

    return berryData;
}

const fetchHeldItemData = async (limit = 40) => {
    const response = await axios.get('https://pokeapi.co/api/v2/item-category/12');
    const heldItemCategoryDetails = response.data;
    const heldItemIds = heldItemCategoryDetails.items.map(item => item.name);

    const heldItemData = await Promise.all(
        heldItemIds.slice(0, limit).map(async (heldItemName) => {
            const heldItemResponse = await axios.get(`https://pokeapi.co/api/v2/item/${heldItemName}/`);
            const heldItemDetails = heldItemResponse.data;

            // Create an Item instance (you'll need to define an Item model)
            const itemInstance = new HeldItem({
                name: heldItemDetails.name,
                effect: heldItemDetails.flavor_text_entries.find(entry => entry.language.name === 'en')?.text.split('\n').join(' ') || 'Unknown',
                spriteUrl: heldItemDetails.sprites.default,
                quantity: Math.floor(Math.random() * 3) + 1,
            });

            await itemInstance.validate();
            return itemInstance;
        })
    );

    return heldItemData;
};

const fetchPokeballData = async () => {
    const standardBallsResponse = await axios.get('https://pokeapi.co/api/v2/item-category/34');
    const specialBallsResponse = await axios.get('https://pokeapi.co/api/v2/item-category/33');
    const apricornBallsResponse = await axios.get('https://pokeapi.co/api/v2/item-category/39');

    const standardBalls = standardBallsResponse.data.items;
    const specialBalls = specialBallsResponse.data.items;
    const apricornBalls = apricornBallsResponse.data.items;

    const pokeballData = await Promise.all(
        [...standardBalls, ...specialBalls, ...apricornBalls].map(async (ball) => {
            const ballResponse = await axios.get(ball.url);
            const ballDetails = ballResponse.data;

            const ballEffect = ballDetails.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'Unknown';
            const ballSprite = ballDetails.sprites.default;

            const pokeballInstance = new Pokeball({
                name: ballDetails.name || 'Unknown',
                description: ballDetails.flavor_text_entries.find(entry => entry.language.name === 'en')?.text.split('\n').join(' ') || 'Unknown',
                spriteUrl: ballDetails.sprites.default || 'https://via.placeholder.com/150',
                quantity: Math.floor(Math.random() * 50) + 1
            });

            await pokeballInstance.validate();
            return pokeballInstance;
        })
    );

    return pokeballData;
}

const fetchHealingItemData = async () => {
    const first100ItemsResponse = await axios.get('https://pokeapi.co/api/v2/item?offset=0&limit=100');
    const first100Items = first100ItemsResponse.data.results;

    const healingItems = await Promise.all(first100Items.map(async (item) => {
        const itemResponse = await axios.get(item.url);
        const itemDetails = itemResponse.data;

        if (itemDetails.category.name === 'healing') {
            const effectEntry = itemDetails.flavor_text_entries.find(entry => entry.language.name === 'en');
            const effect = effectEntry && effectEntry.text ? effectEntry.text.split('\n').join(' ') : 'Unknown';

            const healingItemInstance = new HealingItem({
                name: itemDetails.name || 'Unknown',
                effect,
                spriteUrl: itemDetails.sprites.default || 'https://via.placeholder.com/150',
                quantity: Math.floor(Math.random() * 20) + 1
            });

            try {
                await healingItemInstance.validate();
                return healingItemInstance;
            } catch (validationError) {
                console.error('Validation error:', validationError);
                return null;
            }
        } else {
            return null;
        }
    }));

    return healingItems.filter(item => item !== null);
};



mongoose.connect(config.MONGO_URI, { /* options */ })
    .then(async () => {
        console.log('Connected to MongoDB');

        const pokemonData = await fetchPokemonData();
        const berryData = await fetchBerryData();
        const battleItemData = await fetchBattleItemData();
        const heldItemData = await fetchHeldItemData();
        const pokeballData = await fetchPokeballData();
        const healingItemData = await fetchHealingItemData();

        return Promise.all([
            Pokemon.insertMany(pokemonData),
            BattleItem.insertMany(battleItemData),
            Berry.insertMany(berryData),
            HeldItem.insertMany(heldItemData),
            Pokeball.insertMany(pokeballData),
            HealingItem.insertMany(healingItemData)
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
