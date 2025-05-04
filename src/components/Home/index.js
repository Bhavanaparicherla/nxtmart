import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import CategoryItemName from '../CategoryItemName'
import ProductItemCard from '../ProductItemCard'

const apiStatusChange = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    categoryListItems: [],
    activeItem: '',
    isActive: false,
    apiStatus: apiStatusChange.initial,
  }

  componentDidMount() {
    this.getAllProducts()
  }

  getAllProducts = async () => {
    this.setState({apiStatus: apiStatusChange.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const {categories} = data
      console.log(categories)
      this.setState({
        categoryListItems: categories,
        activeItem: categories[0].name,
        apiStatus: apiStatusChange.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusChange.failure,
      })
    }
  }

  getFilteredData = () => {
    const {categoryListItems, activeItem} = this.state
    const filtering = categoryListItems.filter(each => each.name === activeItem)
    // console.log(`filtered ${filtering}`)

    const filteringData = categoryListItems.filter(
      each => each.name !== activeItem,
    )
    // console.log(`filtered ${filteringData}`)

    return [...filtering, ...filteringData]

    /* const filteredResults = categoryListItems.map(each => {
      if (each.name === activeItem) {
        this.filteredResults()
      } else {
        this.getAllProducts()
      }
    })
    return filteredResults */
  }

  onChangeCategoryName = name => {
    console.log(`name ${name}`)

    this.setState({activeItem: name})
    /* const {categoryListItems} = this.state
   const categoryNameId = categoryListItems.find(each => {
      if (each.name === name) {
        this.setState(props => ({
          isActive: !props.isActive,
          activeItem: name,
        }))
      }
    }) */
  }

  renderProductsSuccessView = () => {
    const {categoryListItems, activeItem} = this.state
    // console.log(`actitem${activeItem}`)

    const productsData = this.getFilteredData()
    console.log(productsData)
    return (
      <div className="category-products-bg-container">
        <div className="category-section">
          <h1 className="category-heading">Categories</h1>

          <ul className="category-list-ul-container">
            {categoryListItems.map(categoryName => (
              <CategoryItemName
                key={categoryName.name}
                onChangeCategoryName={this.onChangeCategoryName}
                categoryItemNameDetails={categoryName}
                isActive={activeItem === categoryName.name}
              />
            ))}
          </ul>
        </div>
        <div className="product-section-container">
          <ul className="product-section-ul-container">
            {productsData.map(productItem => (
              <ProductItemCard
                key={productItem.name}
                productCardDetails={productItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  renderProductsFailureView = () => (
    <div className="product-failure-container">
      <img
        src="https://res.cloudinary.com/dphlsy70v/image/upload/v1715410964/NxtMart-Mini%20Project/Group_7519mobile_ry0zte.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something went wrong.</h1>
      <p className="failure-text">We are having some trouble.</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getAllProducts}
      >
        Retry
      </button>
    </div>
  )

  renderSwitchCases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusChange.success:
        return this.renderProductsSuccessView()
      case apiStatusChange.failure:
        return this.renderProductsFailureView()
      case apiStatusChange.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const renderedSwitchResults = this.renderSwitchCases()
    const {isActive, activeItem} = this.state
    console.log(isActive, activeItem)
    return (
      <div className="home-bg-container">
        <Header className="header-height" isActive={isActive} />
        <div className="container">{renderedSwitchResults}</div>
        <Footer className="footer-height" />
      </div>
    )
  }
}

export default Home
