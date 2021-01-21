<template>
  <div id="app">
    <router-view />
    <Message @message="message" />
  </div>
</template>
<script>
import Message from './components/Message'
export default {
  name: 'App',
  components: {
    Message
  },
  data() {
    return {}
  },
  methods: {
    message() {
      this.$router.push('/message')
    }
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
