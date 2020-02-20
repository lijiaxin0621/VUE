<template>
  <div class="container">
    <img src="../../assets/images/pan.png" class="pan" alt />
    <img :class="isPlay?'move':'unmove'" src="../../assets/images/shou.png" class="handle" alt />
    <div class="bg" v-for="item of songs" :key="item.id">
      <img :class="!isPlay?'rotate':'pause'" src="../../assets/images/洲际.jpg" class="pic" alt />
      <img class="bg-pic" src="../../assets/images/洲际.jpg" alt />
      <div class="cover"></div>
      <div class="playmusic">
        <p ref="music" @click="getDom">音乐播放</p>
        <img
          class="play"
          :src="isPlay?require('../../assets/images/play.png'):require('../../assets/images/pause.png')"
          alt
          @click="toggle"
        />
        <audio @play="onPlay" @pause="onPause" :src="item.playUrl" controls ref="audio"></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: false,
      songs: []
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  mounted() {
    console.log(this.id);
    var url = `https://music.aityp.com/song/url?id=${this.id}`;
    this.axios.get(url).then(res => {
      this.songs = res.data.data;
      var songs = [];
      this.songs.forEach(item => {
        var obj = {};
        obj.playUrl = item.url;
        songs.push(obj);
      });
      this.songs = songs;
    });
  },
  methods: {
    toggle() {
      /* this.isPlay = !this.isPlay; */
      if (this.isPlay) {
        this.$refs.audio.pause();
        this.isPlay = false;
      } else {
        this.$refs.audio.play();
        this.isPlay = true;
      }
    },
    //监听音乐的播放
    onPlay() {
      this.isPlay = true;
    },
    onPause() {
      this.isPlay = false;
    },
    /* 获取Dom */
    getDom() {
      console.log(this.$refs.music);
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  height: 600px;
  z-index: 1;
}
.handle {
  width: 120px;
  height: 200px;
  position: absolute;
  left: 50%;
  transform: rotate(0deg);
  transform-origin: 28px 27px;
  z-index: 3;
}
.playmusic {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 420px;
  left: 40px;
  z-index: 3;
}
.playmusic img {
  width: 50px;
  height: 50px;
}

.pic {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: absolute;
  top: 31%;
  left: 35%;
  z-index: 3;
}
.bg-pic {
  width: 10rem;
  height: 600px;
  position: absolute;
  top: 0%;
  left: 0%;
  bottom: 0;
  z-index: 1;
}
.cover {
  width: 10rem;
  height: 600px;
  position: absolute;
  top: 0%;
  left: 0%;
  z-index: 2;
  background: rgba(170, 170, 170, 0.5);
  overflow: hidden;
}
.pan {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 150px;
  left: 25%;
  z-index: 3;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: rotate 4s linear infinite;
  animation-play-state: paused;
}
.paused {
  animation: rotate 4s linear infinite;
  animation-play-state: running;
}

.move {
  transform: rotate(20deg);
}

.unmove {
  transform: rotate(0deg);
}
.play {
  position: absolute;
  top: 0;

  z-index: 10;
}
</style>