const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongo Model Schema
const TodoSchema = new mongoose.Schema({
    itemName: String,
    itemDescription: String
});
const Todo = mongoose.model('Todo', TodoSchema);

// Route to handle POST submission
app.post('/submittodoitem', async (req, res) => {
    try {
        const { itemName, itemDescription } = req.body;
        const newTodo = new Todo({ itemName, itemDescription });
        await newTodo.save();
        res.status(200).json({ message: "Item saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving item" });
    }
});
