import React, { Component } from 'react'
import { Card, Button } from 'antd'
import PropTypes from 'prop-types'
import './index.less'

export class BaseSearch extends Component {
  static propTypes = {
    actionsBtn: PropTypes.array,
    children: PropTypes.array,
    cardBtn: PropTypes.func
  };

  cardBtn = type => {
    this.props.cardBtn(type)
  };

  render () {
    const { children, actionsBtn } = this.props
    return (
      <Card
        className="base-search-card"
        actions={ actionsBtn.map(item => {
          return (
            <Button
              key={ item.actionsType }
              onClick={ () => this.cardBtn(item.actionsType) }
            >
              {item.title}
            </Button>
          )
        }) }
      >
        {children}
      </Card>
    )
  }
}

export default BaseSearch
