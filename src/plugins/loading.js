/*
 * @Author: shihong.lei@advance.ai
 * @Date: 2019-06-10 17:06:03
 * @Last Modified by: shihong.lei
 * @Last Modified time: 2019-08-12 18:21:40
 */

// 并发请求合并一次loading
// import { Spin } from 'antd'
import _ from 'lodash'

const loading = document.getElementById('ajaxLoading')

let needLoadingRequestCount = 0

function startLoading () {
  console.log('startLoading =============')
  // Spin.show()
  loading.style.display = 'block'
}

function endLoading () {
  console.log('endLoading==========')
  // Spin.hide()
  loading.style.display = 'none'
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 300)()
  }
}
