const aboutusdetails = require('../models/aboutus');

const createAboutUs = async (req, res) => {
  const addData = {
    aboutus_head: req.body.aboutus_head,
    aboutus_des: req.body.aboutus_des,
    checkbox1: req.body.checkbox1,
    checkbox2: req.body.checkbox2,
    checkbox3: req.body.checkbox3,
    checkbox4: req.body.checkbox4,
    pro_com_txt: req.body.pro_com_txt,
    pro_com_num: req.body.pro_com_num,
    yrs_of_exp_txt: req.body.yrs_of_exp_txt,
    yrs_of_exp_txt_num: req.body.yrs_of_exp_txt_num,
    team_mem_txt: req.body.team_mem_txt,
    team_mem_num: req.body.team_mem_num
  };

  if (req.files) {
    if (req.files.img1) {
      addData.img1 = req.files.img1[0].filename;
    }
    if (req.files.img2) {
      addData.img2 = req.files.img2[0].filename;
    }
  }

  try {
    const aboutus = await aboutusdetails.create(addData);
    res.status(200).json(aboutus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewLatestAboutUs = async (req, res) => {
  try {
    const latestAboutUs = await aboutusdetails.findOne().sort({ _id: -1 });
    res.status(200).json(latestAboutUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAboutUs = async (req, res) => {
  console.log('Received update request with ID:', req.params.id);
  console.log('Request body:', req.body);
  console.log('Uploaded files:', req.files);

  const id = req.params.id;
  const updateData = {
    aboutus_head: req.body.aboutus_head,
    aboutus_des: req.body.aboutus_des,
    checkbox1: req.body.checkbox1,
    checkbox2: req.body.checkbox2,
    checkbox3: req.body.checkbox3,
    checkbox4: req.body.checkbox4,
    pro_com_txt: req.body.pro_com_txt,
    pro_com_num: req.body.pro_com_num,
    yrs_of_exp_txt: req.body.yrs_of_exp_txt,
    yrs_of_exp_txt_num: req.body.yrs_of_exp_txt_num,
    team_mem_txt: req.body.team_mem_txt,
    team_mem_num: req.body.team_mem_num
  };

  if (req.files) {
    if (req.files.img1) {
      updateData.img1 = req.files.img1[0].filename;
    }
    if (req.files.img2) {
      updateData.img2 = req.files.img2[0].filename;
    }
  }

  try {
    const user = await aboutusdetails.findByIdAndUpdate(id, updateData, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'About Us entry not found' });
    }
  } catch (err) {
    console.error('Error updating About Us entry:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteAboutUs = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await aboutusdetails.findByIdAndDelete({ _id: id });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const viewAllAboutUs = async (req, res) => {
  try {
    const aboutusList = await aboutusdetails.find();
    res.status(200).json(aboutusList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewAboutUsById = async (req, res) => {
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
};

module.exports = {
  createAboutUs,
  viewLatestAboutUs,
  updateAboutUs,
  deleteAboutUs,
  viewAllAboutUs,
  viewAboutUsById
};
