import index from '@/views/activity/englishStudy'
import onCamp from '@/views/activity/englishStudy/tabbarCon/onCamp.vue'
import onCampTwo from '@/views/activity/englishStudy/tabbarCon/onCampTwo.vue'
import onCampThree from '@/views/activity/englishStudy/tabbarCon/onCampThree.vue'
import curriculum from '@/views/activity/englishStudy/tabbarCon/curriculum.vue'
import activity from '@/views/activity/englishStudy/tabbarCon/Activity.vue'
import indexPage from '@/views/activity/englishStudy/tabbarCon/indexPage.vue'
import studyPage from '@/views/activity/englishStudy/tabbarCon/studyPage.vue'
import studyPageO from '@/views/activity/englishStudy/tabbarCon/studyPageO.vue'
import everyDaily from '@/views/activity/englishStudy/tabbarCon/everyDaily.vue'
import everyRead from '@/views/activity/englishStudy/tabbarCon/everyRead.vue'
import everyHear from '@/views/activity/englishStudy/tabbarCon/everyHear.vue'
import everyTougue from '@/views/activity/englishStudy/tabbarCon/everyTougue.vue'
import everyWrit from '@/views/activity/englishStudy/tabbarCon/everyWrit.vue'
import rankList from '@/components/rankList/rankList.vue'
import cultureLu from '@/views/activity/englishStudy/tabbarCon/cultureLu.vue'
import growthCase from '@/views/activity/englishStudy/tabbarCon/growthCase.vue'
import detaila from '@/views/activity/englishStudy/tabbarCon/detaila.vue'
import detailaHJ from '@/views/activity/englishStudy/tabbarCon/detailaHJ.vue'
import detailaGRF from '@/views/activity/englishStudy/tabbarCon/detailaGRF.vue'
import detailaCz from '@/views/activity/englishStudy/tabbarCon/detailaCz.vue'
import list from '@/views/activity/englishStudy/list.vue'
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'

const [ baseUrl, baseName ] = ['/activity/englishStudy', ACTIVITY_ENGLISH_STUDY]

export default [
  {
    path: `${baseUrl}`,
    name: `${baseName}`,
    redirect: { name: `${baseName}Index` },
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/cultureLu/detaila`,
    name: `${baseName}detaila`,
    component: detaila,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/cultureLu/detailaHJ`,
    name: `${baseName}detailaHJ`,
    component: detailaHJ,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/cultureLu/detailaGRF`,
    name: `${baseName}detailaGRF`,
    component: detailaGRF,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/cultureLu/detailaCz`,
    name: `${baseName}detailaCz`,
    component: detailaCz,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/studyPage`,
    name: `${baseName}studyPage`,
    component: studyPage,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/onCampTwo`,
    name: `${baseName}onCampTwo`,
    component: onCampTwo,
    meta: {
      title: '英语特训营',
      tableIndex: 1
    }
  },
  {
    path: `${baseUrl}/onCampThree`,
    name: `${baseName}onCampThree`,
    component: onCampThree,
    meta: {
      title: '英语特训营',
      tableIndex: 1
    }
  },
  {
    path: `${baseUrl}/studyPage/everyRead`,
    name: `${baseName}everyRead`,
    component: everyRead,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/studyPage/everyHear`,
    name: `${baseName}everyHear`,
    component: everyHear,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/studyPage/everyTougue`,
    name: `${baseName}everyTougue`,
    component: everyTougue,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/studyPage/everyDaily`,
    name: `${baseName}everyDaily`,
    component: everyDaily,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/studyPage/everyWrit`,
    name: `${baseName}everyWrit`,
    component: everyWrit,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/studyPage/rankList`,
    name: `${baseName}rankList`,
    component: rankList,
    meta: {
      title: '英语特训营'
    }
  },
  {
    path: `${baseUrl}/index`,
    name: `${baseName}Index`,
    component: index,
    redirect: { name: `${baseName}IndexPage` },
    meta: {
      title: '英语特训营',
      tableIndex: 0
    },
    children: [
      {
        path: `${baseUrl}/indexPage`,
        name: `${baseName}IndexPage`,
        component: indexPage,
        meta: {
          title: '英语特训营',
          tableIndex: 0
        }
      },
      {
        path: `${baseUrl}/onCamp`,
        name: `${baseName}OnCamp`,
        component: onCamp,
        meta: {
          title: '英语特训营',
          tableIndex: 1
        }
      },
      {
        path: `${baseUrl}/studyPageO`,
        name: `${baseName}studyPageO`,
        component: studyPageO,
        meta: {
          title: '英语特训营',
          tableIndex: 2
        }
      },
      {
        path: `${baseUrl}/curriculum`,
        name: `${baseName}Curriculum`,
        component: curriculum,
        meta: {
          title: '英语特训营',
          tableIndex: 3
        }
      },
      {
        path: `${baseUrl}/activity`,
        name: `${baseName}Activity`,
        component: activity,
        meta: {
          title: '英语特训营',
          tableIndex: 4
        }
      },
      {
        path: `${baseUrl}/growthCase`,
        name: `${baseName}GrowthCase`,
        component: growthCase,
        meta: {
          title: '成长案例',
          tableIndex: 5
        }
      },
      {
        path: `${baseUrl}/cultureLu`,
        name: `${baseName}CultureLu`,
        component: cultureLu,
        meta: {
          title: '文化之旅',
          tableIndex: 6
        }
      }
    ]
  },
  {
    path: `${baseUrl}/list`,
    name: `${baseName}List`,
    component: list,
    meta: {
      title: '英语特训营'
    }
  }
]
