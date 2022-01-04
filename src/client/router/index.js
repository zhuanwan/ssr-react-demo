import Home from '@/pages/Home.tsx'
import Plugins from '@/pages/plugins'
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
        path: '/home/plugins',
        component: Plugins,
        name: '我的插件',
      },
    ],
  },
  {
    path: '*',
    component: NoMatch,
  },
]

export default routesConfig
