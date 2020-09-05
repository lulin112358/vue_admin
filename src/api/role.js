import {get, post, put, del} from './request';

// 获取角色
export const  allRole = (params = {}) => get('/admin/role', params)
// 添加角色
export const  addRole = (params) => post('/admin/role', params)
// 修改角色
export const  updateRole = (params) => put('/admin/role', params)
// 删除角色
export const  delRole = (params) => del('/admin/role', params)
// 获取单个角色
export const getRole = (params) => get('/admin/role/one', params)
// 更新角色显示状态
export const updateRoleData = (params) => put('/admin/role/data', params)
// 分配权限
export const assignAuth = (params) => post('/admin/role/auth', params)
// 根据角色获取权限
export const roleAuth = (params) => get('/admin/role/roleAuth', params)
