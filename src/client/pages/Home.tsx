import React from 'react'
import { renderRoutes } from 'react-router-config'
import Header from './home/Header'

export default (props: any) => {
  return (
    <>
      <Header />
      {renderRoutes(props.route.routes)}
    </>
  )
}
