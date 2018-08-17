<template>
  <div class="table">
    <table border="0" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th v-for="(item, index) in tableData.title" :key="index" :class="[`headTh${index}`]">
            <div>
              <p v-if="item.chinese.length" v-for="(itemc, indexc) in item.chinese" :key="indexc">{{ itemc }}</p>
              <p v-if="item.english.length" v-for="(itemc, indexc) in item.english" :key="indexc + item.chinese.length">{{ itemc }}</p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData.content" :key="index">
          <th v-for="(itemc, indexc) in item" :key="indexc">
            <div>
              <p class="lineheight150" v-for="(itemcc, indexcc) in itemc.chinese" :key="indexcc">{{ itemcc }}</p>
              <p class="lineheight150" v-for="(itemcc, indexcc) in itemc.english" :key="indexcc + itemc.chinese.length">{{ itemcc }}</p>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'componentTable',
  props: {
    tableData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../views/activity/englishStudy/base";
  table{
    width: 100%;
    thead{
      width: 100%;
      color: @colorf;
      font-size: 30px;
      background-color: @tableHeadBackColor;
      tr{
        border-color: @tableHeadBordColor;
        text-align: center;
      }
    }
    tbody{
      width: 100%;
      font-size: 28px;
      font-weight: normal;
      tr{
        th > div > p{
          margin-bottom: 20px;
          &:last-child{
            margin-bottom: 0;
          }
        }
        th:nth-child(2n) {
          text-align: left;
        }
      }
    }
    tr{
      border: 2px solid @tableConBorderColor;/*px*/
      border-bottom: none;
      &:last-child{
        border-bottom: 2px solid @tableConBorderColor;/*px*/
      }
      th:nth-child(2n) {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
    th{
      height: 70px;
      text-align: center;
      border-right: 2px solid @tableConBorderColor;/*px*/
      padding: 25px 0 15px;
      font-weight: normal;
      &:last-child{
        border-right: none;
      }
    }
    .headTh0{
      width: 120px;
    }
    .headTh2{
      width: 100px;
    }
  }
</style>
