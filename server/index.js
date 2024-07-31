const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const carouselRoute = require('./routes/carousel.route');
const aboutusdetails = require('./models/aboutus');
const aboutusRoute = require('./routes/aboutusRoute.js');
const aboutus_team = require('./models/aboutus_team');
const aboutus_team_member = require('./models/aboutus_team_member');
const aboutusTeamMemberRoutes = require('./routes/aboutus_teammemberRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/aboutus',aboutusRoute)
app.use('/aboutus_teammember', aboutusTeamMemberRoutes);
// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });



// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));



// DB Connection
mongoose.connect("mongodb+srv://diyadivya079:AJlao1jTLjGzyX6q@cluster0.axlaqmd.mongodb.net/Website?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));



// routes
app.use("/api/carousel", carouselRoute(upload));



// login route
const LoginSchema = new mongoose.Schema({
  email: String,
  password: String
});
const LoginModel = mongoose.model("login", LoginSchema);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await LoginModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.json("Login Successfully");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
});




// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
