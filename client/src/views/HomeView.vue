<template>
  <div class="home">
    <Nav/>
    <router-view></router-view>


  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/home/Nav.vue";
// import Swipe from "@/components/home/Swipe.vue";
// import RecoMusiclist from "@/components/home/RecoMusiclist.vue";
// import HomeIcon from "@/components/home/HomeIcon.vue";





export default {
  name: 'Home',
  components: {
    Nav,
    // Swipe,
    // HomeIcon,
    // RecoMusiclist,
    
  }
}
</script>
