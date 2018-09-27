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
import WorkFormUser from './components/Work/WorkFormUser'

const routes = [
    {
        path: '/',
        component: App,
        indexRoute: {
            component: Home
        },
        childRoutes: [
            {
                path: 'signin',
                component: Signin
            },
            {
                path: 'signout',
                component: Signout
            },
            {
                path: 'user',
                component: RequestAuth(User)
            },
        ]
    },

    {
        path: 'location',
        component: App,
        indexRoute: {
            component: RequestAuth(Location)
        },
        childRoutes: [
            {
                path: ':id',
                component: LocationView
            }
        ]
    },
    {
        path: 'work',
        component: App,
        indexRoute: {
            component: Work
        },
        childRoutes: [
            // {
            //     path: ':id',
            //     component: Work
            // },
            {
                path: 'new',
                component: WorkFormUser
            }
        ]
    },
    {
        path: '*',
        component: App,
        indexRoute: {
            component: page404
        },
    }
]

export default routes
