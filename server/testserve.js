const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Hello world'});
});

app.post('/spotify', (req, res) => {
    console.log(req.body);  
    res.json({message: 'Hello world!'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});