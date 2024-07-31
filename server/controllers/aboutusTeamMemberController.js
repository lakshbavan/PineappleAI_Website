const aboutus_team_member = require('../models/aboutus_team_member.js');

exports.createTeamMember = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded files:', req.files);

  const addData = {
    name: req.body.name,
    position: req.body.position,
    socialMedia: {
      sociallist1: req.body.sociallist1,
      sociallist2: req.body.sociallist2,
      sociallist3: req.body.sociallist3,
    }
  };

  if (req.files && req.files.imageUrl) {
    addData.imageUrl = req.files.imageUrl[0].filename;
  }

  try {
    const teamMember = await aboutus_team_member.create(addData);
    res.status(200).json(teamMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.viewTeamMembers = async (req, res) => {
  try {
    aboutus_team_member.find({})
      .then(users => res.json(users))
      .catch(err => res.json(err));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTeamMember = (req, res) => {
  const id = req.params.id;
  aboutus_team_member.findByIdAndDelete({ _id: id })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateTeamMember = async (req, res) => {
  const updateData = {
    name: req.body.name,
    position: req.body.position,
    socialMedia: {
      sociallist1: req.body.sociallist1,
      sociallist2: req.body.sociallist2,
      sociallist3: req.body.sociallist3,
    }
  };

  if (req.files && req.files.imageUrl) {
    updateData.imageUrl = req.files.imageUrl[0].filename;
  }

  try {
    const updatedTeamMember = await aboutus_team_member.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.status(200).json(updatedTeamMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
