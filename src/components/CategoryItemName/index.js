import './index.css'

const CategoryItemName = props => {
  const {categoryItemNameDetails, onChangeCategoryName, isActive, index} = props
  console.log(isActive)
  const onClickCategory = () => {
    onChangeCategoryName(categoryItemNameDetails.name)
  }

  const categoryFoodListImages = [
    {
      id: 0,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 5,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 6,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 7,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 8,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 9,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 10,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 11,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 12,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 13,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 14,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
    {
      id: 15,
      image:
        'https://res.cloudinary.com/dphlsy70v/image/upload/v1715410976/NxtMart-Mini%20Project/Vector_nozncg.png',
    },
  ]

  const selectedImage = categoryFoodListImages[index]?.image
  console.log(selectedImage)

  const activenames = isActive ? 'active-button' : 'inactive-button'
  const isactivebox = isActive
    ? 'active-category-mobile-icon '
    : 'inactive-category-mobile-icon '
  return (
    <li onClick={onClickCategory} className={`category-list-name-card `}>
      <div className={`category-mobile-icon  ${isactivebox} `}>
        <img
          src={categoryFoodListImages[0].image}
          alt="icon"
          className="image-icon"
        />
      </div>
      <p className={` name-content ${activenames}`}>
        {categoryItemNameDetails.name}
      </p>
    </li>
  )
}

export default CategoryItemName
