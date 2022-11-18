import service from "..";

//发送验证码
export function postCtcode(phone){
    return service({
        method: 'post',
        url:`/captcha/sent?phone=${phone}`,

    })
}
//验证手机号码是否注册
export function phoneCheck(phone){
    return service({
        method: 'post',
        url:`/cellphone/existence/check?phone=${phone}`,

    })
}
//验证验证码
export function codeChek(phone,code){
    return service({
        method: 'post',
        url:`/captcha/verify?phone=${phone}&captcha=${code}`,

    })
}
//获取登录状态
export function geisLogin(){
    return service({
        method: 'get',
        url:`/login/status`,

    })
}
//获取用户信息
export function getUser(id){
    return service({
        method: 'get',
        url:`/user/detail?uid=${id}`,

    })
}