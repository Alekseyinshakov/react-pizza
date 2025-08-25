export const getCartDataFromLS = () => {
  const cartData = localStorage.getItem('cartDataJson')
  if (cartData) {
    return JSON.parse(cartData)
  }
}
