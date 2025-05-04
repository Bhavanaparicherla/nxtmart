import './index.css'
import {IoIosArrowForward} from 'react-icons/io'

import ProductItem from '../ProductItem'

const ProductItemCard = props => {
  const {productCardDetails} = props
  return (
    <li className="productcard-li-container">
      <div className="product-heading-section">
        <div className="product-heading-icon-section">
          <h1 className="product-heading">{productCardDetails.name}</h1>
          <IoIosArrowForward />
        </div>
        <button type="button" className="product-view-button">
          View all
        </button>
      </div>
      <ul className="productCardItem-container">
        {productCardDetails.products.map(productList => (
          <ProductItem key={productList.id} productItemDetails={productList} />
        ))}
      </ul>
    </li>
  )
}
export default ProductItemCard
