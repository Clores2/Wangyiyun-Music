import { createStore } from 'vuex';
import { getLyric } from "@/request/api/item";

export default createStore({
  state: {
    playlist: [{
      id: 202369,
      name: "画",
      al: {
        picUrl:"https://p1.music.126.net/wldFtES1Cjnbqr5bjlqQbg==/18876415625841069.jpg",
      },
      ar: [{
        name:"赵雷"
      }],
    }],
    playindex: 0,
    isPlay: false,//是否正在播放
    isDetailShow: false,//是否展示歌曲详情页面
    duration: 0,//歌曲总时长
    currentTime: 0,//歌曲播放时间
    isLyricShow: false,//是否展示歌词页面
    lyric:"",//歌词
    isFooter:true,
    isLogin: false,
    token:""
  },
  getters: {
  },
  mutations: {
    updatePlaylist(state, value) {
      state.playlist = value;
    },
    updatePlatindex(state, value) {
      state.playindex = value;
    },
    updateIsplay(state, value) {
      state.isPlay = value;
    },
    updateisDetailShow(state, value) {
      state.isDetailShow = value;
    },
    updateDuration(state, value) {
      state.duration = value;
      // console.log(state.duration);
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
    },
    updateIsLyricShow(state, value) {
      state.isLyricShow = value;
    },
    updateLyric(state, value) {
      state.lyric = value;
    },

    updateIsLogin(state, value) {
      state.isLogin = value;
    },
    updateIsFooter(state, value) {
      state.isFooter= value;
    },
    updateToken(state, value) {
      state.token= value;
    },

    
  },
  actions: {
    async getMusicLyric(context, id) {
      let res = await getLyric(id);
      context.commit("updateLyric",res.data.lrc.lyric)
      
    }
  },
  modules: {
  }
})
