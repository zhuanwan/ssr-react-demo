import React, { Fragment } from 'react'
import Calender from 'wh-calender-react'
import '@nodeModules/wh-calender-react/lib/style.css'
import './index.css'

export default () => {
  return (
    <Fragment>
      <div className="content">
        <div className="title">日历</div>
        <div style={{ width: 400 }}>
          <Calender />
        </div>
      </div>
    </Fragment>
  )
}
