// Import dependencies
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());            // allow frontend requests
app.use(express.json());    // parse JSON bodies

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
