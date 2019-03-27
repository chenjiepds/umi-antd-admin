export default [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login'},
            { path: '/user/login', component: './user/Login'}
        ]
    },
    {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
            { path: '/', redirect: '/dashboard' },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              component: './dashboard/analysis'
            }
        ]
    }
]