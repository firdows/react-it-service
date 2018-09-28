import App from './pages/App'
import Signin from './pages/Auth/Signin'
import Signout from './pages/Auth/Signout'
import RequestAuth from './pages/Auth/Authentication'
import page404 from './pages/Errors/page404'
///----
import Home from './pages/Home';
import User from './pages/User';
import Location from './pages/Location'
import LocationView from './pages/Location/View'
import Work from './pages/Work'
import WorkFormUser from './pages/Work/WorkFormUser'
import WorkView from './pages/Work/WorkView'

const routes = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'signin', component: Signin },
            { path: 'signout', component: Signout },
            { path: 'user', component: User },
        ]
    },

    {
        path: 'location',
        component: App,
        indexRoute: { component: RequestAuth(Location) },
        childRoutes: [
            { path: ':id', component: RequestAuth(LocationView) }
        ]
    },
    {
        path: 'work',
        component: App,
        indexRoute: { component: RequestAuth(Work) },
        childRoutes: [
            { path: 'new', component: WorkFormUser },
            { path: 'view/:id', component: WorkView },
            { path: 'update/:id', component: WorkFormUser },

        ]
    },
    {
        path: '*',
        component: App,
        indexRoute: { component: page404 },
    }
]

export default routes
