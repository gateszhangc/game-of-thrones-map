import { RegionData } from '../types';

export const westerosData: RegionData = {
  id: 'westeros',
  name: 'Westeros',
  title: 'Explore Westeros - The Seven Kingdoms',
  subtitle: 'From the frozen lands beyond the Wall to the deserts of Dorne, explore every corner of Westeros',
  overview: {
    geography: 'Westeros is a continent stretching approximately 3000 miles from north to south, with diverse climates and terrains',
    climate: 'Cold and snowy in the north, warm and dry in the south, temperate in the central regions',
    culture: 'Each of the Seven Kingdoms has its unique culture, from the ancient traditions of the North to the exotic customs of Dorne',
    population: 'Approximately 40 million people distributed across the Seven Kingdoms'
  },
  sections: [
    {
      id: 'the-north',
      name: 'The North',
      description: 'The largest region of Westeros, known for its harsh winters and resilient people',
      climate: 'Cold, with long and harsh winters',
      culture: 'Follows ancient traditions, believers in the Old Gods',
      locations: [
        {
          id: 'winterfell',
          name: 'Winterfell',
          description: 'The ancestral home of House Stark and capital of the North',
          significance: 'Seat of power in the North, features hot springs and crypts',
          type: 'castle'
        },
        {
          id: 'the-wall',
          name: 'The Wall',
          description: 'A 700-foot high ice wall protecting the realm from northern threats',
          significance: 'Headquarters of the Night\'s Watch, the last defense against the White Walkers',
          type: 'landmark'
        },
        {
          id: 'white-harbor',
          name: 'White Harbor',
          description: 'The largest city and main port in the North',
          significance: 'Trade center of the North, seat of House Manderly',
          type: 'city'
        },
        {
          id: 'dreadfort',
          name: 'The Dreadfort',
          description: 'The ominous castle of House Bolton',
          significance: 'Notorious for its dark history and torture chambers',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-vale',
      name: 'The Vale',
      description: 'A fertile valley surrounded by mountains, known for its chivalry and honor',
      climate: 'Temperate, cold in the mountains',
      culture: 'Values honor and knighthood',
      locations: [
        {
          id: 'the-eyrie',
          name: 'The Eyrie',
          description: 'The impregnable mountaintop castle of House Arryn',
          significance: 'Highest castle in Westeros, features the Moon Door',
          type: 'castle'
        },
        {
          id: 'runestone',
          name: 'Runestone',
          description: 'The ancient castle of House Royce',
          significance: 'Seat of one of the oldest families in the Vale',
          type: 'castle'
        },
        {
          id: 'gulltown',
          name: 'Gulltown',
          description: 'The largest city and port in the Vale',
          significance: 'Important trade center',
          type: 'city'
        }
      ]
    },
    {
      id: 'the-riverlands',
      name: 'The Riverlands',
      description: 'Fertile plains where three great rivers meet, strategically important but vulnerable',
      climate: 'Temperate and moist',
      culture: 'Values family, duty, and honor',
      locations: [
        {
          id: 'riverrun',
          name: 'Riverrun',
          description: 'The riverside castle of House Tully',
          significance: 'Seat of power in the Riverlands, strategic stronghold',
          type: 'castle'
        },
        {
          id: 'harrenhal',
          name: 'Harrenhal',
          description: 'The largest castle in Westeros, a cursed ruin',
          significance: 'Destroyed by dragonfire, rumored to be cursed',
          type: 'castle'
        },
        {
          id: 'the-twins',
          name: 'The Twins',
          description: 'Twin castles controlled by House Frey',
          significance: 'Controls the only crossing of the Green Fork river',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-westerlands',
      name: 'The Westerlands',
      description: 'Mountainous region rich in gold, the domain of House Lannister',
      climate: 'Temperate, rainy in the mountains',
      culture: 'Values wealth and power',
      locations: [
        {
          id: 'casterly-rock',
          name: 'Casterly Rock',
          description: 'The massive rock fortress of House Lannister',
          significance: 'Built atop gold mines, the richest castle in Westeros',
          type: 'castle'
        },
        {
          id: 'lannisport',
          name: 'Lannisport',
          description: 'The largest city and port in the Westerlands',
          significance: 'Important trade and naval base',
          type: 'city'
        },
        {
          id: 'the-crag',
          name: 'The Crag',
          description: 'The coastal castle of House Westerling',
          significance: 'Where Robb Stark met Jeyne Westerling',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-reach',
      name: 'The Reach',
      description: 'The most fertile region in Westeros, abundant in grain and wine',
      climate: 'Warm and pleasant',
      culture: 'Values chivalry and the arts',
      locations: [
        {
          id: 'highgarden',
          name: 'Highgarden',
          description: 'The beautiful castle of House Tyrell',
          significance: 'Seat of power in the Reach, famous for its gardens',
          type: 'castle'
        },
        {
          id: 'oldtown',
          name: 'Oldtown',
          description: 'The oldest and second-largest city in Westeros',
          significance: 'Home of the Citadel, center of knowledge and learning',
          type: 'city'
        },
        {
          id: 'the-citadel',
          name: 'The Citadel',
          description: 'Headquarters of the order of maesters',
          significance: 'Repository of knowledge in Westeros',
          type: 'landmark'
        },
        {
          id: 'horn-hill',
          name: 'Horn Hill',
          description: 'The castle of House Tarly',
          significance: 'Home of Samwell Tarly',
          type: 'castle'
        }
      ]
    },
    {
      id: 'the-stormlands',
      name: 'The Stormlands',
      description: 'Stormy coastal region known for its formidable castles and fierce warriors',
      climate: 'Stormy and damp',
      culture: 'Values strength and resilience',
      locations: [
        {
          id: 'storms-end',
          name: 'Storm\'s End',
          description: 'The impregnable castle of House Baratheon',
          significance: 'Never conquered, has withstood countless storms',
          type: 'castle'
        },
        {
          id: 'shipbreaker-bay',
          name: 'Shipbreaker Bay',
          description: 'Dangerous bay known for shipwrecks',
          significance: 'Where the Targaryen fleet was wrecked during Aegon\'s Conquest',
          type: 'landmark'
        },
        {
          id: 'griffins-roost',
          name: 'Griffin\'s Roost',
          description: 'The castle of House Connington',
          significance: 'Seat of Jon Connington\'s family',
          type: 'castle'
        }
      ]
    },
    {
      id: 'dorne',
      name: 'Dorne',
      description: 'The southernmost kingdom of Westeros, known for its deserts, spices, and independent spirit',
      climate: 'Hot and dry',
      culture: 'Unique Dornish culture, gender equality, passionate and free-spirited',
      locations: [
        {
          id: 'sunspear',
          name: 'Sunspear',
          description: 'The desert castle of House Martell',
          significance: 'Capital of Dorne, famous for its Spear Tower',
          type: 'castle'
        },
        {
          id: 'the-water-gardens',
          name: 'The Water Gardens',
          description: 'The summer palace of House Martell',
          significance: 'Beautiful palace where all Dornish children can play',
          type: 'landmark'
        },
        {
          id: 'starfall',
          name: 'Starfall',
          description: 'The castle of House Dayne',
          significance: 'Location of the legendary sword "Dawn"',
          type: 'castle'
        },
        {
          id: 'yronwood',
          name: 'Yronwood',
          description: 'The castle of House Yronwood',
          significance: 'Second most powerful house in Dorne',
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
