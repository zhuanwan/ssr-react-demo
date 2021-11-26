import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import Mock from 'mockjs'

import render from './renderer.js'
import createNewStore from '../store/createStore.js'
import { matchRoutes } from 'react-router-config'
import customRoutesConfig from '../client/router/index.js'
const __dirname = path.resolve(path.dirname('')) // 设置 __dirname，为根目录

const port = process.env.port || 4000
const app = express()
app.use('/static', express.static(__dirname + '/static'))
app.use(express.static(__dirname + '/dist'))
app.use(cors({ origin: '*' }))

app.get('/getDemoOne', (req, res) => {
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        image: "@Image('100x100', 'EasyMock')",
        name: '@NAME',
        email: '@EMAIL',
        content: '@TITLE',
      },
    ],
  })

  setTimeout(() => {
    res.send({
      code: 0,
      data,
    })
  }, 500)
})

app.get('*', (req, res) => {
  const store = createNewStore()
  const routes = matchRoutes(customRoutesConfig, req.path)

  const syncRequests = []
  routes.map((item) => {
    const route = item.route
    if (route.component?.appSyncRequestFetching) {
      syncRequests.push(route.component.appSyncRequestFetching(store))
    } else if (route.exactComponent?.appSyncRequestFetching) {
      syncRequests.push(route.exactComponent.appSyncRequestFetching(store))
    }
  })

  Promise.all(syncRequests).then(() => {
    const indexFile = path.join(__dirname, '/dist/app.html')
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err)
        return res.status(500).send('没有找到文件!')
      }

      const context = {}
      const content = render(req.url, store, context, data)
      if (context.notFound) {
        res.status(404)
      }
      res.send(content)
    })
  })
})
app.listen(port, () => console.log(`service listening on port: ${port}`))
