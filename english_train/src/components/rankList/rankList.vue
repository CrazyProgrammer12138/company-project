<template>
  <div class="rankList">
    <img class="rankImg" src="@/views/activity/englishStudy/images/rankImg.jpg" alt="">
    <div class="rank" v-for="(item, index) in rankLists" :key="index">
      <div class="rankHeader">
        <p>{{item.title}}</p>
        <div>{{item.englishTitle}}</div>
        <table>
          <thead class="rankThead">
            <tr>
              <th>排名</th><th>姓名</th>
            </tr>
          </thead>
          <tbody class="rankTbody">
            <tr v-for="(items, index) in item.list" :key="index">
              <td>NO.{{index + 1}}</td><td>{{items.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { returnBtn } from '../../views/activity/englishStudy/tabbarCon/returnBtn'
export default {
  name: 'rankList',
  beforeRouteEnter (to, from, next) {
    // 设置导航栏
    returnBtn(to, from, next)
  },
  data () {
    return {
      jsbData: {
        title: {
          titName: this.$route.meta.title,
          titleImgUrl: 'https://static.hulian120.com/web/eglishtrain/english_train_w.png',
          titleImgColor: '161616',
          titleImgAlpha: '1',
          titleCntColor: ''
        },
        return: {
          ui_elm: 'return_btn',
          visible: 'true',
          position: '1',
          goback_add: 'direct'
        },
        btn: [
          {
            ui_elm: 'return_btn',
            visible: 'true',
            position: '1'
          },
          {
            ui_elm: 'close_btn',
            visible: 'false',
            position: '2'
          }
        ]
      },
      rankLists: [
        {
          title: '词汇记多星',
          englishTitle: 'DAILY VOCABULARY AWARD',
          list: [{name: 'Fang.李'}, {name: 'Aimee.任'}, {name: 'June.何'},
            {name: 'Shuxian.李'}, {name: 'Ada.袁'}, {name: 'Sapphire.康'}]
        },
        {
          title: '超级顺风耳',
          englishTitle: 'LISTENING EXERCISE AWARD',
          list: [{name: 'Wendy.郑'}, {name: 'Yonghong.李'}, {name: 'Kary.孔'}, {name: 'Dada.陈'}]
        },
        {
          title: '最佳阅读者',
          englishTitle: 'WEEKLY READING AWARD',
          list: [{name: 'Xianzhen.张'}, {name: 'Yinghu.闫'}, {name: 'Brenda.杨'}]
        },
        {
          title: '地表最强口语',
          englishTitle: 'ORAL PRACTICE AWARD',
          list: [{name: 'Dongmei.谢'}, {name: 'Smile.陆'}, {name: 'Amanda.胡'}, {name: 'Belle.巫'}]
        },
        {
          title: '护贝尔文学奖',
          englishTitle: 'WRITING PRACTICE AWARD',
          list: [{name: 'Whitney.王'}, {name: 'Xiaohui.于'}]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style scoped lang="less">
  @colorf: #fff;
  @heightTb: 80px;
  .rankList{
    width: 100%;
    height: auto;
    background: url("../../views/activity/englishStudy/images/bg_1.png");
    background-size: 100% 920px;
    background-color: #071637;
    padding-bottom: 150px;
    .rankImg{
      width: 100%;
      margin-bottom: 20px;
    }
    .rank{
      padding: 0 30px;
      margin-bottom: 80px;
      .rankHeader{
        width: 100%;
        color: @colorf;
        text-align: center;
        font-size: 30px;
        p{
          font-size: 44px;
          font-family: "\5B8B\4F53";
          font-weight: bold;
        }
        div{
          color: #b38a4a;
          font-size: 20px;
          margin-bottom: 30px;
        }
        table{
          width: 100%;
          border: 2px solid @colorf;
          font-weight: normal;
          font-family: "\5B8B\4F53";
          .rankThead tr th{
            font-size: 30px;
            height: @heightTb;
            line-height: @heightTb;
            background-color: #0e1e48;
          }
          .rankThead tr th:nth-child(1){
            width: 35%;
            border-right: 2px solid @colorf;
          }
          .rankTbody{
            color: #333333;
            background-color: #05143d;
            tr td{
              color: #ffffff;
              height: @heightTb;
              line-height: @heightTb;
              border: 2px solid #dddddd;
            }
          }
        }
      }
    }
  }
</style>
