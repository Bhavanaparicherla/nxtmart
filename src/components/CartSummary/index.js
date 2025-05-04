import './index.css'
import CartContext from '../context/CartContext'

const CartSummary = props => {
  const {isPaymentButtonSucess} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {cartListItems} = value
        console.log(cartListItems)
        let total = 0
        cartListItems.forEach(each => {
          const sliced = each.price.slice(1)
          total += parseInt(sliced * each.count)
        })

        const paymentSuccesful = () => {
          isPaymentButtonSucess()
        }
        return (
          <div className="total-container">
            <h1 data-testid="total-price" className="total-height">
              Total ({cartListItems.length} items) : <span>{`₹${total}`}</span>
            </h1>

            <button
              type="button"
              onClick={paymentSuccesful}
              className="checkout-button"
            >
              Checkout
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
