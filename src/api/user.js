import {get, post, put, del} from './request';

// 获取用户
export const  allUser = (params = {}) => get('/admin/user', params)
// 添加用户
export const  addUser = (params = {}) => post('/admin/user', params)
// 更新用户
export const  updateUser = (params = {}) => put('/admin/user', params)
// 删除用户
export const  delUser = (params = {}) => del('/admin/user', params)
// 获取单个用户
export const getUser = (params) => get('/admin/user/one', params)
// 更新用户状态
export const updateUserData = (params) => put('/admin/user/status', params)