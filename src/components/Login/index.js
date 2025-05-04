import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {TbLockSquareRounded} from 'react-icons/tb'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  passwordShowAndHide = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameDetails = () => {
    const {username} = this.state
    return (
      <>
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <div className="form-input-icon-container">
          <CgProfile className="form-icon" />
          <input
            id="username"
            type="text"
            className="form-input"
            value={username}
            onChange={this.onChangeUsername}
          />
        </div>
      </>
    )
  }

  renderPasswordDetails = () => {
    const {password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    return (
      <>
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <div className="form-input-icon-container">
          <TbLockSquareRounded className="form-icon" />

          <input
            id="password"
            type={passwordType}
            value={password}
            className="form-input"
            onChange={this.onChangePassword}
          />
        </div>
      </>
    )
  }

  render() {
    const {errorMsg, username, password} = this.state
    let isColor
    if (username !== '' && password !== '') {
      isColor = 'login-btn-color1'
    } else {
      isColor = 'login-btn-color2'
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-background-container">
        <form className="login-form-card" onSubmit={this.submitUserDetails}>
          <img
            src="https://res.cloudinary.com/dphlsy70v/image/upload/v1715410964/NxtMart-Mini%20Project/Logo_2_grjfac.png"
            alt="login website logo"
            className="website-loginform-logo"
          />

          <div className="form-input-container">
            {this.renderUsernameDetails()}
          </div>
          <div className="form-input-container">
            {this.renderPasswordDetails()}
          </div>

          <div className="form-checkbox-input-container">
            <input
              type="checkbox"
              id="showpassword"
              className="form-checkbox-input"
              onClick={this.passwordShowAndHide}
            />
            <label htmlFor="showpassword" className="form-label">
              Show Password
            </label>
          </div>

          <button type="submit" className={`submitform-button ${isColor}`}>
            Login
          </button>
          <p className="onSubmitErrorMsg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
