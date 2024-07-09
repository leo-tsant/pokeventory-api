import { Item } from '../models/item.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getItemPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            Item.find().skip(skip).limit(limit),
            Item.countDocuments()
        ]);

        res.json({ data: items, total });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getItemByName = async (req, res) => {
    try {
        const { name } = req.params;

        // Search for items in the items collection:
        const items = await Item.find({ name });

        // Return the items found:
        if (items.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();

        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const updateItem = async (req, res) => {
    try {
        const { name } = req.params;
        const { quantity } = req.body;

        const item = await Item.findOneAndUpdate({ name }, { quantity }, { new: true });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const { name } = req.params;
        const deletedItem = await Item.findOneAndDelete({ name });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

