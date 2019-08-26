import { fetchApi } from '@/plugins/fetchApi'

// 全部车辆
//  搜索
export const fetchCarAllList = data => fetchApi('car', data)
// 屏蔽
export const fetchEditStatus = data => fetchApi('car/edit/status', data)
export const fetchCarEdit = data => fetchApi('car/edit', data, 'POST')
export const fetchCarAdd = data => fetchApi('car/add', data, 'POST')
// 统一修改推广价格
export const fetchCarEditPlatformPrice = data =>
  fetchApi('car/edit/platformPrice', data)
// 恢复默认推广价格
export const fetchEditPrice = data => fetchApi('car/edit/price', data)

// 平台车
export const fetchTradeList = data => fetchApi('car/trade', data)
export const fetchTradeAdd = data => fetchApi('car/trade/add', data, 'POST')
export const fetchTradeEdit = data => fetchApi('car/trade/car', data, 'POST')
export const fetchTradeDel = data => fetchApi('car/trade/delete', data)
export const fetchTradeIsGreat = data => fetchApi('car/trade/isGreat', data)

// 优选车
export const fetchGrateList = data => fetchApi('car/great', data)
export const fetchLower = data => fetchApi('car/great/lower', data)
