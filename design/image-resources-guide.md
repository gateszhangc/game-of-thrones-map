# 图片资源准备指南

## 📸 必需图片清单

### 1. 纹理背景图片

#### parchment-texture.jpg
- **用途**: 页面主背景
- **尺寸**: 400x400px（可平铺）
- **格式**: JPG
- **特征**: 
  - 浅米色/米黄色
  - 羊皮纸质感
  - 轻微的褶皱和斑点
  - 可平铺无缝衔接

**获取方式**:
```
搜索关键词: "parchment texture seamless", "old paper texture"
推荐网站: 
- https://www.textures.com (搜索 "parchment")
- https://unsplash.com/s/photos/parchment
- https://www.pexels.com/search/old%20paper/
```

**临时替代方案**:
```css
/* 如果暂时没有图片，使用纯色 */
background: #f4e8d0;
```

---

#### paper-grain.png
- **用途**: 纸张颗粒叠加效果
- **尺寸**: 512x512px
- **格式**: PNG（透明背景）
- **特征**:
  - 细微的纸张纤维纹理
  - 透明背景
  - 黑白或灰度
  - 可平铺

**获取方式**:
```
搜索关键词: "paper grain texture transparent", "noise texture"
或使用 Photoshop/GIMP 添加噪点滤镜
```

**临时替代方案**:
```css
/* CSS 噪点效果 */
background-image: 
    repeating-linear-gradient(0deg, 
        transparent, 
        transparent 2px, 
        rgba(0, 0, 0, 0.03) 2px, 
        rgba(0, 0, 0, 0.03) 4px
    );
```

---

#### old-map-bg.jpg
- **用途**: 交互式地图区域背景
- **尺寸**: 1920x1080px
- **格式**: JPG
- **特征**:
  - 古地图风格
  - 深色调（棕色、褐色）
  - 可以有指南针、航海图案
  - 模糊或淡化处理

**获取方式**:
```
搜索关键词: "old map background", "vintage map texture"
推荐: 使用实际的权游地图作为背景（模糊处理）
```

**临时替代方案**:
```css
background: linear-gradient(135deg, #2c2416 0%, #1a1a1a 100%);
```

---

#### leather-texture.jpg
- **用途**: Features 区域背景
- **尺寸**: 1920x1080px
- **格式**: JPG
- **特征**:
  - 深色皮革质感
  - 棕色或深褐色
  - 自然的纹理和划痕

**获取方式**:
```
搜索关键词: "dark leather texture", "brown leather background"
```

**临时替代方案**:
```css
background: linear-gradient(135deg, #3a2f1f 0%, #2c2416 100%);
```

---

#### stone-texture.jpg
- **用途**: Resources 区域背景
- **尺寸**: 1920x1080px
- **格式**: JPG
- **特征**:
  - 石头或石墙纹理
  - 灰色或深灰色
  - 粗糙质感

**获取方式**:
```
搜索关键词: "stone wall texture", "medieval stone background"
```

**临时替代方案**:
```css
background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
```

---

### 2. 图标文件

#### westeros.png
- **尺寸**: 80x80px
- **格式**: PNG（透明背景）
- **内容**: 维斯特洛大陆轮廓或狼头（史塔克家族）
- **颜色**: 金色或棕色

#### essos.png
- **尺寸**: 80x80px
- **格式**: PNG（透明背景）
- **内容**: 厄索斯大陆轮廓或龙头（坦格利安家族）
- **颜色**: 金色或棕色

#### houses.png
- **尺寸**: 80x80px
- **格式**: PNG（透明背景）
- **内容**: 盾牌或皇冠图标
- **颜色**: 金色或棕色

#### battles.png
- **尺寸**: 80x80px
- **格式**: PNG（透明背景）
- **内容**: 交叉的剑或战旗
- **颜色**: 金色或棕色

**获取方式**:
```
1. 使用 Font Awesome 图标转换为图片
2. 使用 Flaticon.com 搜索相关图标
3. 使用 AI 工具生成（如 DALL-E, Midjourney）
4. 使用 Figma/Illustrator 自己设计
```

