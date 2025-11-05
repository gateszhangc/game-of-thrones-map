// 地点类型定义
export type LocationType = 'city' | 'castle' | 'landmark' | 'region';

// 地点接口
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

// 区域分区接口
export interface RegionSection {
  id: string;
  name: string;
  description: string;
  climate?: string;
  culture?: string;
  locations: Location[];
}

// 配色方案接口
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
}

// 概览信息接口
export interface Overview {
  geography: string;
  climate: string;
  culture: string;
  population: string;
}

// 区域数据接口
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
