<template>
  <router-view/>
</template>
<script>
export default {
  mounted () {
    const loginStatus = true
    if (loginStatus) {
      this.$router.push('/home')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  min-width: 1200px;
  height: 100vh;
}
</style>
