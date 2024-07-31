const mongoose = require('mongoose');

const aboutus_team_Schema = new mongoose.Schema({
    aboutus_team_head: {
        type: String,
        required: true,
    },
    teams_header:{
        type: String,
        required: true,
    }
});

const aboutus_team = mongoose.model('aboutus_team_heading', aboutus_team_Schema);

module.exports = aboutus_team;
