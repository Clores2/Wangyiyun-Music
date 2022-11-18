<template>
    <div class="footer" v-show="isFooter">
        <div class="left" @click="changeFooter">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle"></use>
            </svg>
            <div class="music">
                <span class="music-name">{{playlist[playindex].name}}</span>
                <span class="music-singer" v-for="singer in playlist[playindex].ar" :key="singer">{{singer.name}}</span>
            </div>
        </div>
        <div class="right">
            <svg class="icon" aria-hidden="true" @click="play" v-show="!isPlay">
                <use xlink:href="#icon-bofang3"></use>
            </svg>
            <svg class="icon" aria-hidden="true"  @click="play" v-show="isPlay">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangliebiao"></use>
            </svg>

        </div>
        <audio autoplay ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playindex].id}.mp3`"></audio>
    </div>
    <div class="musicDetail" v-if="isDetailShow">
        <van-popup v-model:show="isDetailShow" position="bottom" :style="{ height: '100%' }">
            <MusicDetail :musicDetail="playlist[playindex]" :play="play" :addDuration="addDuration" :audioTime="this.$refs.audio"/>
        </van-popup>
    </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";

export default {
    components:{
        MusicDetail
    },
    setup() {
    },
    data(){
        return {interval: 0}
    },
    mounted(){
        this.$store.dispatch("getMusicLyric",this.playlist[this.playindex].id);
        
        // this.updateCurrentTime(this.$refs.audio.duration);
        this.addDuration();
        this.updateTime();

    },
    updated(){
        this.$store.dispatch("getMusicLyric",this.playlist[this.playindex].id);
        
        this.addDuration();
        this.updateTime();
        // this.updateCurrentTime(this.$refs.audio.currentTime);

    },
    computed:{

        ...mapState(["playlist","playindex","isPlay","isDetailShow","isLoginShow","isFooter"])
    },
    methods:{
        ...mapMutations(["updateIsplay","updateisDetailShow","updateDuration","updateCurrentTime","updateIsFooter"]),
        ...mapActions(["getMusicLyric"]),
        play(){
            // console.log(this.$refs);
        
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.updateIsplay(true);
                // console.log("yes",this.isPlay);
                this.addDuration();
                this.updateTime();
            }else{

                this.$refs.audio.pause();
                this.updateIsplay(false);
                // console.log("no",this.isPlay);
                clearInterval(this.interval);

            }
        },
        //添加总时长
        addDuration(){
            this.updateDuration(this.$refs.audio.duration);
        },
        updateTime(){
            this.interval = setInterval(()=>{
                this.updateCurrentTime(this.$refs.audio.currentTime)
            },1000)
        },
        //改变组件和footer的显示
        changeFooter(){
            this.updateIsFooter(false);
            this.updateisDetailShow(true);
        }
    },
    watch:{
        playindex(){
            this.$refs.audio.play();
            this.updateIsplay(true);
            // this.$store.dispatch("getMusicLyric",this.playlist[this.playindex].id);
            
        },
        playlist(){
            this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){//如果本来是暂停状态，改变图标
                this.updateIsplay(true);
            }
        }
        
    }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    height: .9rem;
    position: fixed;
    padding: .2rem;
    z-index: 1;
    bottom: 0;
    border-top: solid 1px rgb(190, 188, 188);
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        .icon{
            width: 1rem;
            height: 1rem;
            align-self: flex-end;
        }
        .music{
            height: 100%;
            width: 80%;
            white-space: nowrap;
            overflow: hidden;
            margin-left: .1rem;
            .music-name{
                font-size: .3rem;
                margin-right: .2rem;
                font-weight: 700;
                
            }
            .music-singer{
                font-size: .25rem;
                color: #999;
            }
        }

    }
    .right{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            width: .5rem;
            height: .5rem;
        }
    }
}
</style>