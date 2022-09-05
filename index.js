const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Executando Node.js dentro do container!');
});

app.listen(3000, () => {
    console.log('Server running at port 3000...')
});
