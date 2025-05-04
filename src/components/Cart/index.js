import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import CartContext from '../context/CartContext'
import CartListItem from '../CartListItem'
import CartSummary from '../CartSummary'

class Cart extends Component {
  state = {isPaymentButton: false}

  isPaymentButtonSucess = () => {
    this.setState({isPaymentButton: true})
  }

  renderCartEmpty = () => (
    <div className="cart-empty-container">
      <img
        src="https://res.cloudinary.com/dphlsy70v/image/upload/v1715410964/NxtMart-Mini%20Project/Logoemptycarticon_4x_popvnx.png"
        alt="empty cart"
        className="cart-empty-image"
      />
      <h1 className="cart-empty-text">Your cart is empty</h1>
    </div>
  )

  paymentDone = () => {
    localStorage.removeItem('cartData')
  }

  paymentProcessed = () => (
    <div className="payment-success-container">
      <img
        src="https://res.cloudinary.com/dphlsy70v/image/upload/v1715410950/NxtMart-Mini%20Project/Group_7417_jg7okm.png"
        alt="empty cart"
        className="payment-image"
      />
      <h1 className="paymentsuccess-heading">Payment Successful</h1>
      <p className="payment-success-text">
        Thank you for ordering.
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button
          type="button"
          onClick={this.paymentDone}
          className="paymentsuccess-button"
        >
          Return to Homepage
        </button>{' '}
      </Link>
    </div>
  )

  render() {
    const {isPaymentButton} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartListItems} = value

          let content

          if (cartListItems.length === 0) {
            content = this.renderCartEmpty()
          } else if (isPaymentButton) {
            content = this.paymentProcessed()
          } else {
            content = (
              <div className="cart-item-bg-container">
                <h1 className="cart-main-heading">Items</h1>
                <ul className="cart-ul-container">
                  {cartListItems.map(eachCartItem => (
                    <CartListItem
                      className="each-item"
                      cartItemDetails={eachCartItem}
                      key={eachCartItem.id}
                    />
                  ))}
                </ul>
                <CartSummary
                  isPaymentButtonSucess={this.isPaymentButtonSucess}
                />
              </div>
            )
          }

          return (
            <div className="cart-bg-container ">
              <Header className="header-height" />
              <div className="cart-item-section">{content}</div>
              <Footer className="footer-height" />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
