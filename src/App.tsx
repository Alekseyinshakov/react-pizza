import './styles/app.scss'
import { Routes, Route } from 'react-router'
import Header from './components/Header.tsx'
import Main from './pages/Main.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import CartPage from './pages/CartPage.tsx'

function App() {
  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route index element={<Main />} />
              <Route path='cart' element={<CartPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
