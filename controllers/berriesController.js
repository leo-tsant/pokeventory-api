import { Berry } from "../models/berry.js";

const getAllBerries = async (req, res) => {
    try {
        const berries = await Berry.find();
        res.json(berries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getBerryByName = async (req, res) => {
    try {
        const name = req.params.name;
        const berry = await Berry.findOne({ name: name });

        if (!berry) {
            return res.status(404).json({ message: 'Berry not found' });
        }

        res.json(berry);
    }
    catch (err) {
        console.error('Error fetching Berry:', err.message);
        res.status(500).json({ error: 'Failed to fetch Berry' });
    }
}

export { getAllBerries, getBerryByName };