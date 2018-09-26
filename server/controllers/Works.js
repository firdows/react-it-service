exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) next(err)


        var params = "%" + req.query.term + "%"
        var sqlWhere = req.query.term?` WHERE (id LIKE ${params})`:'';
        var sql = "SELECT work.*,location.name as location_name FROM work INNER JOIN location ON location.id = work.location_id " + sqlWhere

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