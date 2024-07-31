const mongoose = require('mongoose');

const aboutus_team_member_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    socialMedia: {
        sociallist1: {
            type: String
        },
        sociallist2: {
            type: String
        },
        sociallist3: {
            type: String
        }
    }

});

const aboutus_team_member = mongoose.model('aboutus_team_member', aboutus_team_member_Schema);

module.exports = aboutus_team_member;
