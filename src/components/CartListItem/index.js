import CartContext from '../context/CartContext'
import './index.css'

const CartListItem = props => {
  const {cartItemDetails} = props
  const {name, weight, price, id, image, count} = cartItemDetails
  console.log(cartItemDetails)

  return (
    <CartContext.Consumer>
      {value => {
        const {decrementCartItem, incrementCartItem} = value

        const ondecrement = () => {
          decrementCartItem(id)
        }

        const onincrement = () => {
          incrementCartItem(id)
        }

        return (
          <li className="cart-items-li-card" data-testid="cartItem">
            <div className="cart-card-details">
              <img
                src={image}
                alt={name}
                className="product-item-image product-details"
              />
              <div className="product-detail-container">
                <p>{name}</p>
                <p className="product-weight">{weight}</p>
                <p>{price}</p>
              </div>
            </div>
            <div className="product-count-button product-add-button">
              <button
                type="button"
                onClick={ondecrement}
                data-testid="decrement-quantity"
                className="ondec-style"
              >
                -
              </button>
              <p data-testid="item-quantity" className="count-style">
                {count}
              </p>
              <button
                type="button"
                data-testid="increment-quantity"
                onClick={onincrement}
                className="oninc-style"
              >
                +
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartListItem
