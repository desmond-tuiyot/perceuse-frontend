import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}

export default ReactRouterProvider
