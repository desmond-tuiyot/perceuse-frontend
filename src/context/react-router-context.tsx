import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from '../App'
import DanceMove from '../pages/dance-move'
import Transitions from '../pages/transitions'
import TransitionTrainer from '../pages/transition-trainer/transition-trainer'

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
  },
  {
    path: '/transition-trainer',
    element: <TransitionTrainer />
  }
])

const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}

export default ReactRouterProvider
