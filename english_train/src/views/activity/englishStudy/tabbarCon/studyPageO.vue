<template>
  <div class="textCont">
    <img id="defImg" :src="state" alt="">
    <p class="defTime">{{msg}}</p>
  </div>
</template>
<script>
import gif from './gifAnimation'
export default {
  name: 'studyPageO',
  mixins: [gif],
  data () {
    return {
      msg: '8月1日开放 敬请期待',
      state: true
    }
  }
}
</script>
<style scoped lang="less">
  .textCont{
    text-align: center;
    padding-top: 110px;
  }
  #defImg {
    width: 294px;
    height: 200px;
  }
  .defTime{
    font-size: 28px;
    margin-top: 5px;
  }
</style>
