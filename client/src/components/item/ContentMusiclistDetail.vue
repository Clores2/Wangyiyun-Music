<template>
    <div class="content">
        <div class="top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <span class="text">播放全部</span>
                <span class="number"></span>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-caidan"></use>
                </svg>
            </div>
        </div>
        <div class="content-body" v-for="(item,i) in songslist" :key="item">
            <div class="left" @click="playmusic(i)">
                <span class="list">{{i+1}}</span>
                <div class="music">
                    <p class="music-name">{{item.name}}</p>
                    <span class="singer" v-for="ar in item.ar" :key="ar">{{ar.name+" "}}</span>
                </div>
            </div>
            <div class="right">
                <svg class="icon mv" aria-hidden="true" v-if="item.mv">
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon mulu" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-shuxiang"></use>
                </svg>
            </div>
        </div>
    </div>
</template>


<script>
// import {mapActions, mapMutations, mapState} from "vuex";
// export default {
//     setup(props) {
//         console.log("songslist",props);

//     },
//     methods:{
//         ...mapMutations(["updatePlaylist"]),
//         playmusic(i){
//             this.updatePlaylist(this.songslist[i]);
            
//             console.log(this.playlist);
//         },
//     },
//     computed:{
        
//         ...mapState(["playlist"])
//     },
//     props:["songslist"]
// }
import {mapActions, mapMutations, mapState} from "vuex";
// import {getMusicitem} from "@/request/api/item.js";
export default { 
    setup(props) {
        // console.log("songslist",props);

    },
    
    methods:{
        ...mapMutations(["updatePlaylist","updatePlatindex","updateIsplay","updateCurrentTime"]),
        playmusic(i){
            this.updatePlaylist(this.songslist);
            this.updatePlatindex(i);
            this.updateIsplay(true);
        },

    },
    computed:{
        ...mapState(["playlist"])
    },
    props:["songslist"]
}
</script>

<style lang="less" scoped>
.content{
    position: relative;
    top: 1rem;
    .top{
        height: 1rem;
        width: 100%;
        padding: 0 .4rem 0 .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left,.right{
            height: 100%;
            width: 30%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .right{
            width: 20%;
            .icon{
                width: .45rem;
                height: .45rem;

            }

        }
    }
    .content-body{
        height: 100%;
        width: 100%;
        padding: .2rem;
        display: flex;
        align-items: center;
        .left{
            height: 100%;
            width: 80%;
            display: flex;
            align-items: center;
            .list{
                width: 13%;
                font-size: .35rem;
                color: #999;
            }
            .music{
                width: 90%;
                height: 100%;
                // display: flex;
                // flex-direction: column;
                p{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;

                }
                
                .singer{
                    font-size: .25rem;
                    color: #999;
                    height: .2rem;
                    white-space: nowrap;
                    
                }
            }
        }
        .right{
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            color: #999;

            .mv{
                width: .45rem;
                height: .4rem;
            }
            .mulu{
                width: .5rem;
                height: .5rem;
                margin-left: .2rem;
            }
            
        }
    }
}
</style>