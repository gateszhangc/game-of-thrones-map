# 《权力的游戏》地图整合方案 - 基于实际研究的设计

## 🔍 实际网站分析结果 (Chrome DevTools)

### maps.wikiofthrones.com 真实架构

**技术栈**:
- **地图库**: Leaflet.js v1.9.4
- **前端**: 原生 JavaScript (无框架)
- **字体**: Lato (正文), MedievalSharp (标题)
- **样式**: 内联 CSS + bundle.js
- **背景**: #333 (深灰)

**实际组件结构**:
```
body
└── #app
    ├── .search-container (69x64px, absolute)
    │   ├── .search-bar
    │   ├── .search-input (placeholder: "Search...")
    │   └── .search-results
    │
    ├── .map-container (全屏, Leaflet)
    │   ├── .leaflet-pane (多层)
    │   │   ├── .leaflet-tile-pane (z-index: 200)
    │   │   ├── .leaflet-marker-pane (z-index: 600)
    │   │   └── .leaflet-popup-pane (z-index: 700)
    │   └── .leaflet-control-container
    │       ├── .leaflet-control-zoom
    │       └── .leaflet-control-attribution
    │
    └── .info-container (500x438px, absolute)
        ├── .info-title (80px height, fixed)
        ├── .info-body (350px height)
        │   ├── .info-content-container
        │   └── .info-content
        └── .info-footer (78px height)
```

**API 端点** (实际请求):
```
GET /api/kingdoms
GET /api/locations/castle
GET /api/locations/city
GET /api/locations/town
GET /api/locations/ruin
GET /api/locations/region
GET /api/locations/landmark
```

**关键发现**:
1. ❌ **没有侧边栏** - 只有浮动的搜索框
2. ✅ **极简设计** - 地图占据全屏
3. ✅ **信息面板** - 点击标记时从侧边滑出
4. ✅ **搜索优先** - 搜索框是主要交互入口
5. ✅ **RESTful API** - 按类型分类获取地点数据

---

## 📐 整合方案设计

### 方案 A: 极简风格 (推荐 - 模仿 wikiofthrones)

```
┌─────────────────────────────────────────────────────────────────┐
│  [🏰 GoT Map]                                    [🔍 搜索]  [☰]  │ ← 顶部栏 (60px, 半透明)
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│                                                                   │
│                      Leaflet 交互式地图                           │
│                      (全屏显示)                                   │
│                                                                   │
│                      📍 📍 📍                                     │
│                                                                   │
│                                                                   │
│                                                                   │
│                                                                   │
│                                                                   │
│  [+] [-] [🧭]                                                     │ ← 地图控制 (右下角)
└─────────────────────────────────────────────────────────────────┘

点击标记后:
┌─────────────────────────────────────────────────────────────────┐
│  [🏰 GoT Map]                                    [🔍 搜索]  [☰]  │
├─────────────────────────────────────────────────────────────────┤
│                                                   ┌─────────────┐│
│                                                   │ 临冬城   [×]││
│                                                   ├─────────────┤│
│                      地图区域                      │ [图片]      ││
│                                                   │             ││
│                      📍                           │ 🏰 城堡     ││
│                                                   │ 👑 史塔克   ││
│                                                   │ 📍 北境     ││
│                                                   │             ││
│                                                   │ 临冬城是... ││
│                                                   │             ││
│  [+] [-] [🧭]                                     │ [查看详情→] ││
└───────────────────────────────────────────────────┴─────────────┘
                                                    ↑ 信息面板 (500px宽)
```

### 方案 B: 增强版 (添加筛选功能)

```
┌─────────────────────────────────────────────────────────────────┐
│  [🏰 GoT Map]  [首页] [地图]              [🔍 搜索]  [筛选🎛️]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                                                                   │
│                      Leaflet 交互式地图                           │
│                                                                   │
│                      📍 📍 📍                                     │
│                                                                   │
│                                                                   │
│  [+] [-] [🧭]                                                     │
└─────────────────────────────────────────────────────────────────┘

点击筛选按钮后:
┌─────────────────────────────────────────────────────────────────┐
│  [🏰 GoT Map]  [首页] [地图]              [🔍 搜索]  [筛选🎛️]  │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐                                                  │
│ │ 筛选器      │                                                  │
│ ├─────────────┤                                                  │
│ │ 地点类型:    │                                                  │
│ │ ☑ 城堡      │              地图区域                            │
│ │ ☑ 城市      │                                                  │
│ │ ☐ 城镇      │              📍 📍                               │
│ │ ☐ 废墟      │                                                  │
│ │ ☐ 地标      │                                                  │
│ │             │                                                  │
│ │ 家族:        │                                                  │
│ │ ☑ 史塔克    │                                                  │
│ │ ☐ 兰尼斯特  │                                                  │
│ │ ☐ 坦格利安  │                                                  │
│ │             │                                                  │
│ │ [应用]      │                                                  │
│ └─────────────┘                                                  │
│  [+] [-] [🧭]                                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 详细组件设计

### 1. 顶部导航栏

```css
/* 样式规格 */
height: 60px
background: rgba(0, 0, 0, 0.85)
backdrop-filter: blur(10px)
position: fixed
z-index: 1000
```

```
┌─────────────────────────────────────────────────────────────────┐
│ [🏰 Logo]  [首页] [交互地图]              [🔍 搜索框]  [☰ 菜单] │
│  MedievalSharp                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 2. 搜索组件 (模仿 wikiofthrones)

