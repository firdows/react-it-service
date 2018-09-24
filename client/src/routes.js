import App from './pages/App'
import Home from './pages/Home';
import User from './pages/User';
import Signin from './pages/Auth/Signin'
import Signout from './pages/Auth/Signout'
import RequestAuth from './pages/Auth/Authentication'
import page404 from './pages/Errors/page404'

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
            }, {
                path: 'signout',
                component: Signout
            }, {
                path: 'user',
                component: RequestAuth(User)
            }
        ]
    },
    {
        path:'*',
        component: App,
        indexRoute: {
            component: page404
        },
    }
]

export default routes
