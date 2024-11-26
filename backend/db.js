const mysql = require('mysql2');


const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "T3st!ng@2024",
  database: "kursova"
});


db.connect((err) => {
  if (err) {
    console.error('Помилка підключення до бази даних:', err);
    process.exit(1); 
  }
  console.log('Підключено до бази даних');
});

module.exports = db; 