**默认状态** (折叠):
```
┌──────────┐
│ 🔍       │ ← 69x64px, 右上角
└──────────┘
```

**展开状态**:
```
┌────────────────────────┐
│ 🔍 [搜索地点...]   [×] │ ← 300x60px
├────────────────────────┤
│ 📍 临冬城 (Winterfell) │
│ 📍 君临城 (King's Landing)│
│ 📍 龙石岛 (Dragonstone)│
└────────────────────────┘
```

**实现细节**:
```jsx
<div className="search-container">
  <div className="search-bar">
    <input 
      className="search-input"
      placeholder="Search..."
      type="text"
    />
  </div>
  <div className="search-results">
    {/* 搜索结果列表 */}
  </div>
</div>
```

### 3. 地图容器

```css
.map-container {
  position: relative;
  width: 100vw;
  height: calc(100vh - 60px); /* 减去顶部栏 */
  background: #333;
}
```

**Leaflet 配置**:
```javascript
const map = L.map('map', {
  center: [5, 20],  // 维斯特洛中心
  zoom: 5,
  minZoom: 4,
  maxZoom: 7,
  zoomControl: false  // 自定义控制
});

// 自定义地图瓦片
L.tileLayer('/tiles/{z}/{x}/{y}.png', {
  attribution: 'Game of Thrones Map'
}).addTo(map);
```

### 4. 信息面板 (从右侧滑入)

```
┌─────────────────────────┐
│ 临冬城 (Winterfell) [×] │ ← .info-title (80px, fixed)
├─────────────────────────┤
│                         │
│  [城堡图片 16:9]        │
│                         │
├─────────────────────────┤
│ 🏰 类型: 城堡           │ ← .info-body (350px)
│ 👑 家族: 史塔克         │
│ 📍 地区: 北境           │
│                         │
│ 📖 描述:                │
│ 临冬城是北境的首府，    │
│ 史塔克家族世代居所...   │
│                         │
│ 🎬 重要事件:            │
│ • S1E1: 开篇           │
│ • S8E3: 长夜之战       │
│                         │
├─────────────────────────┤
│ [查看完整资料 →]        │ ← .info-footer (78px)
│ [在地图上显示附近地点]  │
└─────────────────────────┘
宽度: 500px
高度: 438px
位置: absolute, right: 0
动画: transform translateX(100%) → translateX(0)
```

### 5. 地图标记 (Markers)

**标记样式** (按类型):
```javascript
const markerIcons = {
  castle: L.icon({
    iconUrl: '/icons/castle.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }),
  city: L.icon({
    iconUrl: '/icons/city.png',
    iconSize: [28, 28]
  }),
  town: L.icon({
    iconUrl: '/icons/town.png',
    iconSize: [24, 24]
  }),
  ruin: L.icon({
    iconUrl: '/icons/ruin.png',
    iconSize: [24, 24],
    className: 'marker-ruin' // 半透明
  }),
  landmark: L.icon({
    iconUrl: '/icons/landmark.png',
    iconSize: [20, 20]
  })
};
```

**标记交互**:
```javascript
marker.on('click', (e) => {
  // 1. 打开信息面板
  showInfoPanel(location);
  
  // 2. 高亮标记
  marker.setIcon(highlightedIcon);
  
  // 3. 平滑移动地图
  map.flyTo(e.latlng, map.getZoom());
});
```

---

## 📊 数据结构设计

### Location 数据模型

```typescript
interface Location {
  id: string;
  name: string;
  nameEn: string;
  type: 'castle' | 'city' | 'town' | 'ruin' | 'region' | 'landmark';
  coordinates: [number, number]; // [lat, lng]
  
  // 基本信息
  house?: string;  // 所属家族
  region: string;  // 所在地区
  
  // 详细信息
  description: string;
  descriptionEn: string;
  image?: string;
  
  // 关联数据
  events?: Array<{
    season: number;
    episode: number;
    title: string;
  }>;
  
  relatedLocations?: string[]; // 相关地点 ID
  characters?: string[];  // 相关角色
  
  // 元数据
  importance: number; // 1-5, 用于标记大小
  visible: boolean;   // 是否默认显示
}
```

