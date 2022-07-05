const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log('Connected success');
    } catch (e) {
        console.log('Connect failed');
    }
}

module.exports = { connect };
