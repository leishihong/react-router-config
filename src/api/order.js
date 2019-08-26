import { fetchApi } from '@/plugins/fetchApi'

export const fetchOrderList = data => fetchApi('order', data)
