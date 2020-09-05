import {get, post, put, del} from './request';
//登陆
export const  login= (login)=>post('/api/post/user/login',login)
//上传
export const  upload=(upload)=>get('/api/get/upload',upload)
// 获取菜单
export const  allMenu = (params = {}) => get('/admin/menu', params)
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