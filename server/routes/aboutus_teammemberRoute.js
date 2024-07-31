const express = require('express');
const multer = require('multer');
const aboutusTeamMemberController = require('../controllers/aboutusTeamMemberController');
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

router.post('/create', upload.fields([{ name: 'imageUrl', maxCount: 1 }]), aboutusTeamMemberController.createTeamMember);
router.get('/view', aboutusTeamMemberController.viewTeamMembers);
router.delete('/deleteUser/:id', aboutusTeamMemberController.deleteTeamMember);
router.put('/updateUser/:id', upload.fields([{ name: 'imageUrl', maxCount: 1 }]), aboutusTeamMemberController.updateTeamMember);

module.exports = router;
