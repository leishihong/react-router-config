import { fetchApi } from '@/plugins/fetchApi'
// 车城管理
export const fetchShopList = data => fetchApi('trade/search', data)
// 车城管理 + 添加
export const fetchTradeAdd = data => fetchApi('trade/add', data, 'POST')
export const fetchTradeAuth = data =>
  fetchApi('/trade/authorize', data, 'POST')
export const fetchTradeAll = data => fetchApi('trade/trade', data)
// 摄像头 + 列表
export const fetchTradeCamera = data => fetchApi('trade/camera', data)
// 摄像头 + 添加
export const fetchCameraAdd = data => fetchApi('camera/add', data, 'POST')
// 摄像头 + 删除
export const fetchCameraDel = data => fetchApi('camera/delete', data)

// 经销商
export const fetchDistributorList = data =>
  fetchApi('distributor/search', data)
// 经销商 + 添加
export const fetchDistributorAdd = data =>
  fetchApi('distributor', data, 'POST')

// 销售管理
export const fetchSalesmanList = data => fetchApi('salesman/search', data)
// 添加业务员
export const fetchSalesmanAdd = data => fetchApi('salesman', data, 'POST')
