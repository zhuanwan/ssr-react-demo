import React from 'react'
import { renderToString } from 'react-dom/server.js'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import customRoutesConfig from '../client/router/index.js'

export default (pathname, store, context, template) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={pathname} context={context}>
        <div id="main">{renderRoutes(customRoutesConfig)}</div>
      </StaticRouter>
    </Provider>
  )

  if (template) {
    template = template
      .replace('{{reactApp}}', content)
      .replace(
        /(<script type="server">)(\s*.*\s*)(<\/script>)/gi,
        '<script>window._RENDER_ENV="server";window._PRELOADED_STATE=' +
          JSON.stringify(store.getState()) +
          '$3'
      )
  }
  return template
}
