<template>
  <div class="home">
    <div class="homeRight">
      <div class="homeRightLogo">
        <img src="../assets/mylogo.png" alt="">
        <span>无象限科技</span>
      </div>
      <div class="homeRightMain">
        <div class="homeRightMainTop">
          <div v-for="(item, index) in list" :key="index" @click="got(index)" :class="ativeIndex == index ? 'munavt' : ''">
            <span :class="'iconfont '+item.icon"></span>
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="homeRightMainBottom">
          <span class="iconfont icon-tuichu" @click="loginOut"></span>
          <span>退出</span>
        </div>
      </div>
    </div>
    <div class="homeMain">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      ativeIndex: 0,
      list: [
        {
          icon: 'icon-shouye',
          id: 1,
          title: '首页',
          path: '/home/index'
        },
        {
          icon: 'icon-shangpin',
          id: 2,
          title: '商品管理',
          path: '/home/shop'
        },
        {
          icon: 'icon-fankui',
          id: 3,
          title: '数据分析',
          path: '/visualization'
        }
      ]
    }
  },
  mounted () {
    if (!this.$store.state.login) {
      this.$router.push('/login')
      return
    }
    if (this.$route.path === '/home') {
      this.$router.push({ path: '/home/index', query: { index: 0 } })
      this.ativeIndex = 0
    } else {
      this.$router.push({ path: this.$route.path, query: { index: this.$route.query.index } })
      this.ativeIndex = this.$route.query.index
    }
  },
  methods: {
    got (index) {
      if (this.ativeIndex === index) return
      this.ativeIndex = index
      this.$router.push({ path: this.list[index].path, query: { index } })
    },
    loginOut () {
      this.$store.commit('loginOut')
      this.$router.push({ path: '/login' })
    }
  },
  watch: {
    '$route.path': function () {
      this.ativeIndex = this.$route.query.index
    }
  }
}
</script>

<style lang="less" scoped>
.home{
  background-color: #f6f6fc;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .homeRight{
    width: 200px;
    height: 100%;
    .homeRightLogo{
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      span{
        font-size: 22px;
        font-weight: 700;
      }
    }
    .homeRightMain{
      width: 100%;
      height: calc(100% - 100px);
      background-color: #52b7f5;
      border-top-right-radius: 100px;
      .homeRightMainTop{
        height: 92%;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        // padding: 20px 0;
        padding-top: 10px;
        box-sizing: border-box;
        .munavt{
          color: #0a494a;
        }
        &>div{
          padding-top: 16px;
          width: 140px;
          color: #fff;
          font-size: 16px;
          display: flex;
          align-items: center;
          // justify-content: center;
          cursor: pointer;
          &:hover{
            color: #0a494a;
          }
          &>.iconfont{
            margin-right: 6px;
            font-size: 23px;
          }
        }
      }
      .homeRightMainBottom{
        height: 8%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        &>.iconfont{
          cursor: pointer;
          margin-right: 4px;
          font-size: 23px;
        }
      }
    }
  }
  .homeMain{
    width: calc(100% - 210px);
    height: 100vh;
  }
}
</style>
