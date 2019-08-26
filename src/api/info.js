import { fetchApi } from '@/plugins/fetchApi'
// 品牌
export const fetchBrandList = data => fetchApi('brands/search', data)
export const fetchBrandAdd = data => fetchApi('brands', data, 'POST')

// 车系管理 + 搜索
export const fetchAuditList = data => fetchApi('audi/search', data)
// 车系管理 + 新增
export const fetchAuditAdd = data => fetchApi('audi/insert', data, 'POST')
export const fetchAuditEdit = data => fetchApi('audi', data, 'POST')

// 车型管理+搜索
export const fetchVehicle = data => fetchApi('vehicle', data)
// 车型管理 + 新增
export const fetchVehicleAdd = data => fetchApi('vehivle/insert', data, 'POST')
export const fetchVehicleEdit = data => fetchApi('vehicle', data, 'POST')
// 车规管理 + 搜索
export const fetchGaugeList = data => fetchApi('gauge', data)
// 车规管理 + 删除
export const fetchGaugeDel = data => fetchApi('gauge/delete', data)
// 车规管理+修改（新增不用加id）
export const fetchGaugeAdd = data => fetchApi('gauge', data, 'POST')
