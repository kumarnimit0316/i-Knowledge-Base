const connectToMongo = require('./db');
const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
connectToMongo();
const app = express();
app.use(express.json());
app.use(cors());


const port = 5000;

//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`knowledge-base-backend app listening on port ${port}`)
});