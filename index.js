const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index'); 

const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});