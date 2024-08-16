const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT, email TEXT)");
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { full_name, email } = req.body;

  if (!full_name || !email) {
    return res.status(400).send('Full name and email are required');
  }

  db.run("INSERT INTO users (full_name, email) VALUES (?, ?)", [full_name, email], function(err) {
    if (err) {
      return res.status(500).send('Failed to save data');
    }
    res.send('You are now connected to the WiFi!');
  });
});

// Endpoint to retrieve submitted data (for demo purposes)
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).send('Failed to retrieve data');
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
