const express = require('express');
const db = require('../db');
const router = express.Router();

// Отримання випадкових запитань
router.get('/random', (req, res) => {
  const limit = req.query.limit || 10; // Ліміт запитань
  const query = `SELECT * FROM questions ORDER BY RAND() LIMIT ?`;
  db.query(query, [parseInt(limit)], (err, results) => {
    if (err) {
      console.error('Помилка при отриманні запитань:', err);
      return res.status(500).send('Помилка на сервері');
    }
    if (results.length === 0) {
      return res.status(404).send('Запитання не знайдено');
    }
    res.json(results);
  });
});

// Отримання конкретного запитання за ID
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM questions WHERE id = ?`;
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Помилка при отриманні запитання:', err);
      return res.status(500).send('Помилка на сервері');
    }
    if (results.length === 0) {
      return res.status(404).send('Запитання не знайдено');
    }
    res.json(results[0]);
  });
});

// Додавання нового запитання
router.post('/', (req, res) => {
  const { question, options, correct_answer } = req.body;

  // Простий приклад валідації
  if (!question || !options || !correct_answer) {
    return res.status(400).send('Усі поля (question, options, correct_answer) обов’язкові');
  }

  const query = `INSERT INTO questions (question, options, correct_answer) VALUES (?, ?, ?)`;
  db.query(query, [question, JSON.stringify(options), correct_answer], (err, results) => {
    if (err) {
      console.error('Помилка при додаванні запитання:', err);
      return res.status(500).send('Помилка на сервері');
    }
    res.status(201).send('Запитання додано!');
  });
});

module.exports = router;
