import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './components/context/CartContext'

import './App.css'

const getLocalCart = () => {
  const newData = localStorage.getItem('cartData')
  if (newData === null) {
    return []
  }
  return JSON.parse(newData)
}
class App extends Component {
  state = {cartListItems: getLocalCart()}

  addCartItem = cartItem => {
    const {cartListItems} = this.state
    const check = cartListItems.find(each => each.id === cartItem.id)

    if (check) {
      this.setState(prev => ({
        cartListItems: prev.cartListItems.map(eachCartItem => {
          if (check.id === eachCartItem.id) {
            const updateQuantity = eachCartItem.count + cartItem.count
            return {...eachCartItem, count: updateQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedcart = [...cartListItems, cartItem]
      this.setState({cartListItems: updatedcart})
    }
  }

  incrementCartItem = id => {
    this.setState(prev => ({
      cartListItems: prev.cartListItems.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updateQuantity = eachCartItem.count + 1
          return {...eachCartItem, count: updateQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  removeCartItem = id => {
    const {cartListItems} = this.state
    const filterCart = cartListItems.filter(each => each.id !== id)
    this.setState({cartListItems: filterCart})
  }

  decrementCartItem = id => {
    const {cartListItems} = this.state
    const productObject = cartListItems.find(each => each.id === id)
    if (productObject.count > 1) {
      this.setState(prev => ({
        cartListItems: prev.cartListItems.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updateQuantity = eachCartItem.count - 1
            return {...eachCartItem, count: updateQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  cartInc = id => {
    const {cartListItems} = this.state
    const check = cartListItems.find(each => each.id === id)

    if (check) {
      this.setState(prev => ({
        cartListItems: prev.cartListItems.map(eachCartItem => {
          if (check.id === eachCartItem.id) {
            const updateQuantity = eachCartItem.count + 1
            return {...eachCartItem, count: updateQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  cartDec = id => {
    const {cartListItems} = this.state
    const check = cartListItems.find(each => each.id === id)

    if (check) {
      this.setState(prev => ({
        cartListItems: prev.cartListItems.map(eachCartItem => {
          if (check.id === eachCartItem.id) {
            const updateQuantity = eachCartItem.count - 1
            return {...eachCartItem, count: updateQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  render() {
    const {cartListItems} = this.state

    localStorage.setItem('cartData', JSON.stringify(cartListItems))

    return (
      <CartContext.Provider
        value={{
          cartListItems,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItem: this.incrementCartItem,
          decrementCartItem: this.decrementCartItem,
          cartInc: this.cartInc,
          cartDec: this.cartDec,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
