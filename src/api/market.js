import { fetchApi } from '@/plugins/fetchApi'

export const fetchMarketList = data =>
  fetchApi('market/quotation/search', data)
export const fetchMarketDel = data => fetchApi('market/quotation/delete', data)
export const fetchMarketAdd = data =>
  fetchApi('market/quotation/add', data, 'POST')
export const fetchMarketEdit = data =>
  fetchApi('market/quotation/edit', data, 'POST')

export const fetchAuditList = data => fetchApi('market', data)
