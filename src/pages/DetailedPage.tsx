import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { PizzaType } from '../types.ts'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'

type StatusType = 'loading' | 'success' | 'error'

const DetailedPage = () => {
  const { id } = useParams()

  const [pizzaData, setPizzaData] = useState<null | PizzaType>()
  const [status, setStatus] = useState<StatusType>('loading')

  useEffect(() => {
    const getPizza = async () => {
      try {
        const response = await axios.get(
          `https://68769703814c0dfa653c9f80.mockapi.io/products/${id}`
        )
        setPizzaData(response.data)
        setStatus('success')
      } catch (error) {
        console.log('Error:', error)
      }
    }
    getPizza()
  }, [id])

  return (
    <div className='detailed__container'>
      {status === 'loading' && (
        <div className='preloader-container'>
          <MoonLoader color='#36d7b7' size={50} />
        </div>
      )}

      {status === 'success' && (
        <div className='detailed__inner'>
          <div className='detailed__column'>
            <h2 className='title'>{pizzaData?.title}</h2>
            <img src={pizzaData?.imageUrl} alt='pizza-image' />
          </div>
          <div className='detailed__column'>
            <h3 className='detailed__subtitle'>Ингридиенты:</h3>
            <ul className='detailed__ingredients'>
              <li>Тесто - тонкое классическое</li>
              <li>Соус томатный</li>
              <li>Сыр моцарелла</li>
              <li>Колбаса пепперони</li>
              <li>Орегано</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailedPage
