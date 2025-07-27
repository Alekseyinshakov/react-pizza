import './styles/app.scss'
import { Routes, Route } from 'react-router'
import Header from './components/Header.tsx'
import Main from './pages/Main.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import CartPage from './pages/CartPage.tsx'
import { useState } from 'react'
import { MyContext } from './MyContext.ts'

function App() {
  const [searchString, setSearchString] = useState('')

  return (
    <>
      <div className='wrapper'>
        <MyContext.Provider value={{ searchString, setSearchString }}>
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
        </MyContext.Provider>
      </div>
    </>
  )
}

export default App
