import AllRoutes from './routes/AllRoutes'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter future={{ v7_startTransition: true }}>
        <AllRoutes />
    </BrowserRouter>
    </>
  )
}

export default App