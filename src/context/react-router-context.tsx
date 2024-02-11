import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '../App'
import DanceMove from '../pages/dance-move'
import Transitions from '../pages/transitions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DanceMove />
      },
      {
        path: '/dance-moves',
        element: <DanceMove />
      },
      {
        path: '/transitions',
        element: <Transitions />
      }
    ]
  }
])

const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}

export default ReactRouterProvider
