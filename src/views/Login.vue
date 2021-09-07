<template>
  <div class="login">
    <div class="loginMain">
      <div class="mainHead">
        <img src="../assets/mylogo.png">
        <span>无象限</span>
        <div>后台管理系统</div>
      </div>
      <transition name="el-zoom-in-top">
        <div v-show="mainContent" class="mainContent transition-box">
          <div class="contentTitle">用户登录</div>
          <div class="contentInput">
            <el-input
              placeholder="请输入用户名或邮箱地址"
              prefix-icon="el-icon-user"
              v-model="username"
              clearable>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="usernameTip">用户名或邮箱不能为空</div>
            </transition>
          </div>
          <div class="contentInput contentInputPass">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-unlock"
              v-model="userpassword"
              show-password>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="userpasswordTip">密码不能为空</div>
            </transition>
          </div>
          <div class="contentOther">
            <span @click="forget">忘记密码</span>
            <span>还没有账号，<span @click="register(1)">去注册</span></span>
          </div>
          <div class="contentButton" @click="submit">登录</div>
        </div>
      </transition>
       <transition name="el-zoom-in-top">
        <div v-show="forgetContent" class="mainContent transition-box">
          <div class="contentTitle">忘记密码</div>
          <div class="contentInput">
            <el-input
              placeholder="请输入邮箱地址"
              prefix-icon="el-icon-user"
              v-model="email"
              clearable>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="emailTip">邮箱不能为空</div>
            </transition>
          </div>
          <div class="contentInput">
            <el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-user"
              v-model="vccode"
              clearable>
            </el-input>
            <div class="contentInputbutton">
              <VCButton :email="email" @vcbEvent="emailststus"/>
            </div>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="vccodeTip">验证码不能为空</div>
            </transition>
          </div>
          <div class="contentInput contentInputPass">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-unlock"
              v-model="newpassword"
              show-password>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="newpasswordTip">密码不能为空</div>
            </transition>
          </div>
          <div class="contentInput contentInputPass">
            <el-input
              placeholder="请确认密码"
              prefix-icon="el-icon-unlock"
              v-model="confirm"
              show-password>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="confirmTip">确认密码不能为空</div>
            </transition>
          </div>
          <div class="contentOther">
            <span @click="register(2)">注册</span>
            <span>记起来了，<span @click="toLogin(1)">去登录</span></span>
          </div>
          <div class="contentButton" @click="forgetSubmit">修改密码</div>
        </div>
      </transition>
      <transition name="el-zoom-in-top">
        <div v-show="registerContent" class="mainContent transition-box">
          <div class="contentTitle">注册账号</div>
          <div class="contentInput">
            <el-input
              placeholder="请输入邮箱地址"
              prefix-icon="el-icon-user"
              v-model="regEmail"
              clearable>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="regEmailTip">邮箱不能为空</div>
            </transition>
          </div>
          <div class="contentInput">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="regname"
              clearable>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="regnameTip">用户名不能为空</div>
            </transition>
          </div>
          <div class="contentInput">
            <el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-user"
              v-model="regvccode"
              clearable>
            </el-input>
            <div class="contentInputbutton">
              <VCButton :email="regEmail" @vcbEvent="regemailststus"/>
            </div>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="regvccodeTip">验证码不能为空</div>
            </transition>
          </div>
          <div class="contentInput contentInputPass">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-unlock"
              v-model="regnewpassword"
              show-password>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="regnewpasswordTip">密码不能为空</div>
            </transition>
          </div>
          <div class="contentInput contentInputPass">
            <el-input
              placeholder="请确认密码"
              prefix-icon="el-icon-unlock"
              v-model="regconfirm"
              show-password>
            </el-input>
            <transition name="el-zoom-in-top">
              <div class="contentInputtip transition-box" v-show="regconfirmTip">确认密码不能为空</div>
            </transition>
          </div>
          <div class="contentOther">
            <span></span>
            <span>有账号，<span @click="toLogin(2)">去登录</span></span>
          </div>
          <div class="contentButton" @click="regsubmit">注册</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import VCButton from '../components/VerificationCodeButton.vue'
