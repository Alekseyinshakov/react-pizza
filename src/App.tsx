import './styles/app.scss'
import { Routes, Route } from 'react-router'
import Header from './components/Header.tsx'
import Main from './pages/Main.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import CartPage from './pages/CartPage.tsx'
import { useState } from 'react'

function App() {
  const [searchString, setSearchString] = useState('')

  return (
    <>
      <div className='wrapper'>
        <Header searchString={searchString} setSearchString={setSearchString} />
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route index element={<Main searchString={searchString} />} />
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
