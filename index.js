require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/school', schoolRoutes);

const PORT = process.env.PORT || 8080;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database!');
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
    })
    .catch((err) => console.log(err));