**临时替代方案**:
```css
/* 使用 Unicode 符号 */
.westeros-icon::before { content: '🏰'; font-size: 60px; }
.essos-icon::before { content: '🐉'; font-size: 60px; }
.houses-icon::before { content: '👑'; font-size: 60px; }
.battles-icon::before { content: '⚔️'; font-size: 60px; }
```

---

### 3. 可选装饰图片

#### divider-ornament.png
- **尺寸**: 300x30px
- **格式**: PNG（透明背景）
- **内容**: 装饰性分隔线（花纹、藤蔓等）

#### wax-seal.png
- **尺寸**: 100x100px
- **格式**: PNG（透明背景）
- **内容**: 蜡封印章图案

---

## 🎨 图片优化建议

### 压缩工具
- **TinyPNG**: https://tinypng.com/
- **ImageOptim**: https://imageoptim.com/
- **Squoosh**: https://squoosh.app/

### 优化目标
- JPG 图片: < 200KB
- PNG 图片: < 100KB
- 总体加载时间: < 2秒

### 响应式图片
```html
<!-- 为不同设备提供不同尺寸 -->
<picture>
  <source media="(max-width: 768px)" srcset="/images/bg-mobile.jpg">
  <source media="(max-width: 1200px)" srcset="/images/bg-tablet.jpg">
  <img src="/images/bg-desktop.jpg" alt="Background">
</picture>
```

---

## 🚀 快速开始（无图片版本）

如果你想立即看到效果，可以先不添加图片，使用纯 CSS 替代：

### 修改 style-medieval.css

将所有 `url('../images/...')` 替换为纯色或渐变：

```css
/* 原代码 */
background: url('../images/parchment-texture.jpg') repeat;

/* 替代方案 */
background: #f4e8d0;
```

### 创建占位符图片

使用在线工具快速生成占位符：
- https://placeholder.com/
- https://via.placeholder.com/

示例：
```html
<img src="https://via.placeholder.com/80x80/c9a961/2c2416?text=⚔" alt="Icon">
```

---

## 📦 图片文件夹结构

```
public/images/
├── backgrounds/
│   ├── parchment-texture.jpg
│   ├── old-map-bg.jpg
│   ├── leather-texture.jpg
│   └── stone-texture.jpg
├── textures/
│   └── paper-grain.png
├── icons/
│   ├── westeros.png
│   ├── essos.png
│   ├── houses.png
│   └── battles.png
└── decorations/
    ├── divider-ornament.png
    └── wax-seal.png
```

---

## ✅ 检查清单

### 必需（高优先级）
- [ ] parchment-texture.jpg
- [ ] paper-grain.png
- [ ] old-map-bg.jpg

### 推荐（中优先级）
- [ ] leather-texture.jpg
- [ ] stone-texture.jpg
- [ ] westeros.png
- [ ] essos.png
- [ ] houses.png
- [ ] battles.png

### 可选（低优先级）
- [ ] divider-ornament.png
- [ ] wax-seal.png
- [ ] 其他装饰元素

---

## 🎯 AI 生成提示词

如果使用 AI 工具生成图片，可以使用以下提示词：

### Midjourney / DALL-E 提示词

**羊皮纸纹理**:
```
ancient parchment paper texture, seamless, beige color, 
subtle wrinkles, aged paper, medieval manuscript style, 
high resolution, tileable pattern
```

**古地图背景**:
```
old medieval map background, dark brown tones, 
vintage cartography style, compass rose, 
aged paper texture, fantasy map aesthetic
```

**图标设计**:
```
medieval fantasy icon, golden color, simple line art, 
transparent background, [sword/castle/crown/dragon], 
heraldic style, game of thrones inspired
```

---

## 💡 专业建议

1. **保持一致性**: 所有图片应该有统一的色调和风格
2. **优化性能**: 压缩图片但保持质量
3. **版权注意**: 确保使用的图片有合法授权
4. **备用方案**: 始终准备 CSS 降级方案
5. **测试加载**: 在慢速网络下测试图片加载效果

---

**更新日期**: 2025-11-05
**版本**: 1.0
