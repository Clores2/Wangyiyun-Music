<template>
    <div class="nav">
        <div class="NavLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-view-list"></use>
            </svg>
        </div>
        <div class="NavCenter" ref="listBtn">
            <router-link to="/user">我的</router-link>
            <router-link to="/">发现</router-link>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="NavRight">
            <svg class="icon" aria-hidden="true" @click="this.$router.push('/search')">
                <use xlink:href="#icon-search"></use>
            </svg>
            
        </div>

    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
//
const listBtn = ref(null);
onMounted(()=>{
    //通过父元素获取四个span标签
    const spanList = listBtn.value.children;
    //遍历为其加上click事件
    for(let i = 0;i<spanList.length;i++){
        spanList[i].addEventListener("click",function (){
            //设置点击样式
            this.setAttribute("class","NavCenter_span");
        })
    }
    
})


</script>

<style lang="less" scoped>
.nav{
    width: 100%;
    height: 100%;
    padding: .4rem .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .NavCenter{
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        font-size: .35rem;
        color: #999;
        .NavCenter_span{
            font-size: .4rem;
            font-weight: 700;
            color: #000;
        }
    }

}
</style>