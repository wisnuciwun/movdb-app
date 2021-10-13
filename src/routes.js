
import React from 'react'

const Home = React.lazy(() => import('./views/Home/Home'))
const MovieDetail = React.lazy(() => import('./views/MovieDetail/MovieDetail'))

const routes = [
    {path: '/home', exact: true, name: 'home', component: Home},
    {path: '/detail', name: 'detail', component: MovieDetail},
]

export default routes