<template>
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
</template>

<script>
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
export default {
  name: `${ACTIVITY_ENGLISH_STUDY}List`,
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.jsb(vm.jsbData)
    })
  },
  data () {
    return {
      jsbData: {
        title: {
          titName: this.$route.meta.title,
          titleImgUrl: 'http://img.zcool.cn/community/018d4e554967920000019ae9df1533.jpg@900w_1l_2o_100sh.jpg',
          titleImgColor: '000000',
          titleImgAlpha: '1',
          titleCntColor: ''
        }
      }
    }
  },
  created () {
    console.log(123)
  }
}
</script>

<style scoped lang="less">
</style>
