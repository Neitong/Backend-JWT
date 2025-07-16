import express from 'express';

const router = express.Router();


router.get('/dashboard', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ];
  res.json(users);
});

export default router;