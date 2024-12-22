const http = require('http')
const app = require('./routes/app')
const PORT = 5000


http.createServer(app).listen(PORT || 5001, () => console.log('server running on port ', PORT || 5001))
.on('error', (err) => console.log('Error: ', err.message))