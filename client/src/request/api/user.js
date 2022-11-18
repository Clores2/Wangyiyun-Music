import service from "..";

//验证d邮箱登录
export function getLogin(email,password){
    return service({
        method: 'post',
        url:`/login?email=${email}&password=${password}`,

    })
}
//获取用户详情
export function getUserDetail(uid){
    return service({
        method: 'get',
        url:`/user/detail?uid=${uid}`,

    })
}
//获取用户歌单
export function getUserPlaylist(uid){
    return service({
        method: 'get',
        url:`/user/playlist?uid=${uid}`,

    })
}