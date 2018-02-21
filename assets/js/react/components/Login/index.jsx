import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { createSelector } from 'reselect'
import PropTypes from 'prop-types'
import actions from '../../actions/login'
import Form from './Form'
import Loader from '../Loader'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false,
    }
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ submitted: true })
    this.props.login(this.state.username, this.state.password).then(
      () => this.props.history.push('/')
    )
  }

  render() {
    if (this.state.submitted) {
      return <Loader />
    }
    return (
      <div>
        <Form
          handleSubmit={this.handleSubmit}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.login ? state.login.user : null,
    submitted: state.login ? state.login.submitted : null,
  }
}

const mapDispatchToProps = {
  login: actions.login,
}

Login.defaultProps = {
  afterLogin: () => {},
  login: () => {},
  submitted: false,
}

Login.propTypes = {
  afterLogin: PropTypes.func,
  login: PropTypes.func,
  submitted: PropTypes.bool,
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
