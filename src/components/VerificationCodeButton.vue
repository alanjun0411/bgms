<template>
  <div class="verificationCodeButton" @click="getCode">
    {{status ? `${statusTxt}s` : '获取验证码'}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: false,
      statusTxt: 60
    }
  },
  props: {
    email: String
  },
  methods: {
    getCode () {
      if (this.statusTxt !== 60) return
      if (!this.email) {
        this.$emit('vcbEvent', false)
      } else {
        this.$emit('vcbEvent', true)
        this.status = true
        const timer = setInterval(() => {
          this.statusTxt--
          if (this.statusTxt === 0) {
            clearInterval(timer)
            this.status = false
            this.statusTxt = 60
          }
        }, 1000)
      }
      console.log(this.email)
    }
  }
}
</script>

<style scoped lang="less">
.verificationCodeButton{
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
}
</style>
