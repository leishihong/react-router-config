import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Main extends Component {
  static propTypes = {
    children: PropTypes.Array
  };

  render () {
    return <Fragment>{this.props.children}</Fragment>
  }
}
export default withRouter(Main)
