const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
