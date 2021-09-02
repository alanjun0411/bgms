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
      <div class="mainTop">
        <div :style="{width: '32%', height: '100%'}" ref="pieChart"></div>
        <div :style="{width: '32%', height: '100%'}" ref="lineChart"></div>
        <div :style="{width: '32%', height: '100%'}" ref="positiveNegative"></div>
      </div>
      <div class="mainBottom">
        <div class="mainBottomTable">
          <div class="tableTitle">数据共享资源单位</div>
          <div></div>
        </div>
        <div class="mainBottomChart"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      time: '00:00:00',
      location: '无法定位',
      newwidth: '500px'
    }
  },
  mounted () {
    this.getTime()
    this.$root.publics.getLocation((data) => {
      data.status ? this.location = data.data.addressComponent.city : this.location = '无法定位'
    })
    this.pieChart()
    this.lineChart()
    this.positiveNegative()
  },
  methods: {
    getTime () {
      this.time = this.$root.publics.formatTime('H:m:s')
      setInterval(() => {
        this.time = this.$root.publics.formatTime('H:m:s')
      }, 1000)
    },
    pieChart () {
      const myChart = this.$root.echarts.init(this.$refs.pieChart, 'dark')
      myChart.setOption({
        title: {
          text: '资源总量构成',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{c}'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: [0, '50%'],
            labelLine: {
              length: 30
            },
            label: {
              formatter: ' {b|{b}：}  {d|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                b: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33
                },
                d: {
                  color: '#4C5058',
                  lineHeight: 33
                }
              }
            },
            data: [
              { value: 1048, name: '百度' },
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 251, name: '谷歌' },
              { value: 234, name: '联盟广告' },
              { value: 147, name: '必应' },
              { value: 135, name: '视频广告' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      })
    },
    positiveNegative () {
      const myChart = this.$root.echarts.init(this.$refs.positiveNegative, 'dark')
      myChart.setOption({
        title: {
          text: '性别总量统计',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['不详', '男', '女']
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
          }
        ],
        series: [
          {
            name: '不详',
            type: 'bar',
            label: {
              show: true,
              position: 'right'
            },
            emphasis: {
              focus: 'series'
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          },
          {
            name: '男',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'right'
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            name: '女',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      })
    },
    lineChart () {
      const myChart = this.$root.echarts.init(this.$refs.lineChart, 'dark')
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '资源统计',
          left: 'left'
        },
        legend: {
          data: ['数据总量', '更新量', '共享次数'],
          left: 'center'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '数据总量',
            type: 'line',
            data: [10, 11, 13, 11, 12, 20, 9],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '更新量',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '共享次数',
            type: 'line',
            data: [2, 0, 8, 6, 5, 7, 3],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
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
    border-bottom: 4px solid #126193;
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
        .mdTop{
          color: #daeee2;
        }
        .mdBottom{
          color: #9fdfde;
        }
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
  .main{
    height: calc(100vh - 178px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .mainTop, .mainBottom{
      height: 49%;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .mainBottom{
      align-items: flex-start;
      &>div{
        width: 48%;
        height: 96%;
        background-color: #091629;
      }
      .mainBottomTable{
        .tableTitle{
          color: #1683c6;
        }
      }
    }
  }
}
</style>
