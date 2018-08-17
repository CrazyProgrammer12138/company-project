<template>
    <div class="wrap">
      <div class="textCon">
        <p class="textConTitle">一.医学英语特训营</p>
        <p class="lineheight150">作为临床护士，医学英语在工作和生活中的重要性不言而喻。无论是临床护理工作需要、书写护理论文、翻译护理文献，还是外资医院、外资企业工作，或是出国进修、就业，掌握医学英语的好处，所能应用的情景绝不止这些。</p>
        <p class="lineheight150">普通英语学习途径数不胜数，实用的医学英语却并不好找。护联网医学英语特训营，180天通过线上基础学习、线下集中训练、国际文化交流、大使馆及外资医院访学，帮助护士实现流利对话、查阅英文文献、撰写英语病例报告，让英语变得像母语一样简单。</p>
      </div>
      <div class="textCon">
        <p class="textConTitle">二.学习内容</p>
        <div class="textConSecon">
          <p class="textConSmallTitle">1.线上课程学习内容<span class="line"></span></p>
          <p class="tableIntroduction lineheight150">医学英语全套线上课程160学时，听说读写词汇全模块学习，每天只需30分钟，180天让你脱颖而出。</p>
          <ComponentTable :tableData="onlineStudyConTable"></ComponentTable>
        </div>
        <div class="textConSecon">
          <p class="textConSmallTitle">2.线下课程学习内容<span class="line"></span></p>
          <p class="tableIntroduction lineheight150">线下小班阅读写作和口语听力授课，集中训练系统学习，帮助你矫正发音、提升口语能力，能说会写享受学习成就感。</p>
          <ComponentTable :tableData="offlineStudyConTable"></ComponentTable>
        </div>
        <div class="textConSecon">
          <p class="textConSmallTitle">3.线下经典国际文化课<span class="line"></span></p>
          <div class="textConSecon2-3">
            <div v-for="(item, index) in textConSecon23Data" :key="index" class="clearfix item">
              <div :class="[{ fl: !(index % 2) }, { fr: index % 2 }, item.imgClass]"></div>
              <div :class="[{ fl: index % 2 }, { fr: !(index % 2) }, 'textConSecon2-3Text']">
                <div class="textConSecon2-3TextF">{{ item.text1 }}<span class="line"></span></div>
                <div class="textConSecon2-3TextT">{{ item.text2 }}</div>
                <div class="textConSecon2-3TextS">{{ item.text3 }}<span class="line"></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="textConSecon">
          <p class="textConSmallTitle">4.大使馆及外资医院实地参观访学<span class="line"></span></p>
          <div class="textConSecon2-4">
            <div v-for="(item, index) in textConSecon24Data" :key="index" class="clearfix item">
              <div :class="[item.imgClass]"></div>
              <p class="textConSecon4Text lineheight150">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="textCon textCon3">
        <p class="textConTitle">三、学员收获 </p>
        <div class="textConSecon">
          <p class="textConSmallTitle">1.学员学习收获<span class="line"></span></p>
          <ul class="textConSecon3-1">
            <li v-for="(item, index) in textConSecon31Data" :key="index" class="item">
              <div :class="[item.imgClass]"></div>
              <div class="text1">{{ item.text1 }}</div>
              <div class="text2">{{ item.text2 }}</div>
            </li>
          </ul>
          <div class="textConSecon3-1Bottom">
            <div class="title">经过180天的特训未来的你：</div>
            <div class="con">
              <p v-for="(item, index) in textConSecon31Bottom" :key="index">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="textCon bottomContent">
        <p class="textConSmallTitle">2.学员特权终身受益<span class="line"></span></p>
        <div class="bottomRound">
          <div class="line"></div>
          <div class="item" v-for="(item, index) in bottomRound" :key="index">
            <div :class="['round', `round${index + 1}`]">{{ item.text1 }}</div>
            <p>{{ item.text2 }}</p>
          </div>
        </div>
        <div class="timeAddress">
          <div class="lineheight150">第二期医学英语特训营将于2018年8月1日正式开班</div>
          <div class="lineheight150">如果你想加入下期英语特训营，欢迎与我们联系。</div>
          <div class="lineheight150">咨询电话：400-8650-512</div>
        </div>
        <div class="line2"><div></div></div>
        <div class="line3">ENGLISH TRAINING CAMP</div>
      </div>
    </div>
</template>

<script>
import { onlineStudyConTable, offlineStudyConTable } from './useData'
import ComponentTable from '@/components/cusTable'

export default {
  name: 'onCamp',
  data () {
    return {
      // 2-3 线下经典国际文化课
      textConSecon23Data: [
        {
          text1: '酒会',
          text2: 'Classic culture red wine',
          text3: '学习葡萄酒文化，提升理性的思考和唯美的鉴赏能力。',
          imgClass: 'img1'
        },
        {
          text1: '马术',
          text2: 'Classical culture equestrian',
          text3: '体验欧洲古老文化，涉身其中感受欧式神韵。',
          imgClass: 'img2'
        },
        {
          text1: '高尔夫',
          text2: 'Classical culture golf',
          text3: '享受大自然的乐趣、结交跨界精英友人。',
          imgClass: 'img3'
        }
      ],
      // 2-4 大使馆及外资医院实地参观访学
      textConSecon24Data: [
        {
          imgClass: 'img1',
          text: '参观国外驻华大使馆——近距离了解各国文化，让思想的碰撞没有国界'
        },
        {
          imgClass: 'img2',
          text: '参观国内顶尖外资医院——学习外资医院文化，与资深外资医院高级人力资源总监面对面交流 '
        }
      ],
      // 3-1 学员学习收获
      textConSecon31Data: [
        {
          imgClass: 'img3',
          text1: '职业提升',
          text2: '争取更高职位和薪酬的工作，英语会给你带来更多的选择机会。'
        },
        {
          imgClass: 'img2',
          text1: '成就意志',
          text2: '180天锻炼个人坚韧不拔的意志'
        },
        {
          imgClass: 'img1',
          text1: '收获朋友',
          text2: '收获一班同为护士，且终生为伴的英语战友'
        }
      ],
      // 3-1 下面的  经过180天特训
      textConSecon31Bottom: [
        'A.可以看懂临床环境下较高难度的英语文献',
        'B.能与外国友人就临床护理进行有效的交流',
        'C.能用英语撰写病例报告、提示性短文转诊信',
        'D.能在国外进修环境中表达自己的观点！',
        'E.在外资医院面试中脱颖而出！'
      ],
      // 3-2 三个圆的
      bottomRound: [
        {
          text1: '学以致用',
          text2: '勤工俭学—护士加“计时”频道为特训营学员优先提供赚取更多money的机会！'
        },
        {
          text1: '分期付款',
          text2: '减轻经济负担，特训营学员享受学费免息分期付款特权'
        },
        {
          text1: '终身特权',
          text2: '加入特训营，护联网英语俱乐部向学员永久免费开放'
        }
      ],
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
