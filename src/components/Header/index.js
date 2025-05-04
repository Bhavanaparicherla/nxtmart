import './index.css'
import {TbLogout2} from 'react-icons/tb'
import {LuShoppingCart, LuHome} from 'react-icons/lu'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const {location, history} = props
  const currentPath = location.pathname

  /* console.log(`activebtn ${isActive}`)
  const activeBtnStatus = currentPath === "/" ? "activeBtn" : "list-item-content"
  const mobileBtnStatus = currentPath === "/" ? 'mobilebtn' : 'header-icon'
*/

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  const onClickHome = event => {
    const d = event.target.value
    console.log(d)
  }

  return (
    <nav className="navbar-bg-container ">
      <div className="navbar-section-container">
        <Link to="/" className="link">
          {' '}
          <img
            src="https://res.cloudinary.com/dphlsy70v/image/upload/v1715410964/NxtMart-Mini%20Project/Logo_2_grjfac.png"
            alt="website logo"
            className="website-home-logo"
          />
        </Link>
        <ul className="nav-items-container">
          <Link to="/" className="link">
            {' '}
            <li
              className={
                currentPath === '/' ? 'activeBtn' : 'list-item-content'
              }
              onClick={onClickHome}
            >
              Home
            </li>
          </Link>

          <Link to="/cart" className="link">
            {' '}
            <li
              className={
                currentPath === '/cart' ? 'activeBtn' : 'list-item-content'
              }
            >
              Cart
            </li>
          </Link>

          <li
            className="logout-icon-container list-item-content"
            onClick={onClickLogout}
          >
            <button className="onclick-logoutbtn" type="button">
              <TbLogout2 className="logout-icon" />
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="mobile-section-container">
        <ul className="navbar-ul-mobile-section-container">
          <li>
            <Link to="/" className="link">
              {' '}
              <LuHome
                className={currentPath === '/' ? 'mobilebtn' : 'header-icon'}
              />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="link">
              {' '}
              <LuShoppingCart
                className={
                  currentPath === '/cart' ? 'mobilebtn' : 'header-icon'
                }
              />
            </Link>
          </li>
          <li onClick={onClickLogout}>
            <div className="link">
              <TbLogout2 className="header-icon" />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
