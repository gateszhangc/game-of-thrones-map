// Location type definition
export type LocationType = 'city' | 'castle' | 'landmark' | 'region';

// Location interface
export interface Location {
  id: string;
  name: string;
  description: string;
  significance: string;
  type: LocationType;
  imageUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  externalLink?: string;
}

// Region section interface
export interface RegionSection {
  id: string;
  name: string;
  description: string;
  climate?: string;
  culture?: string;
  locations: Location[];
}

// Color scheme interface
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

// Overview information interface
export interface Overview {
  geography: string;
  climate: string;
  culture: string;
  population: string;
}

// Region data interface
export interface RegionData {
  id: 'westeros' | 'essos';
  name: string;
  title: string;
  subtitle: string;
  overview: Overview;
  sections: RegionSection[];
  mapEmbedUrl?: string;
  colorScheme: ColorScheme;
}
