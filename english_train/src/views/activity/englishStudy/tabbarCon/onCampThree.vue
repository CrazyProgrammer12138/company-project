<template>
    <div class="wrap">
      <div class="textCon">
        <div class="textConSecon">
          <p class="textConSmallTitle">线上课程学习内容<span class="line"></span></p>
          <p class="tableIntroduction lineheight150">医学英语全套线上课程160学时，听说读写词汇全模块学习，每天只需30分钟，180天让你脱颖而出。</p>
          <ComponentTable :tableData="onlineStudyConTable"></ComponentTable>
        </div>
      </div>
    </div>
</template>

<script>
import { onlineStudyConTable, offlineStudyConTable } from './useData'
import ComponentTable from '@/components/cusTable'

export default {
  name: 'onCampThree',
  data () {
    return {
      // 3-1 下面的  经过180天特训
      // 3-2 三个圆的
      // 线上课程学习
      onlineStudyConTable: onlineStudyConTable,
      // 线下课表
      offlineStudyConTable: offlineStudyConTable
    }
  },
  components: {
    ComponentTable
  }
}
</script>

<style scoped lang="less">
  @import "../base";
  @import "./pbuliceCss";
  .textCon{
    >p{
      margin-bottom: 36px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    &Title{
      font-size: 34px;
      font-weight: bold;
      margin-bottom: 60px !important;
      font-family: "宋体";
    }
    .textConSecon2-3{
      .item{
        width: 100%;
        .fl, .fr{
          width: 50%;
          height: 334px;
        }
        .img1{
          background: url("../images/img1.jpg") center center no-repeat;
          background-size: 100% 100%;
        }
        .img2{
          background: url("../images/img2.jpg") center center no-repeat;
          background-size: 100% 100%;
        }
        .img3{
          background: url("../images/img3.jpg") center center no-repeat;
          background-size: 100% 100%;
        }
      }
      &Text{
        background: @textColor_12;
        padding: 62px 28px 0;
        &F{
          color: @colorf;
          font-size: 34px;
          position: relative;
          .line{
            position: absolute;
            top: -20px;
            left: 0;
            width: 36px;
            height: 7px;
            background: @smallTitleColor;
          }
        }
        &T{
          color: @smallTitleColor;
          font-size: 20px;
          margin-bottom: 50px;
        }
        &S{
          color: @colorf;
          font-size: 28px;
          position: relative;
          .line{
            position: absolute;
            top: -30px;
            left: 0;
            width: 25px;
            height: 3px;
            background: @colorf;
          }
        }
      }
    }
    .textConSecon2-4{
      .item{
        margin-bottom: 40px;
        &:last-child{
          margin-bottom: 0;
        }
      }
      .textConSecon4Text{
        font-size: 28px;
        color: @color3;
        margin-top: 20px;
      }
      .img1{
        width: 100%;
        height: 300px;
        background: url("../images/img4.jpg") center center no-repeat;
        background-size: 100% 100%;
      }
      .img2{
        width: 100%;
        height: 300px;
        background: url("../images/img5.jpg") center center no-repeat;
        background-size: 100% 100%;
      }
    }
    &.textCon3{
      padding-left: 20px;
      padding-right: 20px;
      >*{
        padding-left: 20px;
        padding-right: 20px;
      }
      .textConSecon{
        padding-left: 0;
        padding-right: 0;
      }
    }
    .textConSecon3-1{
      display: flex;
      justify-content: space-between;
      .item{
        width: 220px;
        height: 320px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        padding-top: 110px;
        padding-left: 20px;
        padding-right: 20px;
        position: relative;
        margin-bottom: 44px;
        .text1{
          margin-bottom: 30px;
          font-size: 30px;
          color: @textColor_12;
          font-weight: bold;
          text-align: center;
        }
        .text2{
          font-size: 24px;
          color: @color3;
        }
        .img1, .img2, .img3{
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
        }
        .img1{
          width: 76px;
          height: 60px;
          margin: 0 auto;
          background: url("../images/icon_1.png") center center no-repeat;
          background-size: 100% 100%;
        }
        .img2{
          width: 62px;
          height: 67px;
          margin: 0 auto;
          background: url("../images/icon_2.png") center center no-repeat;
          background-size: 100% 100%;
        }
        .img3{
          width: 76px;
          height: 60px;
          margin: 0 auto;
          background: url("../images/icon_3.png") center center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .textConSecon3-1Bottom{
      padding-left: 20px !important;
      padding-right: 20px !important;
      .title{
        font-size: 30px;
        color: @textColor_1b;
        font-weight: bold;
        margin-bottom: 24px;
      }
      .con{
        font-size: 28px;
        color: @color3;
        p{
          margin-bottom: 15px;
          &:last-child{
            margin-bottom: 0;
          }
        }
      }
    }
    &.bottomContent{
      background: url("../images/bottom.png") top center no-repeat;
      background-size: 100% 725px;
      padding: 0;
      margin-bottom: 0;
      color: @colorf;
      padding-bottom: 30px;
      .textConSmallTitle{
        margin-bottom: 74px;
      }
      .bottomRound{
        display: flex;
        justify-content: space-around;
        padding: 0 @normalPaddingLR;
        margin-bottom: 52px;
        position: relative;
        .line{
          position: absolute;
          width: 670px;
          height: 2px;
          background: #eee;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          opacity: .7;
        }
        .item{
          width: 196px;
          display: flex;
          flex-direction: column;
          .round{
            width: 162px;
            height: 162px;
            margin: 0 auto;
            border-radius: 50%;
            background: #586DA7;
            box-shadow: 0 0 20px rgba(255, 255, 255, .5);
            color: @colorf;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 26px;
            &.round2{
              background: #6476A7;
              text-align: center;
            }
            &.round3{
              background: #7786AE;
            }
          }
        }
      }
      .timeAddress{
        padding: 0 40px;
        margin-bottom: 32px;
      }
      .line2{
        div{
          width: 50px;
          height: 4px;
          background: @colorf;
        }
        padding-left: 40px;
        margin-bottom: 12px;
      }
      .line3{
        font-size: 16px;
        text-indent: 40px;
      }
    }
  }
</style>
