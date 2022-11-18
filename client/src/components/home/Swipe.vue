<template>
<div class="swipe">
  <van-swipe :autoplay="2000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
</div>
    
</template>

<script>
import {getBanner} from "@/request/api/home.js"
import {reactive,onMounted} from "vue";
export default {
  setup() {
    const state = reactive({
      images:[]
    })
    onMounted(async ()=>{
      let res = await getBanner();
      // console.log(res);
      state.images = res.data.banners;
    })
    return { state };
  },
};
</script>

<style lang="less" scoped>
.swipe{
  width: 100%;
   padding: 0 .2rem;
  .van-swipe{
    width: 100%;
    height: 3rem;
   
    img{
      width: 100%;
      height: 100%;
      border-radius: .2rem;
    }
    .van-swipe__indicators{
            .van-swipe__indicator--active{
                background-color:rgb(219,130,130);
            }
        }
}
}

</style>