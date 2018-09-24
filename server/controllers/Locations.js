const jwt = require('jwt-simple')
const config = require('../config')


exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err)
            return next(err)

        var sql = "select * from location where (code like ? or name LIKE ?)";
        var params = "%" + req.query.term + "%"
        connection.query(sql, [
            params, params
        ], (err, results) => {
            if (err)
                return next(err)
            res.send(results)
        })

    })
}

exports.findOne = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)

        var sql = "SELECT * FROM location WHERE id = ?";
        connection.query(sql, [parseInt(req.params.id)], (err, row) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}