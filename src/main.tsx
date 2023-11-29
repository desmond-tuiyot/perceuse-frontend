import React from 'react'
import ReactDOM from 'react-dom/client'

import ReactRouterProvider from './context/ReactRouterContext.tsx'
import ApolloProvider from './context/ApolloContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider>
      <ReactRouterProvider />
    </ApolloProvider>
  </React.StrictMode>,
)
