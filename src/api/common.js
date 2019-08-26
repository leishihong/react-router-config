import { fetchApi } from '@/plugins/fetchApi'
/**
 *
 * @param {*} 所有联动查询
 */
// 品牌
export const fetchCarBrandSelectAll = data => fetchApi('select/carbrand', data)

// 根据品牌选车系
export const fetchCarBidAid = data => fetchApi('select/bid/aid', data)

// 根据车系id查找车型
export const fetchSelectAidVid = data => fetchApi('select/aid/vid', data)

// 根据车城tid查询经销商did
export const fetchCarTidDid = data => fetchApi('select/tid/did', data)

// 根据经销商did查询销售员
export const fetchDidSid = data => fetchApi('select/did/sid', data)

/**
 *
 * @param {*} 所有主列表下拉数据
 */
// 车型
export const fetchGaugeSelectAll = data => fetchApi('select/gauge', data)
// 所有车城
export const fetchTradeAll = data => fetchApi('trade/trade', data)

// 所有经销商
export const fetchDistributorAll = data =>
  fetchApi('distributor/distributor', data)
// 所有车系 车系查询（只显示车系名称）
export const fetchAuditName = data => fetchApi('audi/cname', data)

// 所有车系
export const fetchSelectCarAudi = data => fetchApi('select/caraudi', data)

// 所有车规
export const fetchGuageAll = data => fetchApi('gauge', data)
// 所有业务员
export const fetchYeWu = data => fetchApi('select/yewu', data)

// 上传文件
export const fetchFileUpload = data =>
  fetchApi('uploadService/save', data, 'POST')

// 权限下拉框
export const fetchRuleSelect = data => fetchApi('shiro', data)
