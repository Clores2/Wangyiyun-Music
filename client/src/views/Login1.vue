<template>
    <img src="~@/assets/bgimg.png" alt="" class="bgimg">
    <img src="~@/assets/R-C.png" alt="" class="logo">
    <div class="login">
        <van-form @submit="checkloginPhoneCode">
            <van-cell-group inset class="phone">
                <van-field
                  v-model="phoneNumber"
                  name="pattern"
                  label="手机号码"
                  placeholder="手机号码"
                  :rules="[{ validator:isPhonenumberRegister,pattern,required: true, message: '请输入正确的手机号'}]"
                />
            </van-cell-group>
            <van-cell-group inset>
                <van-field
                  v-model="password"
                  center
                  clearable
                  label="短信验证码"
                  placeholder="请输入短信验证码"
                  name="validator"
                  :rules="[{validator,required:true}]"
                >
                  <template #button>
                    <van-button size="small" type="primary" class="postct" @click="getloginPhoneCode">发送验证码</van-button>
                  </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px;" class="submit">
                <van-button round block type="primary" native-type="submit">
                  登录
                </van-button>
            </div>
        </van-form>
        <div class="register">还没有账号？<a href="javascript:;">点击注册</a></div>

    </div>

</template>

<script>
import { ref } from '@vue/reactivity';
import {postCtcode,phoneCheck,codeChek,geisLogin,getUser} from "@/request/api/user.js";
import { useStore } from 'vuex';
export default {
    setup() {

        let phoneNumber = ref("");
        let password = ref("");
        // function getUser(){
        //     console.log(phoneNumber);
        //     console.log(password);
        // }
        const validator = (val)=>{
            /\d{4}/.test(val);
        }
        //手机号是否已经注册
        function isPhonenumberRegister(){
            // console.log(phoneNumber.value);
            phoneCheck(phoneNumber.value).then((res)=>{
                console.log(res);
                if(res.data.code == 200){
                    // console.log(res.data.exist);
                    if(res.data.exist == 1){
                        console.log("手机号已注册");
                        return "手机号已注册";
                    }else{
                        console.log("手机号未注册");
                        return "手机号未注册"
                    }
            }
        })
            
        }
        //发送验证码
        function getloginPhoneCode(){
            postCtcode(phoneNumber.value).then((res)=>{
                if(res.data.code == 200){
                   if(res.data.data == true) console.log("验证码发生成功");
                }else{
                    console.log("验证码发送失败");
                }
            })
        }
        //验证验证码
        function checkloginPhoneCode(){
            codeChek(phoneNumber.value,password.value).then((res)=>{
    
                if(res.data.code == 200){
                   if(res.data.data == true){
                    console.log("验证码验证成功",res);
                    sessionStorage.setItem("user",true);
                    useStore().state.isLogin = true;
                    geisLogin().then(res=>{
                        console.log("islogin",res);
                    })
                    }
                    
                }else{
                    console.log("验证码验证失败");
                }
            })
        }
        
        return {
            phoneNumber,
            password,
            pattern:/^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            isPhonenumberRegister,
            // getUser,
            validator,
            getloginPhoneCode,
            checkloginPhoneCode
        }
    },
}
</script>


<style lang="less" scoped>
.bgimg{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}
.logo{
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 30px;
    position: absolute;
    top: 2rem;
    left: 3.5rem;
}
.login{
    position: absolute;
    top: 9rem;
    left: 1.2rem;
    width: 7.5rem;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .phone{
        width: 6.8rem;
    }
    // .submit{
    //     width: 6.8rem;
    //     height: .8rem;
    //     background-color: white;
    //     border-radius: 20px;
    //     text-align: center;
    //     padding-top: .15rem;
    //     font-size: .38rem;
    //     // vertical-align: middle;
    // }
    .van-cell-group{
        margin: .3rem 0;
    }
    .phone{
        width: 8rem;
    }

}
.register{
        a{
            color:blue;
        align-self: flex-end;
    }
}

</style>