### API 响应格式

```json
{
  "success": true,
  "data": [
    {
      "id": "winterfell",
      "name": "临冬城",
      "nameEn": "Winterfell",
      "type": "castle",
      "coordinates": [54.5, -6.0],
      "house": "stark",
      "region": "north",
      "description": "北境的首府，史塔克家族的世代居所...",
      "image": "/images/locations/winterfell.jpg",
      "events": [
        { "season": 1, "episode": 1, "title": "凛冬将至" },
        { "season": 8, "episode": 3, "title": "长夜" }
      ],
      "importance": 5,
      "visible": true
    }
  ]
}
```

---

## 🛠️ 技术实现方案

### Next.js 项目结构

```
app/
├── page.tsx                    # 首页 (保留原站点)
├── map/
│   ├── page.tsx               # 地图页面
│   ├── layout.tsx             # 地图布局
│   └── [locationId]/
│       └── page.tsx           # 地点详情页
│
components/
├── Map/
│   ├── MapContainer.tsx       # 地图容器
│   ├── MapMarker.tsx          # 标记组件
│   ├── MapControls.tsx        # 缩放控制
│   └── MapLegend.tsx          # 图例
│
├── Search/
│   ├── SearchBar.tsx          # 搜索栏
│   └── SearchResults.tsx      # 搜索结果
│
├── InfoPanel/
│   ├── InfoPanel.tsx          # 信息面板
│   ├── LocationInfo.tsx       # 地点信息
│   └── EventTimeline.tsx      # 事件时间线
│
└── Filter/
    ├── FilterPanel.tsx        # 筛选面板
    └── FilterButton.tsx       # 筛选按钮
│
lib/
├── leaflet.ts                 # Leaflet 配置
├── api.ts                     # API 客户端
└── types.ts                   # TypeScript 类型
│
public/
├── tiles/                     # 地图瓦片
│   └── {z}/{x}/{y}.png
├── icons/                     # 标记图标
│   ├── castle.png
│   ├── city.png
│   └── ...
└── images/
    └── locations/             # 地点图片
```

### 核心组件实现

