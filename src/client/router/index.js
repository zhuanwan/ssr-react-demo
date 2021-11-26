import Home from '@/pages/Home.tsx'
import Form from '@/pages/form'
import List from '@/pages/list'
import NoMatch from '@/pages/404'
import { Redirect } from 'react-router-dom'

const routesConfig = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to={'/home/list'}></Redirect>,
    exactComponent: List,
  },
  {
    path: '/home',
    component: Home,
    routes: [
      {
        path: '/home/list',
        component: List,
        exact: true,
        name: '列表',
      },
      {
        path: '/home/form',
        component: Form,
        name: '表单',
      },
    ],
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default routesConfig
