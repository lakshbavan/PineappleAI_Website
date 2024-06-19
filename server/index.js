const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/tbl')
const app = express()
app.use(cors())
app.use(express.json())

// db Connection
mongoose.connect("mongodb+srv://diyadivya079:AJlao1jTLjGzyX6q@cluster0.axlaqmd.mongodb.net/Website?retryWrites=true&w=majority&appName=Cluster0")

app.get('/api/carousel', async (req, res) => {
    try {
        console.log('Request received at /api/carousel');
        const UserModel = await Carousel.findOne();
        res.json(UserModel);
      } catch (err) {
        console.error('Error fetching carousel data:', err);
        res.status(500).send(err);
      }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
