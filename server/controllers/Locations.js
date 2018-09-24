
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

exports.findById = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) return next(err)

        var sql = "SELECT * FROM location WHERE id = ?";
        var id = parseInt(req.params.id);
        connection.query(sql, [id], (err, row) => {
            if (err) return next(err)
            res.send(row[0])
        })
    })
}

getData = (req) => {
    var { body } = req
    return {
        code: body.code,
        name: body.name,
    }
}

exports.create = (req, res, next) => {
    var post = getData(req);
    req.getConnection((err, conn) => {
        if (err) next(err)
        var sqlChk = "SELECT * FROM location WHERE name = ?";

        conn.query(sqlChk, [post.name], (err, results) => {
            if (err) next(err)
            //res.send(results.length)
            if (results.length > 0) {
                res.send({ status: 201, message: 'Username is Duplicate', have: results.length })
            } else {
                conn.query("insert into location set ? ", post, (err, results) => {
                    if (err)
                        return next(err)
                    res.send(results)
                })
            }
        })
    });
}

exports.update = (req, res, next) => {
    var post = getData(req);
    var id = parseInt(req.params.id);
    req.getConnection((err, conn) => {
        if (err) next(err)


        var sqlChk = "SELECT * FROM location WHERE name = ?";
        conn.query(sqlChk, [post.name], (err, results) => {
            if (err) next(err)

            if (results.length > 0 && results[0].id !== id) {
                res.send({ status: 201, message: 'Name is Duplicate', have: results.length })
            } else {
                conn.query("UPDATE location set ? WHERE id =?", [post, id], (err, results) => {
                    if (err) return next(err)
                    res.send(results)
                })
            }

        })
    });
}

exports.delete = (req, res, next) => {
    var id = parseInt(req.params.id);
    req.getConnection((err, conn) => {       
        conn.query("DELETE FROM location WHERE id = ?", id, (err, result) => {
            if (err) return next(err)
            res.send(result)
        })
    })
}
