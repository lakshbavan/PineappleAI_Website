const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');


const aboutusdetails = require('./models/aboutus');


const app=express();
app.use(cors())
app.use(express.json())


///create
app.post("/aboutus/create", async (req, res) => {
  try {
      
      const aboutus = await aboutusdetails.create(req.body);
      res.status(200).json(aboutus);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// view by id
app.get("/aboutus/view/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const aboutusDetail = await aboutusdetails.findById(id);
      if (aboutusDetail) {
          res.status(200).json(aboutusDetail);
      } else {
          res.status(404).json({ message: "About Us entry not found" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



//view1


app.get("/aboutus/view1", async (req, res) => {
  try {
      // Assuming '_id' can be used to determine the order of insertion
      const latestAboutUs = await aboutusdetails.findOne().sort({ _id: -1 }); // Sort in descending order and limit to 1
      res.status(200).json(latestAboutUs);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

//view all
app.get('/aboutus/viewall', async (req, res) => {
  try {
      const aboutusList = await aboutusdetails.find(); 
      res.status(200).json(aboutusList); 
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



//update
app.put('/aboutus/update/:id', (req, res) => {
    const id = req.params.id;
    
    aboutusdetails.findByIdAndUpdate({_id:id},{
        aboutus_head:req.body.aboutus_head,
        aboutus_des:req.body.aboutus_des,
        img1:req.body.img1,
        img2:req.body.img2,
        checkbox:req.body.checkbox,
        pro_com_txt:req.body.pro_com_txt,
        pro_com_num:req.body.pro_com_num,
        yrs_of_exp_txt:req.body.yrs_of_exp_txt,
        yrs_of_exp_txt_num:req.body.yrs_of_exp_txt_num,
        team_mem_txt:req.body.team_mem_txt,
        team_mem_num :req.body.team_mem_num
           
    })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


//delete

app.delete('/aboutus/delete/:id', (req, res) => {
    const id = req.params.id;
    
    aboutusdetails.findByIdAndDelete({_id:id})
        
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});






mongoose.connect("mongodb+srv://univetha166:nive2000@cluster0.ipidnie.mongodb.net/aboutus?retryWrites=true&w=majority&appName=Cluster0")

.then(() => {
    console.log("Connected to database!");

    app.listen(5000, () => {
        console.log("Server is running on port 5000");
      });
      
})

 .catch((error) => {
  throw new Error(error);
  console.log("Connection failed!");
  
 });



