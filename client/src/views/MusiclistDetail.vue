<template>
    <TopMusiclistDetail :playlist="state.playlist"/>
    <ContentMusiclistDetail :songslist="state.songslist"/>
</template>

<script>
import TopMusiclistDetail from "@/components/item/TopMusiclistDetail.vue";
import ContentMusiclistDetail from "@/components/item/ContentMusiclistDetail.vue";

import {getMusicListDetail,getMusicplaylistSongs} from "@/request/api/item.js";
import { reactive } from '@vue/reactivity';
import { onBeforeMount, onMounted } from '@vue/runtime-core';
import {useRoute} from "vue-router"
// import { onMounted } from '@vue/runtime-core';
export default {
    components:{
        TopMusiclistDetail,
        ContentMusiclistDetail
    },

    // 在页面创建之前发送请求获取数据并存储到sessionStorage中
    // async beforeCreate(){
    //     //获取歌单详情页
    //     let res = await getMusicListDetail(this.$route.query.id);
    //         console.log("res",res);
    //     sessionStorage.setItem("playlist",JSON.stringify(res.data.playlist)) ;
    //     //获取歌单歌曲
    //     let songslist = await getMusicplaylistSongs(this.$route.query.id);
    //     sessionStorage.setItem("songslist",JSON.stringify(songslist.data.songs)) ;

    // },

    setup(){
        const state = reactive({
            playlist:{},
            songslist:{}
        });
        onBeforeMount(async ()=>{
            //获取歌单详情数据
            let res = await getMusicListDetail(useRoute().query.id);
            state.playlist = res.data.playlist || {};
            // console.log(state.playlist);
            // 获取歌单歌曲数据
            let songslist = await getMusicplaylistSongs(useRoute().query.id);
            state.songslist = songslist.data.songs || {};
            // console.log(state.songslist);
        })
        
        //从sessionStorage中获得数据
        //获取歌单详情数据
        // state.playlist = JSON.parse(sessionStorage.getItem("playlist"));
        // console.log("state.playlist",state.playlist);
        // 获取歌单歌曲数据
        // state.songslist = JSON.parse(sessionStorage.getItem("songslist"));
        // console.log(state.songslist);

        return {state};
    },


    
}
</script>