#### 1. MapContainer.tsx

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapContainer() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // 初始化地图
    const map = L.map(containerRef.current, {
      center: [5, 20],
      zoom: 5,
      minZoom: 4,
      maxZoom: 7,
      zoomControl: false
    });

    // 添加自定义瓦片
    L.tileLayer('/tiles/{z}/{x}/{y}.png', {
      attribution: 'Game of Thrones Map'
    }).addTo(map);

    mapRef.current = map;

    // 加载地点数据
    loadLocations();

    return () => {
      map.remove();
    };
  }, []);

  const loadLocations = async () => {
    const types = ['castle', 'city', 'town', 'ruin', 'region', 'landmark'];
    const allLocations = [];

    for (const type of types) {
      const res = await fetch(`/api/locations/${type}`);
      const data = await res.json();
      allLocations.push(...data);
    }

    setLocations(allLocations);
    addMarkers(allLocations);
  };

  const addMarkers = (locations) => {
    if (!mapRef.current) return;

    locations.forEach(location => {
      const marker = L.marker(location.coordinates, {
        icon: getMarkerIcon(location.type)
      }).addTo(mapRef.current);

      marker.on('click', () => {
        setSelectedLocation(location);
      });
    });
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
      
      {selectedLocation && (
        <InfoPanel 
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  );
}
```

#### 2. SearchBar.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    // 搜索地点
    const searchLocations = async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    };

    const debounce = setTimeout(searchLocations, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className={`search-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
      </div>
      
      {results.length > 0 && (
        <div className="search-results">
          {results.map(location => (
            <div
              key={location.id}
              className="search-result-item"
              onClick={() => {
                onSelect(location);
                setIsExpanded(false);
                setQuery('');
              }}
            >
              📍 {location.name} ({location.nameEn})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 3. InfoPanel.tsx

```tsx
'use client';

export default function InfoPanel({ location, onClose }) {
  return (
    <div className="info-container">
      <div className="info-title">
        <h2>{location.name}</h2>
        <button onClick={onClose}>×</button>
      </div>
      
      <div className="info-body">
        {location.image && (
          <img 
            src={location.image} 
            alt={location.name}
            className="w-full h-48 object-cover"
          />
        )}
        
        <div className="info-content">
          <div className="info-meta">
            <p>🏰 类型: {getTypeLabel(location.type)}</p>
            {location.house && (
              <p>👑 家族: {location.house}</p>
            )}
            <p>📍 地区: {location.region}</p>
          </div>
          
          <div className="info-description">
            <h3>📖 描述</h3>
            <p>{location.description}</p>
          </div>
          
          {location.events && location.events.length > 0 && (
            <div className="info-events">
              <h3>🎬 重要事件</h3>
              <ul>
                {location.events.map((event, i) => (
                  <li key={i}>
                    S{event.season}E{event.episode}: {event.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="info-footer">
        <button className="btn-primary">
          查看完整资料 →
        </button>
      </div>
    </div>
  );
}
```

---

## 🎨 样式设计

### Tailwind 配置

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'got-dark': '#1a1a1a',
        'got-gray': '#333',
        'got-bronze': '#8b7355',
        'got-gold': '#c9a961',
        'got-parchment': '#f4e8d0'
      },
      fontFamily: {
        'medieval': ['MedievalSharp', 'serif'],
        'lato': ['Lato', 'sans-serif']
      }
    }
  }
};
```

### 关键样式

```css
/* 搜索组件 */
.search-container {
  position: absolute;
  top: 80px;
  right: 20px;
  z-index: 900;
  transition: all 0.3s ease;
}

.search-container:not(.expanded) {
  width: 69px;
  height: 64px;
}

.search-container.expanded {
  width: 300px;
}

.search-input {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.85);
  border: 2px solid #8b7355;
  color: white;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  border-radius: 8px;
}

.search-results {
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #8b7355;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 400px;
  overflow-y: auto;
}

.search-result-item {
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.search-result-item:hover {
  background: rgba(139, 115, 85, 0.3);
}

/* 信息面板 */
.info-container {
  position: absolute;
  right: 0;
  top: 60px;
  width: 500px;
  height: calc(100vh - 60px);
  background: #f4e8d0;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 800;
}

.info-container.visible {
  transform: translateX(0);
}

.info-title {
  position: sticky;
  top: 0;
  height: 80px;
  background: #8b7355;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-family: 'MedievalSharp', serif;
  font-size: 24px;
  z-index: 10;
}

.info-body {
  height: calc(100% - 158px);
  overflow-y: auto;
  padding: 20px;
}

.info-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 78px;
  background: #e8dcc0;
  border-top: 2px solid #8b7355;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* 地图标记动画 */
.leaflet-marker-icon {
  transition: transform 0.2s ease;
}

.leaflet-marker-icon:hover {
  transform: scale(1.2);
  z-index: 1000 !important;
}

.leaflet-marker-icon.highlighted {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}
```

---

## 📱 响应式设计

### 桌面端 (>1200px)
```
[地图全屏]
[搜索框: 右上角]
[信息面板: 右侧滑出 500px]
```

### 平板端 (768px - 1200px)
```
[地图全屏]
[搜索框: 右上角, 缩小]
[信息面板: 右侧滑出 400px]
```

### 移动端 (<768px)
```
[地图全屏]
[搜索框: 顶部固定]
[信息面板: 底部抽屉, 全宽]
```

```css
/* 移动端样式 */
@media (max-width: 768px) {
  .search-container {
    top: 60px;
    right: 10px;
    left: 10px;
    width: auto;
  }
  
  .info-container {
    top: auto;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 60vh;
    transform: translateY(100%);
  }
  
  .info-container.visible {
    transform: translateY(0);
  }
}
```

---

## 🚀 开发路线图

### Phase 1: 基础地图 (1-2周)
- [x] 研究 wikiofthrones.com 架构
- [ ] 设置 Next.js 项目
- [ ] 集成 Leaflet.js
- [ ] 创建基础地图容器
- [ ] 添加自定义地图瓦片
- [ ] 实现基础标记显示

### Phase 2: 核心功能 (2-3周)
- [ ] 实现搜索组件
- [ ] 创建信息面板
- [ ] 添加标记点击交互
- [ ] 实现 API 端点
- [ ] 加载真实地点数据 (20-30个主要地点)

### Phase 3: 增强功能 (2周)
- [ ] 添加筛选功能
- [ ] 实现地点详情页
- [ ] 添加相关地点推荐
- [ ] 优化移动端体验

### Phase 4: 优化和发布 (1周)
- [ ] 性能优化
- [ ] SEO 优化
- [ ] 添加加载动画
- [ ] 测试和修复 bug
- [ ] 部署上线

---

## 📝 总结

基于对 maps.wikiofthrones.com 的实际研究，我们发现：

1. **极简设计**: 没有复杂的侧边栏，地图占据全屏
2. **搜索优先**: 小巧的搜索框是主要交互入口
3. **信息面板**: 点击标记时从右侧滑出，不遮挡地图
4. **RESTful API**: 按类型分类获取地点数据
5. **原生 JS**: 不依赖 React/Vue 等框架

**推荐方案**: 采用方案 A (极简风格)，保持与 wikiofthrones 相似的用户体验，同时融入 thegameofthronesmap.com 的精美视觉设计。

这样既能提供强大的交互功能，又不会让用户感到界面复杂。
