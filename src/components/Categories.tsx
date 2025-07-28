import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store.ts'

import { setActiveCategory } from '../redux/slices/categorySlice.ts'

const Categories = () => {
  const activeCategory = useSelector((state: RootState) => state.categoryReducer.value)
  const dispatch = useDispatch()

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className='categories'>
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setActiveCategory(index))}
              className={activeCategory === index ? 'active' : ''}
            >
              {value}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
