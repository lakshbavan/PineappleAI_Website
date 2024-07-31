const express = require('express');
const multer = require('multer');
const aboutUsController = require('../controllers/aboutUsController');
const router = express.Router();
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }]), aboutUsController.createAboutUs);

router.get("/view1", aboutUsController.viewLatestAboutUs);

router.put('/update/:id', upload.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }]), aboutUsController.updateAboutUs);

router.delete('/delete/:id', aboutUsController.deleteAboutUs);

router.get('/viewall', aboutUsController.viewAllAboutUs);

router.get("/view/:id", aboutUsController.viewAboutUsById);

module.exports = router;
