const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();


// Init middleware
// app.use(logger);

// Gets all Members in the members array
app.get('/api/members', (req, res) => {
  res.json(members);
});

// Get a single member by ID
app.get('/api/members/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found){
  res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member ID ${req.params.id} not found` });
  }
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
