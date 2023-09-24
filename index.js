const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors())
//parser for body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/openai', require('./routes/openaiRoutes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})  