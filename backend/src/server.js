const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send('Has nothing here yet')
});

app.listen(8888, console.log("Running on port 8888"));