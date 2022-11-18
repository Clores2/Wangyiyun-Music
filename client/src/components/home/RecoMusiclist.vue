<template>
    <div class="recoMusicList">
        <div class="title">
            <h3>推荐歌单</h3>
            <div class="titleRight">
                <span>更多</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jinru"></use>
                </svg>
            </div>
            
        </div>
        <div class="musiclist">
            <van-swipe :loop="false" :width="150"  class="musicItems" :show-indicators="false">
              <van-swipe-item   v-for="item in state.recoMusiclist" :key="item" class="musicItem">
                <router-link :to="{path:'/musiclist',query:{id:item.id},}">
                <img :src="item.picUrl">
                <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang"></use>
 
                        </svg>
                        <span>{{changeCount(item.playCount)}}</span>
                </span>
                <span class="name">{{item.name}}</span>
                </router-link>
              </van-swipe-item>

            </van-swipe>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import {getMusicList} from "@/request/api/home.js";


export default {
    setup() {
        const state = reactive({recoMusiclist:[]});
        onMounted(async ()=>{
            let res = await getMusicList();
            // console.log(res);
            state.recoMusiclist = res.data.result;
            // console.log(state.recoMusiclist);
        });
        function changeCount(number){
            return (number/10000)+"万";
        };
        
        return {state, changeCount}

    },
    
   
}
</script>

<style lang="less" scoped>
.recoMusicList{
    width: 100%;
    height: 5rem;
    padding: .2rem;
    .title{
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .titleRight{
            width: 1.3rem;
            height: 60%;
            padding: .1rem .1rem .1rem .15rem;
            border: solid .02rem rgb(231, 226, 226);
            border-radius: .4rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span{
                font-size: .25rem;
            }
            .icon{
                width: .3rem;
                height: .3rem;
            }
        }
    }
    .musiclist{
        width: 100%;
        height: 4rem;
        .musicItems{
            height: 100%;
            .musicItem{
                width: 3rem;
                height: 100%;
                padding: 5px;
                position: relative;
                img{
                    width: 100%;
                    height: 3rem;
                    border-radius: .2rem;
                }
                .playCount{
                    position: absolute;
                    padding: 5px;
                    right: .16rem;
                    z-index: 99;
                    color: hsla(0, 0%, 100%, 0.925);
                    font-size: 10px;
                    .icon{
                        width: 15px;
                        height: 15px;
                        margin-right: 2px;
                        vertical-align: middle;
                    }
                    span{
                        vertical-align: middle;
                    }
                }
                .name{
                    display: block;
                    width: 100%;
                    height: 100px;
                    line-height: 20px;
                    font-size: 15px;
                    text-align: left;
                }
            }
            
        }
    }
}
</style>
