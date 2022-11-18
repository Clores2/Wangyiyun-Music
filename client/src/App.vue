<template>
  <router-view/>
  <div>
    <Footer/>
  </div>
  
</template>

<script>
import Home from "@/views/HomeView.vue";
import Footer from "@/components/item/Footer.vue";

export default {
  components:{
    
    Footer
  },
  setup() {
    
  },
}
</script>

<style lang="less">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "微软雅黑";
  }

  // 渐变背景色
  html{
     background:linear-gradient(top,rgb(232,235,242),rgb(255,255,255)) no-repeat ;
     background:-webkit-linear-gradient(top,rgb(232,235,242),rgb(244, 244, 244)) no-repeat;
  }
  //加入通用css代码（引入一次就行）,对图标进行样式修饰
.icon {
       width: 2em; height: 2em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
a{
  color: black;
}

</style>
