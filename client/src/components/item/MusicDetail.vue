<template>
    <div class="box">
        <img :src="musicDetail.al.picUrl" alt="" class="bgimg">
        <div class="music-detail">
            <div class="top">
                <svg class="icon" aria-hidden="true" @click="changeFooter">
                    <use xlink:href="#icon-xiangxiazhankai"></use>
                </svg>
                <div class="top-center">
                    <van-notice-bar scrollable>{{musicDetail.name}}</van-notice-bar>

                    <div class="singer">
                        <span v-for="singer in musicDetail.ar" :key="singer">{{singer.name+" "}}</span>
                    </div>
                    
                </div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
            <div class="center" @click="updateIsLyricShow(true)" v-show="!isLyricShow">
                <img src="@/assets/needle-ab.png" alt="" class="img_neddle" :class="{img_needle_active:isPlay}">
                <img src="@/assets/cd.png" alt="" class="img_cd">
                <img :src="musicDetail.al.picUrl" alt="" class="img_al" :class="{img_al_active:isPlay,img_al_paused:
                !isPlay}">

            </div>
            <div class="lyric" v-show="isLyricShow" ref="lyric">
                <p v-for="(item,i) in getLyric" :key="item" class="musiclyric" :class="{p_active:playLiric(i)}">{{item[Object.keys(item)[0]]}}</p>
            </div>
            <div class="bottom">
                <div class="bottom_top">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xihuan"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiazai1"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiaoxi"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gengduo-shuxiang"></use>
                    </svg>
                </div>
                <div class="bottom_center">
                    <span>{{currentT}}</span>
                    <input type="range" step="0.05" min="0" :max="this.$store.state.duration" v-model="this.$store.state.currentTime" ref="input" @input="jumpMusic">
                    <span>{{dt}}</span>
                </div>
                <div class="bottom_bottom">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xunhuan"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="upperSong">
                        <use xlink:href="#icon-shangyishoushangyige"></use>
                    </svg>
                    <svg class="icon contral" aria-hidden="true" @click="play()" v-show="!isPlay">
                        <use xlink:href="#icon-bofang3"></use>
                    </svg>
                    <svg class="icon contral" aria-hidden="true" @click="play()" v-show="isPlay">
                        <use xlink:href="#icon-zanting"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="nextSong">
                        <use xlink:href="#icon-xiayigexiayishou"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofangliebiao"></use>
                    </svg>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive } from '@vue/runtime-core';
import { mapActions, mapMutations, mapState, useStore } from 'vuex';
import {computed} from "vue";

export default {
    components:{
        
    },
    setup(props) {

        // let currentTime = computed(()=>{
        //     return useStore().state.currentTime;
        // });

        // console.log(currentTime);
        


    },
    
    mounted(){
        this.addDuration();
        // this.getLyric();
    },
    updated(){
        this.addDuration();
    },
    computed:{
        ...mapState(["isDetailShow","isPlay","playindex","playlist","isLyricShow","lyric","currentTime","duration"]),
        dt(){
            let dt= "";
            let min = Math.floor(this.duration/60);
            let sec = Math.floor(this.duration%60);
            if(sec<10) sec = "0"+sec;
            dt = "0"+ min + ":" + sec;
            return dt;
        },
        currentT(){
            let currentTime = "";
            let sec1 = Math.floor(this.$store.state.currentTime);
            // console.log(this.$store.state.currentTime);
            // console.log(sec1);
            if(this.$store.state.currentTime>=60){
                let min = Math.floor(this.$store.state.currentTime/60);
                let sec = Math.floor(this.$store.state.currentTime%60);
                if(sec<10){
                    sec = "0" + sec;
                }
                currentTime = "0"+ min + ":" + sec;
            }else{
                if(sec1<10){
                    sec1 = "0" + sec1;
                }
                currentTime = "00:"+ sec1;
            }
            return currentTime;
        },
        getLyric(){
            let stackTime = [];
            let stackLyric = [];
            let tempStack = [];
            let lyricObj = [];
            
            
            let arrLyric = this.lyric.split(/[(\r\n)\r\n]/);
           
            for(let i=0;i<arrLyric.length;i++){
                    let count=0;
                    let tempStr="";
                    let flag = 0;
                for(let j=0;j<arrLyric[i].length;j++){
                    if(arrLyric[i][j] == "["){
                        count++;
                        tempStack.push(count);
                        
                    }else if((arrLyric[i][j] == ":" && flag==0) || arrLyric[i][j] == "."){
                        tempStack.push(tempStr);
                        tempStr = "";
                        
                    }else if(arrLyric[i][j] == "]"){
                        flag = 1;
                        tempStack.push(tempStr);
                        tempStr = "";
                        stackTime.push(tempStack);
                        tempStack = [];
                        
                    }else{
                        tempStr += arrLyric[i][j];
                    }   
                };
                
                stackLyric.push(tempStr);
                
            };
            // console.log("stackTime",stackTime);
            // console.log("stackLyric",stackLyric);

            while(stackTime.length!=0){
                if(stackTime.length > 1){
                    if((stackTime[0][0]==1 && stackTime[1][0]!=2) || stackTime[0][0]==2){
                        let time = parseInt(stackTime[0][1])*60*1000 + parseInt(stackTime[0][2])*1000 + parseInt(stackTime[0][3]);
                        lyricObj.push({[time]:stackLyric[0]});
                        stackTime.shift();
                        stackLyric.shift();
                    }else if(stackTime[0][0]==1 && stackTime[1][0]==2){
                        let time = parseInt(stackTime[0][1])*60*1000 + parseInt(stackTime[0][2])*1000 + parseInt(stackTime[0][3]);
                        lyricObj.push({[time]:stackLyric[0]});
                        stackTime.shift();
                    }
                }else{
                    let time = parseInt(stackTime[0][1])*60*1000 + parseInt(stackTime[0][2])*1000 + parseInt(stackTime[0][3]);
                    lyricObj.push({[time]:stackLyric[0]});
                    stackTime.shift();
                    stackLyric.shift();
                }
            }
            // console.log(lyricObj);
            lyricObj.sort((a,b)=>{return b-a});
            // console.log(lyricObj);
            return lyricObj;
            

        }
    },
    methods:{
        ...mapMutations(["updateisDetailShow","updatePlatindex","updateCurrentTime","updateIsLyricShow","updateIsFooter"]),
        //下一曲
        nextSong(){

            this.updatePlatindex(this.playindex + 1);
            if(this.playindex==this.playlist.length) this.updatePlatindex(0);
            
        },
        //上一曲
        upperSong(){
            this.updatePlatindex(this.playindex - 1);
            if(this.playindex<0) this.updatePlatindex(this.playlist.length-1);
            
        },
        //实现点击进度条跳转播放
        jumpMusic(){
            // console.log("refjump",this.$refs.)
            let time = this.$refs.input.value;
            this.updateCurrentTime(time);
            this.audioTime.currentTime = time;
            // console.log(time);
            // console.log(this.$store.state.currentTime);
        },
        playLiric(i){
            //set lyric active
            let active = false;
            
            if(i!=this.getLyric.length-1){
                if(Object.keys(this.getLyric[i])[0]<= this.$store.state.currentTime*1000 && this.$store.state.currentTime*1000<Object.keys(this.getLyric[i+1])[0]) active = true;
            }else{
                
                if((this.getLyric[this.getLyric.length-1])[0] <= this.$store.state.currentTime*1000){
                    active = true;
                    // console.log("yes");
                }
            }
  
            
            return active;
        },
        //改变footer的展示
        changeFooter(){
            this.updateIsFooter(true);
            this.updateisDetailShow(false);
        }
        
    },
    watch:{
        currentTime(){
            //fixed lyric position
            // console.log(currenTime);
            var p = document.getElementsByClassName("p_active")[0];
            // console.log(p);
            if(p&&p.offsetTop>300){
                this.$refs.lyric.scrollTop = p.offsetTop-300;
            }
            //autoplay next music when currentTime == duration
            if(this.currentTime == this.$store.state.duration){
                this.nextSong();
            }
        }
    },
    props:["musicDetail","play","addDuration","audioTime"]
}
</script>

