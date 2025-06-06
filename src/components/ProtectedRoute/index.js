import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const getToken = Cookies.get('jwt_token')
  if (getToken === undefined) {
    return <Redirect to="login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
