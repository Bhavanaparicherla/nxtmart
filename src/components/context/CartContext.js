import React from 'react'

const CartContext = React.createContext({
  cartListItems: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
  cartListItemsCount: () => {},
  cartInc: () => {},
  cartDec: () => {},
})

export default CartContext
