const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose.js');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                courses = mutipleMongooseToObject(courses);
                res.render('home', { courses });
            })
            .catch(next);
    }

    search(req, res) {
        res.send('search');
    }
}

module.exports = new SiteController();
