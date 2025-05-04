import './index.css'
import {Component} from 'react'
import CartContext from '../context/CartContext'

class ProductItem extends Component {
  state = {count: 1, isbutton: false}

  renderCartDetails = productItemDetails => (
    <CartContext.Consumer>
      {value => {
        const {cartListItems, addCartItem, cartInc, cartDec} = value

        const {id, name, weight, price, image} = productItemDetails
        const {count, isbutton} = this.state
        console.log(count)

        const onIncrementCartItem = () => {
          this.setState(prev => ({count: prev.count + 1}))
          cartInc(id)
        }

        const onDecrementCartItem = () => {
          /* const {count} = this.state */

          if (count > 1) {
            this.setState(prev => ({count: prev.count - 1}))
            cartDec(id)
          } else {
            this.setState({isbutton: false})
          }
        }

        const addItem = () => {
          this.setState(prev => ({
            isbutton: true,
          }))
          addCartItem({...productItemDetails, count})
        }

        return (
          <li className="productCardItem" key={id} data-testid="product">
            <img src={image} alt={name} className="product-item-image" />
            <div className="product-details-list">
              <div className="product-details">
                <p className="product-name">{name}</p>
                <p className="product-weight">{weight}</p>
                <p className="product-price">{price}</p>
              </div>
              <div>
                {isbutton ? (
                  <div className="product-count-button product-add-button">
                    <button
                      type="button"
                      data-testid="decrement-count"
                      onClick={onDecrementCartItem}
                      className="ondec-style"
                    >
                      -
                    </button>
                    <p data-testid="active-count" className="count-style">
                      {count}
                    </p>
                    <button
                      type="button"
                      data-testid="increment-count"
                      onClick={onIncrementCartItem}
                      className="oninc-style"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={addItem}
                    data-testid="add-button"
                    type="button"
                    className="product-add-button"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {productItemDetails} = this.props
    const {count} = this.state
    return <div>{this.renderCartDetails(productItemDetails)}</div>
  }
}

export default ProductItem
