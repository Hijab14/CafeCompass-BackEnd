import Order from "../models/OrdersModel.js";

export const addOrder = async (req, res) => {
    try {
        const { userEmail, date, cafeName, total, items } = req.body;

        // Assuming items is an array of objects containing productName, userQuantity, price, and category

        const newOrder = new Order({
            userEmail,
            date,
            cafeName,
            total,
            items,
            status: 'in-progress' // Set status to default "in-progress"
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};