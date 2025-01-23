const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Middleware for logging request methods and URLs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route GET /
app.get('/', (req, res) => {
  res.send('Hello from Express.js!');
});

// Route GET /user/:id
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User with ID: ${userId}`);
});

// Route POST /submit
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }

  res.send(`Received data: Name - ${name}, Email - ${email}`);
});

// Handle 404 (Not Found)
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});