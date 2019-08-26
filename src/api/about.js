import { fetchApi } from '@/plugins/fetchApi'
export const fetchLogAbout = data => fetchApi('log/aboutme', data, 'POST')
export const fetchLogAboutInfo = data => fetchApi('log/aboutme', data)
