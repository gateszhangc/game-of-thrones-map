import { RegionData } from '../types';

export const westerosData: RegionData = {
  id: 'westeros',
  name: '维斯特洛',
  title: '探索维斯特洛 - 七大王国',
  subtitle: '从长城以北的冰封之地到多恩的沙漠，探索维斯特洛的每一个角落',
  overview: {
    geography: '维斯特洛是一个大陆，从北到南延伸约3000英里，气候和地形多样',
    climate: '北部寒冷多雪，南部温暖干燥，中部温和',
    culture: '七大王国各有独特文化，从北境的古老传统到多恩的异域风情',
    population: '约4000万人口，分布在七大王国'
  },
  sections: [
    {
      id: 'the-north',
      name: '北境',
      description: '维斯特洛最大的区域，以其严酷的冬季和坚韧的人民而闻名',
      climate: '寒冷，冬季漫长而严酷',
      culture: '遵循古老传统，信仰旧神',
      locations: [
        {
          id: 'winterfell',
          name: '临冬城',
          description: '史塔克家族的祖传居所，北境的首府',
          significance: '北境权力中心，拥有温泉和地下墓穴',
          type: 'castle'
        },
        {
          id: 'the-wall',
          name: '长城',
          description: '高达700英尺的冰墙，守护王国免受北方威胁',
          significance: '守夜人的驻地，抵御异鬼的最后防线',
          type: 'landmark'
        },
        {
          id: 'white-harbor',
          name: '白港',
          description: '北境最大的城市和主要港口',
          significance: '北境的贸易中心，曼德勒家族的驻地',
          type: 'city'
        },
        {
          id: 'dreadfort',
          name: '恐怖堡',
          description: '波顿家族的阴森城堡',
          significance: '以其黑暗历史和酷刑室而臭名昭著',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-vale',
      name: '谷地',
      description: '群山环绕的肥沃谷地，以其骑士精神和荣誉而闻名',
      climate: '温和，山区寒冷',
      culture: '重视荣誉和骑士精神',
      locations: [
        {
          id: 'the-eyrie',
          name: '鹰巢城',
          description: '艾林家族的不可攻破的山顶城堡',
          significance: '维斯特洛最高的城堡，拥有月门',
          type: 'castle'
        },
        {
          id: 'runestone',
          name: '符文石城',
          description: '罗伊斯家族的古老城堡',
          significance: '谷地最古老的家族之一的驻地',
          type: 'castle'
        },
        {
          id: 'gulltown',
          name: '海鸥镇',
          description: '谷地最大的城市和港口',
          significance: '重要的贸易中心',
          type: 'city'
        }
      ]
    },
    {
      id: 'the-riverlands',
      name: '河间地',
      description: '三条大河交汇的肥沃平原，战略位置重要但易受攻击',
      climate: '温和湿润',
      culture: '重视家族、责任和荣誉',
      locations: [
        {
          id: 'riverrun',
          name: '奔流城',
          description: '徒利家族的河畔城堡',
          significance: '河间地的权力中心，战略要地',
          type: 'castle'
        },
        {
          id: 'harrenhal',
          name: '赫伦堡',
          description: '维斯特洛最大的城堡，被诅咒的废墟',
          significance: '被龙火摧毁，传说被诅咒',
          type: 'castle'
        },
        {
          id: 'the-twins',
          name: '孪河城',
          description: '弗雷家族控制的双子城堡',
          significance: '控制着穿越绿叉河的唯一桥梁',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-westerlands',
      name: '西境',
      description: '富含黄金的山区，兰尼斯特家族的领地',
      climate: '温和，山区多雨',
      culture: '重视财富和权力',
      locations: [
        {
          id: 'casterly-rock',
          name: '凯岩城',
          description: '兰尼斯特家族的巨大岩石城堡',
          significance: '建在金矿之上，维斯特洛最富有的城堡',
          type: 'castle'
        },
        {
          id: 'lannisport',
          name: '兰尼斯港',
          description: '西境最大的城市和港口',
          significance: '重要的贸易和海军基地',
          type: 'city'
        },
        {
          id: 'the-crag',
          name: '峭岩城',
          description: '维斯特林家族的海岸城堡',
          significance: '罗柏·史塔克与珍妮·维斯特林相遇之地',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-reach',
      name: '河湾地',
      description: '维斯特洛最肥沃的地区，盛产粮食和葡萄酒',
      climate: '温暖宜人',
      culture: '重视骑士精神和艺术',
      locations: [
        {
          id: 'highgarden',
          name: '高庭',
          description: '提利尔家族的美丽城堡',
          significance: '河湾地的权力中心，以其花园闻名',
          type: 'castle'
        },
        {
          id: 'oldtown',
          name: '旧镇',
          description: '维斯特洛最古老和第二大的城市',
          significance: '学城所在地，知识和学习的中心',
          type: 'city'
        },
        {
          id: 'the-citadel',
          name: '学城',
          description: '学士们的总部',
          significance: '维斯特洛的知识宝库',
          type: 'landmark'
        },
        {
          id: 'horn-hill',
          name: '角陵',
          description: '塔利家族的城堡',
          significance: '山姆威尔·塔利的家',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-stormlands',
      name: '风暴地',
      description: '多风暴的海岸地区，以其坚固的城堡和勇猛的战士而闻名',
      climate: '多风暴，潮湿',
      culture: '重视力量和韧性',
      locations: [
        {
          id: 'storms-end',
          name: '风息堡',
          description: '拜拉席恩家族的不可攻破的城堡',
          significance: '从未被攻陷，抵御了无数风暴',
          type: 'castle'
        },
        {
          id: 'shipbreaker-bay',
          name: '船破湾',
          description: '危险的海湾，以沉船而闻名',
          significance: '伊耿征服时坦格利安舰队在此遇难',
          type: 'landmark'
        },
        {
          id: 'griffins-roost',
          name: '鹰头堡',
          description: '康宁顿家族的城堡',
          significance: '琼恩·康宁顿的家族驻地',
          type: 'castle'
        }
      ]
    },
    {
      id: 'dorne',
      name: '多恩',
      description: '维斯特洛最南端的王国，以其沙漠、香料和独立精神而闻名',
      climate: '炎热干燥',
      culture: '独特的多恩文化，性别平等，热情奔放',
      locations: [
        {
          id: 'sunspear',
          name: '阳戟城',
          description: '马泰尔家族的沙漠城堡',
          significance: '多恩的首府，以其长矛塔闻名',
          type: 'castle'
        },
        {
          id: 'the-water-gardens',
          name: '流水花园',
          description: '马泰尔家族的夏宫',
          significance: '美丽的宫殿，所有多恩儿童都可以玩耍',
          type: 'landmark'
        },
        {
          id: 'starfall',
          name: '星坠城',
          description: '戴恩家族的城堡',
          significance: '传奇之剑"黎明"的所在地',
          type: 'castle'
        },
        {
          id: 'yronwood',
          name: '伊伦伍德',
          description: '伊伦伍德家族的城堡',
          significance: '多恩第二强大的家族',
          type: 'castle'
        }
      ]
    }
  ],
  colorScheme: {
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#3498db'
  }
};
