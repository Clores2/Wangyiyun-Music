<template>
<div class="user">
    <div class="userInfo">
        <img :src="user.avatarUrl" alt="" class="userImg">
        <div class="userIntro">
            <h3 class="userName">{{user.nickname}}</h3>
            <p class="level">
                <p class="levelStr">等级</p>
                <span class="levelNum">{{user.level}}</span>
            </p>
            <p>
                你已经听歌<span>{{user.createDays}}</span>天啦！
            </p>
        </div>  
    </div>
    <div class="userIcon">
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use>
            </svg>
            <p>最近播放</p>
        </div>
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-xiazai2"></use>
            </svg>
            <p>本地/下载</p>
        </div>
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-xiazai_gaoliang"></use>
            </svg>
            <p>云盘</p>
        </div>
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-zaicigoumai"></use>
            </svg>
            <p>已购</p>
        </div>
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-kehu"></use>
            </svg>
            <p>我的好友</p>
        </div>
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-shoucang1"></use>
            </svg>
            <p>收藏和赞</p>
        </div>
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-signal"></use>
            </svg>
            <p>我的播客</p>
        </div>
        <div class="item">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-yinle1"></use>
            </svg>
            <p>乐谜团</p>
        </div>
        
    </div>
    <div class="mine">我的歌单</div>
    <div class="playlist">
        
        <div class="top">
            <span>歌单({{userPlaylist.length}}个)</span>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-shuxiang"></use>
                </svg>
            </div>
        </div>
        <div class="center" v-for="item in userPlaylist" :key="item">
            <router-link :to="{path:'/musiclist',query:{id:item.id},}">
            <div class="left">
                <img :src="item.coverImgUrl" alt="">
                <div class="playlistname">
                    <p class="name">{{item.name}}</p>
                    <p class="count">{{item.playCount}}首</p>
                </div>
            </div>
            </router-link>
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-gengduo-shuxiang"></use>
            </svg>
        </div>
     </div>
</div>
    
</template>

<script>
import {getUserDetail,getUserPlaylist} from "@/request/api/user.js";
import { reactive } from '@vue/reactivity';
export default {
    data(){
        let user = {
            nickname : "",
            avatarUrl: "",
            level : 0,
            createDays : ""
        };
        let userPlaylist = [];

        
        return {
            user,
            userPlaylist
        }
    },
    methods:{
        // getUserMsg(){
        //     if(!sessionStorage.getItem("userInfo")){
        //         getUserDetail(this.$route.query.uid).then(res=>{
        //         console.log(res);
        //         sessionStorage.setItem("userInfo",JSON.stringify({profile:res.data.profile,level:res.data.level,createDays:res.data.createDays}));
                
        //     }).catch(err=>console.log(err));
            
        // }
        //     },
        setUserMsg(){
            this.user.nickname = JSON.parse(sessionStorage.getItem("userInfo")).profile.nickname;
            this.user.avatarUrl = JSON.parse(sessionStorage.getItem("userInfo")).profile.avatarUrl;
            this.user.level = JSON.parse(sessionStorage.getItem("userInfo")).level;
            this.user.createDays = JSON.parse(sessionStorage.getItem("userInfo")).createDays;
            this.userPlaylist = JSON.parse(sessionStorage.getItem("userPlaylist"));
        },
        // getuPlaylist(){
        //      if(!sessionStorage.getItem("userPlaylist")){
        //     getUserPlaylist(this.$route.query.uid).then(res=>{
        //         console.log("userplaylist",res);
        //         sessionStorage.setItem("userPlaylist",JSON.stringify(res.data.playlist));
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        // }
        // }
    },
    created(){
        // this.getUserMsg();
        // this.getuPlaylist();
    },
    mounted(){
        this.setUserMsg();
    }
}
</script>


<style lang="less" scoped>
.user{
    padding: .3rem;
    .userInfo{
        height: 3rem;
        width: 100%;
        border-radius: .4rem;
        background-color: white;
        display: flex;
        align-items: center;
        .userImg{
            height: 2rem;
            width: 2rem;
            border-radius: 50%;
            margin:0 .2rem;
        }
        .userIntro{
            height: 2rem;
            width: 100%;
            padding: 0 .2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h3{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            p{
                color: #999;
            }
            span{
                margin: 0 .2rem;
            }
            .levelStr{
                display: inline-block;
            }
        }
    }
    .mine{
        margin-top: .4rem;
        height: .4rem;
        padding-left: .2rem;
        font-size: .35rem;
        font-weight: 600;
    }
    .userIcon{
        height: 3rem;
        width: 100%;
        border-radius: .4rem;
        background-color: white;
        display: flex;
        margin-top: .4rem;
        flex-flow: row wrap;
        padding: .2rem;
        align-items: center;
        // justify-content: space-around;
        .item{
            height: 40%;
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                height: .7rem;
                width: .7rem;
            }
            p{
                font-size: .25rem;
            }
        }
    }
    .playlist{
        margin-top: .4rem;
        // height: 2.5rem;
        width: 100%;
        background-color: white;
        border-radius: .3rem;
        padding: .2rem;
        .top{
            height: .7rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            // color: #999;
            font-size: .3rem;
            .right{
                width: 20%;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                
            
                .icon{
                    height: .45rem;
                    width: .45rem;
                }
            }
        }
        .center{
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin: .2rem 0;
            // align-items: center;
            .icon{
                height: .45rem;
                width: .45rem;
            }
            .left{
                height: 100%;
                width: 95%;
                display: flex;
                align-items: center;
                img{
                    height: 1rem;
                    width: 1rem;
                    margin-right: .2rem;
                    border-radius: .1rem;
                }
                .playlistname{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    // justify-content: space-between;
                   
                    .name{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-bottom: .1rem;
                    }
                    .count{
                        font-size: .25rem;
                        color: #999;
                    }

                }
            }
        }
    }
}
</style>

