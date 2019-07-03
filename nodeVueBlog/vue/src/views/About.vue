<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hello-World :msg="msgF"></hello-World>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld'
export default {
  data() {
    return {
      msgF: '来自父组件的信息'
    }
  },
  components: {
    HelloWorld
  }
}
</script>
