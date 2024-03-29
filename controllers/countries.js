const Country = require('../models/countries');


// Create a new Supported country
exports.create = (req, res, next) => {

    const { name } = req.body;

    Country.findOne({ name })
        .then(country => {
            if (country) {
                const error = new Error(`${name} already exists`);
                error.statusCode = 422;
                throw error;
            }

            const newCountry = new Country({ name: name.toUpperCase() });
            return newCountry.save()
        })
        .then(result => {
            res.status(201).json({
                message: `${name} was created`,
                isert_id: result._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

// Get Country
exports.getByName = (req, res, next) => {

    const { name } = req.body;

    Country.findOne({ name })
    .then(country => {
        const responseCode = country ? 201 : 404;
        res.status(responseCode).json({
            data: country
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// Returns all countries active countries
exports.all = (req, res, next) => {
    Country.find({ status: true })
        .then(countries => {
            res.status(200).json({
                data: countries
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

// GET Country By ID
exports.getById = (req, res, next) => {
    const countryId = req.params.id;

    Country.findById(countryId)
        .then(country => {
            res.status(200).json({
                data: country
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