<style lang="less" scoped>
.box{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color: rgb(221,221,221,0.8);
    background-color: rgba(175, 173, 173, 0.8);

    .bgimg{
        height: 100%;
        width: 100%;
        filter: blur(80px);
        position: relative;
        z-index: -1;
    }
    .music-detail{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: white;
        .top{
            width: 100%;
            height: 2rem;
            padding: .2rem;
            display: flex;
            justify-content: space-between;
            .top-center{
                width: 80%;
                height: 100%;
                .van-notice-bar{
                    color: white;
                    background: none;
                    font-size: .4rem;
                    font-weight: 700;
                }
                .singer{
                    text-align: center;
                }
                span{
                    font-size: .25rem;
                    font-weight: 600;
                    color: rgb(191, 191, 191);

                }
            }
        }
        .center{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: center;
    position: relative;
    .img_neddle{
        width: 2rem;
        height: 3rem;

        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-20deg);
        transition: all 2s;
    }
    .img_needle_active{
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-5deg);
        transition: all 2s;
    }
    .img_cd{
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.2rem;
        z-index: -1;
    }
    .img_al{
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_al 10s linear infinite;
    }
    .img_al_active{
        animation-play-state: running;
    }
    .img_al_paused{
        animation-play-state: paused;
    }
    @keyframes rotate_al {
        0%{transform: rotateZ(0deg);}
        100%{transform: rotateZ(360deg);}
    }
        }
        .lyric{
                width: 100%;
                height: 9rem;
                display: flex;
                flex-direction: column;
                // justify-content: space-between;
                align-items: center;
                position: relative;
                overflow: scroll;
                p{
                    height: 2rem;
                    padding: .2rem;
                    color: rgb(202, 198, 198);
                    text-align: center;
                }
                .p_active{
                    font-size: .4rem;
                    font-weight: 650;
                    color: white;
                }
        }
        .lyric::-webkit-scrollbar{display: none;}
        .bottom{
            height: 3rem;
            width: 100%;
            padding: .2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .bottom_top{
                height: .8rem;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .bottom_center{
                height: .2rem;
                width: 100%;
                // margin-bottom: .3rem;
                padding: .2rem;
                // text-align: center;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: .05rem;
                input{
                    width: 70%;
                    height: .1rem;
                    margin: 0 0.1rem;
                    // background-color: rgb(230, 80, 30);
                    // -webkit-appearance: none;
                }
                span{
                    color: #999;
                }
                // span{
                    // width: 10%;
                    // height: 100%;
                    // font-size: .05rem;
                // }
                
                // input[type='range']::-webkit-slider-runnable-track{  
                //     -webkit-appearance: none;
                //     width: .05rem;
                //     height: .05rem;
                //     background-color:rgb(230, 80, 30);
                // }
                // input[type='range']::-webkit-slider-thumb{  
                //     -webkit-appearance: none;
                //     height: .2rem;
                //     width: .2rem;
                //     border-radius: 50%;
                //     background-color:rgb(230, 80, 30);
                // }

            }
            .bottom_bottom{
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .icon{
                    width: .65rem;
                    height: .65rem;

                }
                .contral{
                    width: .9rem;
                    height: .9rem;
                }
            }
            
        }
    }
}
</style>