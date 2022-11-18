<template>
        <Swipe/>
        <HomeIcon/>
        <RecoMusiclist/>
</template>

<script>
// @ is an alias to /src

import Swipe from "@/components/home/Swipe.vue";
import RecoMusiclist from "@/components/home/RecoMusiclist.vue";
import HomeIcon from "@/components/home/HomeIcon.vue";





export default {
  name: 'Home',
  components: {

    Swipe,
    HomeIcon,
    RecoMusiclist,
    
  }
}
</script>