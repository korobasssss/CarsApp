import 'ui-kit-cars/style'
import { RouterProvider } from 'react-router-dom'
import { routes } from './app/routing'

function App() {
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App