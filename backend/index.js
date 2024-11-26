const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); 
const logger = require('./middleware/logger'); 
const questionsRoutes = require('./routes/questions'); 

const app = express();
const port = 3000;


app.use(cors()); 
app.use(express.json()); 
app.use(logger); 


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/questions', questionsRoutes);


app.get('/', (req, res) => {
  res.send('Сервер працює!');
});


app.use((req, res, next) => {
  res.status(404).json({ message: 'Маршрут не знайдено' });
});

app.use((err, req, res, next) => {
  console.error('Сталася помилка:', err.message);
  res.status(500).json({ message: 'Внутрішня помилка сервера' });
});


app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});
