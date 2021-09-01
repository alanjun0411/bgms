<template>
  <div class="visualization">
    <div class="head">
      <div class="headTitle">无象限大数据共享交换平台</div>
      <div class="headtopbg"></div>
    </div>
    <div class="other">
      <div class="other_time">
        <div class="mainTime">{{time}}</div>
        <div class="mainDate">
          <div class="mdTop">{{$root.publics.formatTime('Y年m月d日')}}</div>
          <div class="mdBottom">{{$root.publics.formatWeek('星期')}}</div>
        </div>
      </div>
      <div class="other_location">
        <span class="iconfont icon-dingwei"></span>
        <span>{{location}}</span>
      </div>
    </div>
    <div class="main">
      <div :style="{width: '300px', height: '300px'}" ref="myechart"></div>
    </div>
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
  </div>
</template>
<script>
import mapDrag from '../components/mapDrag.vue'
export default {
  data () {
    return {
      time: '00:00:00',
      location: '无法定位'
    }
  },
  components: {
    mapDrag
  },
  mounted () {
    this.drawLine()
    this.getTime()
    this.$root.publics.getLocation((data) => {
      data.status ? this.location = data.data.addressComponent.city : this.location = '无法定位'
    })
  },
  methods: {
    getTime () {
      this.time = this.$root.publics.formatTime('H:m:s')
      setInterval(() => {
        this.time = this.$root.publics.formatTime('H:m:s')
      }, 1000)
    },
    drawLine () {
      const myChart = this.$root.echarts.init(this.$refs.myechart)
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.visualization{
  width: 100vw;
  height: 100vh;
  background-color: #0b1839;
  .head{
    position: relative;
    height: 80px;
    width: 100%;
    background-color: #0e1d38;
    border-bottom: 3px solid #126193;
    .headTitle{
      position: absolute;
      top: 68%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      font-weight: 700;
      color: #fff;
      z-index: 10;
    }
    .headtopbg{
      width: 482px;
      height: 50px;
      background-image: url('../assets/topbg.png');
      background-size: 100% 100%;
      position: absolute;
      bottom: -32px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .other{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 20px 0;
    color: #fff;
    .other_time{
      display: flex;
      align-items: center;
      .mainTime{
        font-size: 40px;
        margin-right: 10px;
        color: #64e5ce;
      }
      .mainDate{
        font-size: 20px;
      }
    }
    .other_location{
      font-size: 24px;
      color: #00ccff;
      &>.iconfont{
        margin-right: 6px;
        font-size: 24px;
      }
    }
  }
}
</style>
