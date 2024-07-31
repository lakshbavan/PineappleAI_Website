const mongoose = require('mongoose');

const aboutusSchema = new mongoose.Schema({
    aboutus_head: {
        type: String,
        required: true,
    },
    aboutus_des: {
        type: String,
        required: true,
    },
    img1: {
        type: String,
        required: true,
    },
    img2: {
        type: String,
        required: true,
    },
    checkbox1: {
        type: String,
        required: true,
    },
    checkbox2: {
        type: String,
        required: true,
    },
    checkbox3: {
        type: String,
        required: true,
    },
    checkbox4: {
        type: String,
        required: true,
    },

    pro_com_txt: {
        type: String,
        required: true,
    },
    pro_com_num: {
        type: String,
        required: true,
    },
    yrs_of_exp_txt: {
        type: String,
        required: true,
    },
    yrs_of_exp_txt_num: {
        type: String,
        required: true,
    },
    team_mem_txt: {
        type: String,
        required: true,
    },
    team_mem_num: {
        type: String,
        required: true,
    },
});

const Aboutus = mongoose.model('Aboutus', aboutusSchema);

module.exports = Aboutus;
