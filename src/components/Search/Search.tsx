import s from './Search.module.scss'
import searchSvg from '../../assets/icons/search-svgrepo-com.svg'
import crossSvg from '../../assets/icons/cross-svgrepo-com.svg'

const Search = () => {
  return (
    <div className={s.root}>
      <img src={searchSvg} alt='Search' className={s.icon} />
      <input type='text' />
      <img src={crossSvg} alt='Cross' className={s.cross} />
    </div>
  )
}

export default Search
