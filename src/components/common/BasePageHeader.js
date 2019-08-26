import React, { Component, Fragment } from 'react'
import { Card, PageHeader } from 'antd'
import history from '@/lib/history'
import PropTypes from 'prop-types'

class BasePageHeaderCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    children: PropTypes.array,
    extraInfo: PropTypes.object
  };
  static defaultProps = {
    title: '返回上一页',
    subTitle: ''
  };
  constructor (props) {
    super(props)
    this.state = {}
  }
  goBack = () => {
    history.go(-1)
  };
  render () {
    const { children, title, subTitle, extraInfo } = this.props
    return (
      <Fragment>
        <PageHeader
          onBack={ () => this.goBack() }
          title={ title }
          subTitle={ subTitle }
          extra={ [ extraInfo ] }
        >
          {children}
        </PageHeader>
        {/* <Card>{children}</Card> */}
      </Fragment>
    )
  }
}
export default BasePageHeaderCard
