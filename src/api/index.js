import { fetchPost, fetchGet } from './axios'

const api = {
    // 登录
    login(param) {
        return fetchPost("/login", {
            username: param.username,
            password: param.password
        })
    },

    // 登出
    loginOut(){
        return fetchGet("/loginOut")
    },

    // 获取用户列表
    getUser() {
        return fetchGet("/getUser")
    },

    // 创建用户
    createUser(param){
        return fetchPost("/createUser", {
            username: param.username,
            password: param.password,
            nickname: param.nickname,
            roleId: param.roleId,
        })
    },
    // 删除用户
    removeUser(param){
        return fetchPost("/removeUser", {
            id: param.id,
        })
    },
    // 编辑->目前只有修改密码
    editUser(param){
        return fetchPost("/editUser", {
            id: param.id,
            password: param.password
        })
    },
    // 获取所有权限
    getAuth(){
        return fetchGet("/getAuth")
    },






}

export default api