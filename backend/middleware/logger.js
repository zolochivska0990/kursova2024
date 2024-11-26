const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'server.log');

const logger = (req, res, next) => {
  const start = Date.now(); 
  
  res.on('finish', () => {
    const duration = Date.now() - start; 
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${
      req.headers['user-agent']
    } IP: ${req.ip} ${duration}ms\n`;

    
    console.log(logMessage);

    
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Помилка запису в лог-файл:', err);
      }
    });
  });

  next(); 
};

module.exports = logger;
