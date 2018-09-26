//const moment = require('moment')

exports.findAll = (req, res, next) => {
    req.getConnection((err, connection) => {
        if (err) next(err)

        var params = "%" + req.query.term + "%"
        var sqlWhere = req.query.term ? ` WHERE (id LIKE ?)` : '';
        var sql = `SELECT work.*,location.name as location_name
         FROM work 
         INNER JOIN location ON location.id = work.location_id
          ${sqlWhere}
        ORDER BY work.doc_date`

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


exports.create = (req, res, next) => {
    var { body } = req
    var post = {
        doc_date: moment().format('YYYY-MM-DD'),
        doc_time: moment().format('HH:mm'),
        location_id: body.location_id,
        detail: body.detail,
        phone: body.phone,
        status: 0,
        user_id: req.user.id,
    }
    req.getConnection(function (err, connection) {
        connection.query("insert into work set ? ", post, (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}


exports.update = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        location_id: body.location_id,
        detail: body.detail,
        phone: body.phone,
    }
    req.getConnection(function (err, connection) {
        connection.query("update work set ? where id=?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.updateRepair = (req, res, next) => {
    var id = parseInt(req.params.id)
    var { body } = req
    var post = {
        status: body.status,
        status_date: moment().format('YYYY-MM-DD'),
        status_time: moment().format('HH:mm'),
        work_detail: body.work_detail,
        work_user_id: req.user.id,
    }
    req.getConnection(function (err, connection) {
        connection.query("update work set ? where id=?", [post, id], function (err, results) {
            if (err) return next(err)
            res.send(results)
        })
    })
}

exports.delete = (req, res, next) => {
    var id = parseInt(req.params.id)
    req.getConnection((err, connection) => {
        if (err) return next(err)
        connection.query("delete from work where id=?", [id], (err, results) => {
            if (err) return next(err)
            res.send(results)
        })
    })
}