export default {
  data () {
    return {
      username: '',
      userpassword: '',
      email: '',
      newpassword: '',
      confirm: '',
      vccode: '',
      regEmail: '',
      regname: '',
      regvccode: '',
      regnewpassword: '',
      regconfirm: '',
      usernameTip: false,
      userpasswordTip: false,
      mainContent: true,
      forgetContent: false,
      registerContent: false,
      emailTip: false,
      newpasswordTip: false,
      confirmTip: false,
      vccodeTip: false,
      regEmailTip: false,
      regnameTip: false,
      regvccodeTip: false,
      regnewpasswordTip: false,
      regconfirmTip: false
    }
  },
  methods: {
    forget () {
      this.mainContent = false
      setTimeout(() => {
        this.forgetContent = true
      }, 400)
    },
    toLogin (status) {
      if (status === 1) {
        this.forgetContent = false
        setTimeout(() => {
          this.mainContent = true
        }, 400)
      } else if (status === 2) {
        this.registerContent = false
        setTimeout(() => {
          this.mainContent = true
        }, 400)
      }
    },
    register (status) {
      if (status === 1) {
        this.mainContent = false
        setTimeout(() => {
          this.registerContent = true
        }, 400)
      } else if (status === 2) {
        this.forgetContent = false
        setTimeout(() => {
          this.registerContent = true
        }, 400)
      }
    },
    emailststus (status) {
      this.emailTip = !status
    },
    regemailststus (status) {
      this.regEmailTip = !status
    },
    submit () {
      this.$store.commit('loginIn')
      this.$router.push('/home')
      if (!this.username.trim()) {
        this.usernameTip = true
        return
      } else {
        this.usernameTip = false
      }
      if (!this.userpassword) {
        this.userpasswordTip = true
        return
      } else {
        this.userpasswordTip = false
      }
      console.log(this.username, this.userpassword)
      const loginStatus = false
      if (loginStatus) {
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '不好意思，登录失败',
          type: 'error'
        })
      }
    },
    forgetSubmit () {
      if (!this.email.trim()) {
        this.emailTip = true
        return
      } else {
        this.emailTip = false
      }
      if (!this.vccode) {
        this.vccodeTip = true
        return
      } else {
        this.vccodeTip = false
      }
      if (!this.newpassword) {
        this.newpasswordTip = true
        return
      } else {
        this.newpasswordTip = false
      }
      if (!this.confirm) {
        this.confirmTip = true
        return
      } else {
        this.confirmTip = false
      }
      console.log(this.username, this.userpassword)
      const loginStatus = false
      if (loginStatus) {
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '不好意思，登录失败',
          type: 'error'
        })
      }
    },
    regsubmit () {
      if (!this.regEmail.trim()) {
        this.regEmailTip = true
        return
      } else {
        this.regEmailTip = false
      }
      if (!this.regname.trim()) {
        this.regnameTip = true
        return
      } else {
        this.regnameTip = false
      }
      if (!this.regvccode) {
        this.regvccodeTip = true
        return
      } else {
        this.regvccodeTip = false
      }
      if (!this.regnewpassword) {
        this.regnewpasswordTip = true
        return
      } else {
        this.regnewpasswordTip = false
      }
      if (!this.regconfirm) {
        this.regconfirmTip = true
        return
      } else {
        this.regconfirmTip = false
      }
      const loginStatus = true
      if (loginStatus) {
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '不好意思，登录失败',
          type: 'error'
        })
      }
    }
  },
  components: {
    VCButton
  }
}
</script>
<style lang="less" scoped>
.login{
  height: 100%;
  width: 100%;
  background-image:url('../assets/login.jpg');
  background-size: 100% 100%;
  background-position: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginMain{
    width: 340px;
    min-height: 376px;
    box-sizing: border-box;
    padding: 40px 30px;
    background-color: rgba(255, 255, 255, .9);
    border-radius: 10px;
    position: relative;
    .mainHead{
      position: absolute;
      top: -56px;
      left: 0;
      display: flex;
      align-items: center;
      color: #fff;
      img{
        width: 40px;
        margin-right: 6px;
      }
      span{
        font-size: 28px;
        font-weight: 700;
        margin-right: 8px;
      }
      div{
        padding: 0 8px;
        border-left: 1px solid #ccc;
      }
    }
    .mainContent{
      .contentTitle{
        font-size: 26px;
        margin-bottom: 30px;
        font-weight: 700;
      }
      .contentInputbutton{
        width: 150px;
        height: 40px;
        margin-left: 10px;
      }
      .contentInput{
        margin-bottom: 30px;
        position: relative;
        display: flex;
        align-items: center;
        .contentInputtip{
          position: absolute;
          bottom: -20px;
          color: red;
          font-size: 14px;
          margin-left: 6px ;
        }
      }
      .contentInputPass{
        margin-bottom: 24px;
      }
      .contentOther{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        font-size: 15px;
        &>span:first-child{
          cursor: pointer;
          &:hover{
            color: #24acf2;
          }
        }
        &>span>span{
          color: #24acf2;
          cursor: pointer;
        }
      }
      .contentButton{
        background-color: #333;
        color: #fff;
        border-radius: 4px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
</style>
