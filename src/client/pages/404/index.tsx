import React, { Fragment, useEffect } from 'react'

const Component = (props: any) => {
  const { staticContext } = props
  console.log('staticContext', staticContext)
  staticContext && (staticContext.NotFound = true)

  return (
    <Fragment>
      <div className="content">
        <h3>404 - Not found</h3>
      </div>
    </Fragment>
  )
}

export default Component
