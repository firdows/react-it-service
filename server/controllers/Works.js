exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) next(err)

        var sql = "SELECT * FROM work WHERE (id LIKE ?)"
        var params = "%" + req.query.term + "%"

        connection.query(sql, [params], (err, result) => {
            if (err) next(err)

            if (result)
                res.send(result);
        })
    })
}


exports.findById = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) next(err)

        var sql = "SELECT * FROM work WHERE id=?"
        connection.query(sql, res.query.id, (err, result) => {
            if (err) next(err)

            if (result)
                res.send(result[0]);

        })


    })
}