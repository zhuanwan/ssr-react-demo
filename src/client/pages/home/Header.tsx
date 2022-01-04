import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from 'react'
import customRoutesConfig from '../../router'
import { Menu } from 'antd'
import type { MenuInfo } from 'rc-menu/lib/interface'

export default () => {
  const [current, setCurrent] = useState<string>('')
  const handleClick = (e: MenuInfo) => {
    setCurrent(e.key as string)
  }
  const location = useLocation()

  useEffect(() => {
    setCurrent(location.pathname)
  }, [])

  const menus = useMemo(() => {
    return customRoutesConfig.find((item) => item.path === '/home')
  }, [customRoutesConfig])

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {menus?.routes?.map((item) => {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        )
      })}
      <Menu.Item key="blog">
        <a
          href="https://zhuanwan.github.io/blogs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          我的博客
        </a>
      </Menu.Item>
    </Menu>
  )
}
