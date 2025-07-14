import { useState } from 'react'

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(4)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className='categories'>
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              onClick={() => {
                setActiveCategory(index)
              }}
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
