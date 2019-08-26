import {
  fetchTradeAll,
  fetchCarBrandSelectAll,
  fetchDistributorAll,
  fetchSelectCarAudi,
  fetchGaugeSelectAll,
  fetchGuageAll,
  fetchSelectAidVid,
  fetchYeWu,
  fetchCarBidAid,
  fetchCarTidDid,
  fetchDidSid,
  fetchRuleSelect
} from '@/api/common.js'
/**
 *
 * @param {*} id字典查询
 */
// 所有品牌
export const getBrandSelectAll = async params => {
  const { code, results } = await fetchCarBrandSelectAll(params)
  if (code) {
    return results
  }
}
// 车系id查询
export const getCarBidAid = async params => {
  const { code, results } = await fetchCarBidAid(params)
  if (code) {
    return results
  }
}
// 根据车系id查车型
export const getSelectAidVid = async params => {
  const { code, results } = await fetchSelectAidVid(params)
  if (code) {
    return results
  }
}
// 经销商id查询
export const getCarTidDid = async params => {
  const { code, results } = await fetchCarTidDid(params)
  if (code) {
    return results
  }
}
// 业务员id查询
export const getDidSid = async params => {
  const { code, results } = await fetchDidSid(params)
  if (code) {
    return results
  }
}

/**
 *
 * @param {*} 主数据查询表
 */
// 车城
export const getAllTrade = async params => {
  const { code, results } = await fetchTradeAll(params)
  if (code) {
    return results
  }
}
// 经销商
export const getDistSelectAll = async params => {
  const { code, results } = await fetchDistributorAll(params)
  if (code) {
    return results
  }
}

// 车系
export const getAuditSelectAll = async params => {
  const { code, results } = await fetchSelectCarAudi(params)
  if (code) {
    return results
  }
}

// 车型全部
export const getGaugeSelectAll = async params => {
  const { code, results } = await fetchGaugeSelectAll(params)
  if (code) {
    return results
  }
}
// 车规
export const getGuageAll = async params => {
  const { code, results } = await fetchGuageAll(params)
  if (code) {
    return results
  }
}
// 业务
export const getYeWuSelect = async params => {
  const { code, results } = await fetchYeWu(params)
  if (code) {
    return results
  }
}

export const getRuleSelectList = async params => {
  const { code, results } = await fetchRuleSelect(params)
  if (code) {
    return results
  }
}
