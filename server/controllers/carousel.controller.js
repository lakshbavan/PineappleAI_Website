
const UserModel = require('../models/tbl');

const getCarousel = async (req, res) => {
  try {
    const carousel = await UserModel.find({});
    console.log(carousel); // Log the query results
    res.json(carousel);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

const addCarousel = async (req, res) => {
  try {
    const newdata = new UserModel({
      carousel_img_1: req.file ? req.file.filename : null,
      carousel_des_1: req.body.carousel_des_1,
    });
    const user = await newdata.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCarousel = async (req, res) => {
  try {
    const updatedData = {
      carousel_des_1: req.body.carousel_des_1,
    };
    if (req.file) {
      updatedData.carousel_img_1 = req.file.filename;
    }
    const result = await UserModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCarousel = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getCarousel,
  addCarousel,
  updateCarousel,
  deleteCarousel,
};
