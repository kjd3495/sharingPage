const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const user_inform = require('./routes/user_inform');
const cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/user_inform', user_inform);
const port = 3001;
app.listen(port, () => console.log(`Node.js Server is running on port ${port}...`));
