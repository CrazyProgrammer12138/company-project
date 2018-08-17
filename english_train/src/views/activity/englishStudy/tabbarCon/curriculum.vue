<template>
  <div class="textCon">
    <div class="textConSecon">
    <p class="textConSmallTitle">线下课程学习内容<span class="line"></span></p>
    <p class="mb0">全浸入式实用英语学习，特别设计专项听说读写的授课内容，互动式教学，轻松愉快的学习氛围，短时间内掌握必备医学词汇，提升听说读写综合水平。</p>
      <p >部分内容及上课时间会有微调，以实际通知为准（上课地点另行通知）。</p>
    <ComponentTable :tableData="offlineStudyConTable"></ComponentTable>
  </div>
  </div>
</template>

<script>
import { offlineStudyConTable } from './useData'
import ComponentTable from '@/components/cusTable'

export default {
  name: 'curriculum',
  data () {
    return {
      offlineStudyConTable: offlineStudyConTable
    }
  },
  components: {
    ComponentTable
  }
}
</script>

<style scoped lang="less">
  @import "./pbuliceCss";
  .tableIntroduction{
    text-indent: 56px;
    &.mb0{
      margin-bottom: 0;
    }
  }
</style>
