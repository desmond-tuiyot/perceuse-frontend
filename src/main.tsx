import React from 'react'
import ReactDOM from 'react-dom/client'

import ReactRouterProvider from './context/react-router-context.tsx'
import ApolloProvider from './context/apollo-context.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider>
      <ReactRouterProvider />
    </ApolloProvider>
  </React.StrictMode>,
)
