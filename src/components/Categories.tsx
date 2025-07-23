type CategoriesProps = {
  activeCategory: number
  setActiveCategory: (value: number) => void
}

const Categories = ({ activeCategory, setActiveCategory }: CategoriesProps) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className='categories'>
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => setActiveCategory(index)}
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
