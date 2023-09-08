const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let data = []; // Sample data storage (replace with a database in production)

// Create (POST) operation
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Read (GET) operation - Retrieve all items
app.get('/api/items', (req, res) => {
  res.json(data);
});

// Read (GET) operation - Retrieve a single item by ID
app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const item = data.find(item => item.id === id);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});

// Update (PUT) operation
app.put('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    data[index] = updatedItem;
    res.json(updatedItem);
  }
});

// Create (POST) operation - Create a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  if (!newItem || !newItem.name) {
    res.status(400).json({ error: 'Invalid data. Make sure to include a "name" field in the request body.' });
  } else {
    newItem.id = generateUniqueId(); // You can implement your own ID generation logic
    data.push(newItem);
    res.status(201).json(newItem);
  }
});

// Function to generate a unique ID (you can use a library like uuid in production)
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Delete (DELETE) operation
app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    const deletedItem = data.splice(index, 1)[0];
    res.json(deletedItem);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
