import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'
import styles from './index.less'

const Loader = ({ spinning = true, fullScreen }) => {
  return (
    <div
      className={ classNames('loadingBox', {
        [ styles.hidden ]: !spinning
      }) }
    >
      <div class="overlay"></div>
      <div className="loadingShow">
        <img src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif" />
        <span>疯狂加载中，请稍后...</span>
      </div>
    </div>
  )
}

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool
}

export default Loader
