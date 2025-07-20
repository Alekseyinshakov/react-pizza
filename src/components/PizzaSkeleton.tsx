import ContentLoader from 'react-content-loader'

const PizzaSkeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={457}
    viewBox='0 0 280 457'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <circle cx='140' cy='125' r='125' />
    <rect x='0' y='265' rx='0' ry='0' width='280' height='25' />
    <rect x='0' y='310' rx='0' ry='0' width='280' height='80' />
    <rect x='128' y='412' rx='20' ry='20' width='150' height='45' />
    <rect x='0' y='415' rx='0' ry='0' width='110' height='40' />
  </ContentLoader>
)

export default PizzaSkeleton
