import {get, post, put, del} from './request';
// 获取菜单
export const  allMenu = (params = {}) => get('/admin/menu', params)
export const  menuTree = (params = {}) => get('/admin/menuTree', params)
// 添加菜单
export const  addMenu = (params) => post('/admin/menu', params)
// 更新菜单
export const  updateMenu = (params) => put('/admin/menu', params)
// 删除菜单
export const  delMenu = (params) => del('/admin/menu', params)
// 获取单个菜单
export const getMenu = (params) => get('/admin/menu/one', params)
// 更新菜单显示状态/排序
export const updateData = (params) => put('/admin/menu/data', params)
// 获取用户菜单
export const userMenu = (params) => get('/admin/menu/user', params)