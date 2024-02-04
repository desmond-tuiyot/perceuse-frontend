import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import DanceMove from '../pages/dance-move'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DanceMove />
      }
    ]
  },
  {
    path: '/dance-move',
    element: <DanceMove />
  }
])

const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}

export default ReactRouterProvider
