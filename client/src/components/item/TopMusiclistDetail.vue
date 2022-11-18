<template>
    <img :src="playlist.coverImgUrl" class="bgImg">
    <div class="topMusiclistDetail">
        <div class="top">
            <div class="left">
                <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
                    <use xlink:href="#icon-houtuifanhui"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-shuxiang"></use>
                </svg>
            </div>
        </div>
        <div class="center">
            <div class="left">
                <img :src="playlist.coverImgUrl" class="coverImg">
            </div>
            <div class="right">
                <p class="name">{{playlist.name}}</p>
                <div class="right-center">
                    <img :src="playlist.creator.avatarUrl" alt="">
                    <span>{{playlist.creator.nickname}}</span>
                </div>
                <div class="right-bottom">
                    <p class="description">{{playlist.description}}</p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bangzhujinru"></use>
                    </svg>
                </div>
            </div>

        </div>
        <div class="buttom">
            <div class="buttom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shoucang"></use>
                </svg>
            </div>
            <div class="buttom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
            </div>
            <div class="buttom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-biaoqiankuozhan_tuijian-399"></use>
                </svg>
            </div>
            <div class="buttom-item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    setup(props) {
        // console.log(props);
    },
    //通过props获得父组件传过来的数据
    props:["playlist"]
}
</script>

<style lang="less" scoped>
.bgImg{
    height: 5.6rem;
    width: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(.5rem);
}
.topMusiclistDetail{
    height: 5rem;
    width: 100%;
    position: relative;
    top: .4rem;
    // color: white;
    .top{
        height: .6rem;
        width: 100%;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;

        .left,.right{
            height: 100%;
            width: 22%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                font-size: .35rem;
                font-weight: 700;
            }
        }
    }
    .center{
        width: 100%;
        height: 3.3rem;
        display: flex;
        padding: .2rem;
        .left{
            width: 40%;
            height: 100%;
            .coverImg{
            width: 2.7rem;
            height: 2.7rem;
            border-radius: .3rem;
        }
        }
        .right{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 60%;
            height: 100%;
            padding-left: .1rem;
            .name{
                
                font-weight: 600;
                color: white;
            }
            color: rgb(199, 197, 197);
            .right-center{
                height: .8rem;
                width: 100%;
                display: flex;
                align-items: center;
                img{
                    height: .7rem;
                    width: .7rem;
                    border-radius: 50%;
                    margin-right: .2rem;
                }
                span{
                    font-size: .25rem;
                    font-weight: 550;
                }
            }
            .right-bottom{
                height: .4rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .description{
                    width: 80%;
                    height: 100%;
                    font-size: .25rem;
                    font-weight: 550;
                    overflow: hidden;
                    white-space: nowrap; 
                    text-overflow: ellipsis;
                }
                .icon{
                    width: .3rem;
                    height: .3rem;
                }
            }
        }
        
    }
    .buttom{
        height: 1rem;
        width: 100%;
        padding: .2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: white;
    }
}
</style>