const passport = require('passport')
const passportService = require('./service/passport')

const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

const users = require('./controllers/Users')
const locations = require('./controllers/Locations')
const works = require('./controllers/Works')

module.exports = function (app) {

    app
        .get('/', function (req, res) {
            res.send({ message: 'IT - Service' })
        })
    /// Authen
    app.post('/signin', requireSignin, users.signin)

    ///User
    app.get('/users', requireAuth, users.findAll)
    app.post('/users', requireAuth, users.create)
    app.get('/users/:id', requireAuth, users.findById)
    app.put('/users/:id', requireAuth, users.update)
    app.delete('/users/:id', requireAuth, users.delete)

    ///Location
    app.get('/locations', locations.findAll);
    app.post('/locations', locations.create);
    app.get('/locations/:id', locations.findById);
    app.put('/locations/:id', locations.update);
    app.delete('/locations/:id', locations.delete);

    ///Work
    //app.get('/works', works.findAll)
    // app.post('/works', works.create)
    // app.get('/works/:id', works.findById)
    //app.get('/works', works.findAll);
    // app.post('/works', works.create);
    // app.get('/works/:id', works.findById);
    // app.put('/works/:id', works.update);
    // app.delete('/works/:id', works.delete);
}