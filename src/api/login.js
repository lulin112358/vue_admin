import {get, post, put, del} from './request';
//登陆
export const  login= (params)=>post('/admin/login',params)