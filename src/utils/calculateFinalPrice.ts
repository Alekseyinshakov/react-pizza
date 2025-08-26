export const calculateFinalPrice = (
  startPrice: number,
  doughType: number,
  size: number
): number => {
  let doughTypeCoefficient = 1
  let sizeCoefficient = 1

  if (doughType === 1) {
    doughTypeCoefficient = 1.2
  }

  if (size === 30) {
    sizeCoefficient = 1.1
  }

  if (size === 40) {
    sizeCoefficient = 1.3
  }

  return Math.floor(
    startPrice * sizeCoefficient * doughTypeCoefficient
  )
}
