import { RegionData } from '../types';

export const essosData: RegionData = {
  id: 'essos',
  name: '厄索斯',
  title: '探索厄索斯 - 东方大陆',
  subtitle: '从自由城邦到多斯拉克海，探索厄索斯的多样文化和古老文明',
  overview: {
    geography: '厄索斯是一个巨大的大陆，比维斯特洛大得多，地形多样',
    climate: '从温带到热带，沙漠到草原',
    culture: '极其多样，包括自由城邦、多斯拉克人、吉斯人等多种文化',
    population: '估计超过1亿人口，分布在广阔的大陆'
  },
  sections: [
    {
      id: 'free-cities',
      name: '自由城邦',
      description: '九个独立的城邦，瓦雷利亚自由堡垒的后裔',
      climate: '温和的地中海气候',
      culture: '多样化，每个城邦都有独特的文化和政府',
      locations: [
        {
          id: 'braavos',
          name: '布拉佛斯',
          description: '最强大和最富有的自由城邦',
          significance: '铁金库所在地，无面者之殿',
          type: 'city'
        },
        {
          id: 'pentos',
          name: '潘托斯',
          description: '富裕的贸易城市',
          significance: '丹妮莉丝和韦赛里斯的流亡之地',
          type: 'city'
        },
        {
          id: 'volantis',
          name: '瓦兰提斯',
          description: '最古老和最大的自由城邦',
          significance: '瓦雷利亚的第一个殖民地',
          type: 'city'
        },
        {
          id: 'myr',
          name: '密尔',
          description: '以其精美的织物和透镜而闻名',
          significance: '瓦里斯的出生地',
          type: 'city'
        },
        {
          id: 'tyrosh',
          name: '泰洛西',
          description: '以其染料和雇佣兵而闻名',
          significance: '争议之地的一部分',
          type: 'city'
        }
      ]
    },
    {
      id: 'slavers-bay',
      name: '奴隶湾',
      description: '古吉斯帝国的遗迹，以奴隶贸易而臭名昭著',
      climate: '炎热干燥',
      culture: '古老的吉斯文化，奴隶制社会',
      locations: [
        {
          id: 'meereen',
          name: '弥林',
          description: '奴隶湾最大的城市',
          significance: '丹妮莉丝的统治中心，大金字塔',
          type: 'city'
        },
        {
          id: 'yunkai',
          name: '渊凯',
          description: '黄色城市，以训练床奴而闻名',
          significance: '丹妮莉丝解放的第二个城市',
          type: 'city'
        },
        {
          id: 'astapor',
          name: '阿斯塔波',
          description: '红色城市，无垢者的训练地',
          significance: '丹妮莉丝获得无垢者军队之地',
          type: 'city'
        }
      ]
    },
    {
      id: 'dothraki-sea',
      name: '多斯拉克海',
      description: '广阔的草原，多斯拉克游牧民族的家园',
      climate: '温带草原气候',
      culture: '游牧战士文化，以马术和战斗技能而闻名',
      locations: [
        {
          id: 'vaes-dothrak',
          name: '维斯·多斯拉克',
          description: '多斯拉克人的唯一城市',
          significance: '卡拉萨聚集地，禁止流血的圣城',
          type: 'city'
        },
        {
          id: 'mother-of-mountains',
          name: '圣母山',
          description: '多斯拉克人的圣山',
          significance: '多斯拉克宗教的中心',
          type: 'landmark'
        },
        {
          id: 'womb-of-the-world',
          name: '世界子宫',
          description: '维斯·多斯拉克附近的圣湖',
          significance: '多斯拉克预言和仪式的地方',
          type: 'landmark'
        }
      ]
    },
    {
      id: 'qarth',
      name: '魁尔斯',
      description: '世界的中心，东西方贸易的枢纽',
      climate: '炎热干燥',
      culture: '神秘而富有，以其术士和商人而闻名',
      locations: [
        {
          id: 'qarth-city',
          name: '魁尔斯城',
          description: '被三重城墙保护的富裕城市',
          significance: '丹妮莉丝寻求帮助之地',
          type: 'city'
        },
        {
          id: 'house-of-the-undying',
          name: '不死者之殿',
          description: '术士们的神秘宫殿',
          significance: '丹妮莉丝的幻象之地',
          type: 'landmark'
        }
      ]
    },
    {
      id: 'asshai',
      name: '亚夏与阴影之地',
      description: '神秘的东方之地，以黑魔法和阴影而闻名',
      climate: '未知，据说永远黑暗',
      culture: '神秘莫测，很少有人从那里返回',
      locations: [
        {
          id: 'asshai-city',
          name: '亚夏城',
          description: '阴影之地的黑色城市',
          significance: '梅丽珊卓的家乡，黑魔法的中心',
          type: 'city'
        },
        {
          id: 'stygai',
          name: '冥河城',
          description: '阴影之地深处的鬼城',
          significance: '据说是世界上最黑暗的地方',
          type: 'city'
        }
      ]
    }
  ],
  colorScheme: {
    primary: '#d35400',
    secondary: '#e67e22',
    accent: '#f39c12'
  }
};
