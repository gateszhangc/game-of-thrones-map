import { RegionData } from '../types';

export const essosData: RegionData = {
  id: 'essos',
  name: 'Essos',
  title: 'Explore Essos - The Eastern Continent',
  subtitle: 'From the Free Cities to the Dothraki Sea, discover the diverse cultures and ancient civilizations of Essos',
  overview: {
    geography: 'Essos is a massive continent, much larger than Westeros, with diverse terrain',
    climate: 'Ranging from temperate to tropical, from deserts to grasslands',
    culture: 'Extremely diverse, including the Free Cities, Dothraki, Ghiscari, and many other cultures',
    population: 'Estimated over 100 million people scattered across the vast continent'
  },
  sections: [
    {
      id: 'free-cities',
      name: 'Free Cities',
      description: 'Nine independent city-states, descendants of the Valyrian Freehold',
      climate: 'Temperate Mediterranean climate',
      culture: 'Diverse, with each city having unique culture and government',
      locations: [
        {
          id: 'braavos',
          name: 'Braavos',
          description: 'The most powerful and wealthy of the Free Cities',
          significance: 'Home of the Iron Bank and the House of Black and White',
          type: 'city'
        },
        {
          id: 'pentos',
          name: 'Pentos',
          description: 'Wealthy trading city',
          significance: 'Exile home of Daenerys and Viserys Targaryen',
          type: 'city'
        },
        {
          id: 'volantis',
          name: 'Volantis',
          description: 'The oldest and largest of the Free Cities',
          significance: 'First colony of the Valyrian Freehold',
          type: 'city'
        },
        {
          id: 'myr',
          name: 'Myr',
          description: 'Famous for its fine textiles and lenses',
          significance: 'Birthplace of Varys',
          type: 'city'
        },
        {
          id: 'tyrosh',
          name: 'Tyrosh',
          description: 'Famous for its dyes and mercenaries',
          significance: 'Part of the Disputed Lands',
          type: 'city'
        }
      ]
    },
    {
      id: 'slavers-bay',
      name: "Slaver's Bay",
      description: 'Remains of the Old Ghiscari Empire, infamous for slave trade',
      climate: 'Hot and dry',
      culture: 'Ancient Ghiscari culture, slave-based society',
      locations: [
        {
          id: 'meereen',
          name: 'Meereen',
          description: 'The largest city in Slaver\'s Bay',
          significance: 'Daenerys\' seat of rule and the Great Pyramid',
          type: 'city'
        },
        {
          id: 'yunkai',
          name: 'Yunkai',
          description: 'The Yellow City, famous for training bedslaves',
          significance: 'Second city liberated by Daenerys',
          type: 'city'
        },
        {
          id: 'astapor',
          name: 'Astapor',
          description: 'The Red City, training ground of the Unsullied',
          significance: 'Where Daenerys acquired the Unsullied army',
          type: 'city'
        }
      ]
    },
    {
      id: 'dothraki-sea',
      name: 'Dothraki Sea',
      description: 'Vast grasslands, home of the Dothraki nomadic people',
      climate: 'Temperate grassland climate',
      culture: 'Nomadic warrior culture, famous for horsemanship and combat skills',
      locations: [
        {
          id: 'vaes-dothrak',
          name: 'Vaes Dothrak',
          description: 'The only city of the Dothraki people',
          significance: 'Meeting place of khalasars, sacred city where bloodshed is forbidden',
          type: 'city'
        },
        {
          id: 'mother-of-mountains',
          name: 'Mother of Mountains',
          description: 'The sacred mountain of the Dothraki',
          significance: 'Center of Dothraki religion',
          type: 'landmark'
        },
        {
          id: 'womb-of-the-world',
          name: 'Womb of the World',
          description: 'Sacred lake near Vaes Dothrak',
          significance: 'Place of Dothraki prophecies and ceremonies',
          type: 'landmark'
        }
      ]
    },
    {
      id: 'qarth',
      name: 'Qarth',
      description: 'The center of the world, hub of East-West trade',
      climate: 'Hot and dry',
      culture: 'Mysterious and wealthy, famous for its warlocks and merchants',
      locations: [
        {
          id: 'qarth-city',
          name: 'City of Qarth',
          description: 'Wealthy city protected by triple walls',
          significance: 'Where Daenerys sought assistance',
          type: 'city'
        },
        {
          id: 'house-of-the-undying',
          name: 'House of the Undying',
          description: 'Mysterious palace of the warlocks',
          significance: 'Place of Daenerys\' visions',
          type: 'landmark'
        }
      ]
    },
    {
      id: 'asshai',
      name: 'Asshai and the Shadow Lands',
      description: 'Mysterious eastern lands, famous for black magic and shadows',
      climate: 'Unknown, said to be perpetually dark',
      culture: 'Enigmatic, few have returned from there',
      locations: [
        {
          id: 'asshai-city',
          name: 'Asshai',
          description: 'The black city of the Shadow Lands',
          significance: 'Home of Melisandre, center of black magic',
          type: 'city'
        },
        {
          id: 'stygai',
          name: 'Stygai',
          description: 'Ghost city deep in the Shadow Lands',
          significance: 'Said to be the darkest place in the world',
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
