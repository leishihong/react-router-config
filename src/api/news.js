import { fetchApi } from '@/plugins/fetchApi'
// 热门资讯 + 搜索
export const fetchNewList = data => fetchApi('new', data)
// 发布文章
export const fetchNewArticle = data => fetchApi('new', data, 'POST')
export const fetchNewDel = data => fetchApi('new/delete', data)
export const fetchEditStatus = data =>
  fetchApi('new/edit/status', data, 'POST')

// 资料管理
// 文件管理 + 查询
export const fetchFileList = data => fetchApi('file/search', data)
export const fetchFileDel = data => fetchApi('file/delete', data)
// / 添加分类
export const fetchFileAdd = data => fetchApi('file/add', data, 'POST')
// 资料管理 + 查看
export const fetchFileAdmin = data => fetchApi('file/file', data)
