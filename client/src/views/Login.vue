<template>
    <img src="~@/assets/bgimg.png" alt="" class="bgimg">
    <img src="~@/assets/R-C.png" alt="" class="logo">
    <div class="login">
        <van-form @submit="login">
            <van-cell-group inset class="phone">
                <van-field
                  v-model="email"
                  name="pattern"
                  label="邮箱"
                  placeholder="邮箱"
                  :rules="[{ required: true, message: '请输入正确的邮箱'}]"
                />
                <van-field
                  v-model="password"
                  type="password"
                  name="密码"
                  label="密码"
                  placeholder="密码"
                  :rules="[{ required: true, message: '请填写密码' }]"
                />
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
import {ref} from "vue";
import {getLogin} from "@/request/api/user.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {Toast} from "vant";
import {getUserDetail,getUserPlaylist} from "@/request/api/user.js";

export default {
    setup() {
        let email = ref("");
        let password = ref("");
        const store = useStore();
        const router = useRouter();
        function getUserMsg(id){
            if(!sessionStorage.getItem("userInfo")){
                getUserDetail(id).then(res=>{
                console.log(res);
                sessionStorage.setItem("userInfo",JSON.stringify({profile:res.data.profile,level:res.data.level,createDays:res.data.createDays}));
                
            }).catch(err=>console.log(err));
            
        }
            }
        function getuPlaylist(id){
             if(!sessionStorage.getItem("userPlaylist")){
            getUserPlaylist(id).then(res=>{
                console.log("userplaylist",res);
                sessionStorage.setItem("userPlaylist",JSON.stringify(res.data.playlist));
            }).catch(err=>{
                console.log(err);
            })
        }
        }
        function login(){
            getLogin(email.value,password.value).then(res=>{
                console.log("login",res);
                if(res.data.code == 200){
                    sessionStorage.setItem("token",JSON.stringify(res.data.token));
                    store.commit("updateToken",res.data.token);
                    Toast.success('登录成功');
                    store.commit("updateIsLogin",true);
                    getuPlaylist(res.data.account.id);
                    getUserMsg(res.data.account.id);
                    setTimeout(()=>{
                        router.push({path:"/user",query:{uid:res.data.account.id}});
                    },500)
                    // router.push({path:"/user",query:{uid:res.data.account.id}});
                }else{
                    Toast.fail("密码错误！")
                }
                
            }).catch(err=>{
                // console.log(err);
                Toast.fail("邮箱未注册！")
            })
        }
        

        return {
            email,
            password,
            login
        }
    },
}
</script>

<style lang="less" scoped>

.bgimg{
    position: relative;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}
.logo{
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 30px;
    position: absolute;
    top: 2rem;
    left: 3rem;
}
.login{
    position: absolute;
    top: 6rem;
    left: 2.3rem;
    width: 3rem;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .van-cell-group .van-cell-group--inset .phone{
        width: 6.3rem;
    }
    .van-field__label{
        width: 0;
    }
    .van-button{
        width: 6.3rem;
    }
    // font-size: .35rem;
    .phone{
        width: 6.3rem;
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
    .van-field{
        margin: .3rem 0;
    }
    

}
.register{
        a{
            color:blue;
        align-self: flex-end;
    }
}

</style>