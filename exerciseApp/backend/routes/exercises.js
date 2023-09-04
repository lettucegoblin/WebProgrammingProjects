const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('List of exercises');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Exercise ${id}`);
});

// Export the router
module.exports = router;