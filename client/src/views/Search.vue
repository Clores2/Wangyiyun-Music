<template>
    <div class="search">
        <div class="top" @click="this.$router.go(-1)">
            <svg class="icon right" aria-hidden="true">
                <use xlink:href="#icon-houtuifanhui"></use>
            </svg>
            <van-search
              v-model="val"
              shape="round"
              @search="getSearch"
              @clear="changeSearch(false)"
              placeholder="请输入搜索关键词"
              true
            />
            <!-- <template #action>
            <div @click="onClickButton">x</div>
            </template> -->
            <!-- </v-search> -->
        </div>
        
        <div class="history" v-show="!searched">
            <p>历史</p>
            <div class="items">
                <span  v-for="item in valArr" :key="item" @click="searchRes(item)">{{item}}</span>
            </div>
        </div>
        
        <div v-show="searched">
            <div class="searchResNav">
                <span style="font-weight:600">单曲</span>
                <span>歌单</span>
                <span>视频</span>
                <span>歌手</span>
                <span>博客</span>
            </div>
            <ContentMusiclistDetail :songslist="searchList.value" style="top:-0.3rem"/>
        </div>
        
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import {getSearchRes} from "@/request/api/search.js";
import ContentMusiclistDetail from "@/components/item/ContentMusiclistDetail.vue";
export default {
    components:{
        ContentMusiclistDetail
    },
    setup() {
        let val = ref("");
        let valArr = JSON.parse(localStorage.getItem("valArr"));
        let searchList = reactive([]);
        let searched = ref(false);
        
        function searchRes(keyword){
            getSearchRes(keyword).then(res=>{
                    console.log(res);
                    searchList.value = res.data.result.songs;
                    changeSearch(true);
                }).catch(err=>{
                    console.log(err);
                })
        }
        function getSearch(){
            // console.log(val);
            if(val.value){
                // console.log("yes");
                    searchRes(val.value)
                    //添加搜索记录
                    if(val!="" && !valArr.includes(val.value)){
                        valArr.push(val.value);
                        localStorage.setItem("valArr",JSON.stringify(valArr));
                        if (JSON.parse(localStorage.getItem("valArr")).length > 3) {
                            localStorage.setItem("valArr",JSON.stringify(valArr.slice(-3,)));
                        }
                        valArr = JSON.parse(localStorage.getItem("valArr"));
                        
                    }
                
            }
            
        }
        function changeSearch(val){
            searched.value = val;
            // console.log(searched.value);
        }
        return {val,searchList,valArr,searched,getSearch,changeSearch,searchRes}
    },
}
</script>

<style lang="less" scoped>
.search{
    background-color: white;
    .top{
        height: 1rem;
        width: 100%;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .van-search{
            width: 90%;
            height: .8rem;
        }
    }
    .searchResNav{
        height: 1rem;
        width: 100%;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        // span{

        // }
    }
    .history{
        height: 1rem;
        width: 100%;
        padding: .2rem;
        p{
            font-weight: 600;
            height: .5rem;
            margin-bottom: .2rem;
        }
        .items{
            // height: .6rem;
            display: flex;
            // justify-content: space-between;
            // justify-content: flex-start;
        }
        span{
            padding: .2rem;
            background-color: #f7f8fa;
            border-radius: .4rem;
            height: .8rem;
            margin-right: .2rem;
        }
    }
}
</style>