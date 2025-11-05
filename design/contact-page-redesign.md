# Contact Page Redesign - Game of Thrones Map

## 当前问题分析
1. 页面使用 `dangerouslySetInnerHTML`，不符合 React 最佳实践
2. 缺少中世纪风格的视觉设计
3. 表单样式简单，没有与主题融合
4. 缺少与 Game of Thrones 主题相关的元素

## 设计理念
基于"羊皮纸信件"和"乌鸦传信"的概念，将联系表单设计成一封发往 Citadel（学城）的信件。

## 新设计方案

### 1. 页面布局

```
┌─────────────────────────────────────────────────────┐
│                    Header (导航栏)                    │
├─────────────────────────────────────────────────────┤
│                                                       │
│              Hero Section (标题区域)                  │
│         "Send a Raven" / "发送乌鸦传信"               │
│    副标题：Contact the Maesters of the Map            │
│                                                       │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────────┐  ┌──────────────────────┐    │
│  │                  │  │                      │    │
│  │   Contact Form   │  │   Contact Info       │    │
│  │   (羊皮纸样式)    │  │   (信息卡片)          │    │
│  │                  │  │                      │    │
│  │  - Name          │  │  📧 Email            │    │
│  │  - Email         │  │  🐦 Social Media     │    │
│  │  - Subject       │  │  📍 Location         │    │
│  │  - Message       │  │  ⏰ Response Time    │    │
│  │                  │  │                      │    │
│  │  [Send Raven]    │  │                      │    │
│  │                  │  │                      │    │
│  └──────────────────┘  └──────────────────────┘    │
│                                                       │
├─────────────────────────────────────────────────────┤
│                    Footer                            │
└─────────────────────────────────────────────────────┘
```

### 2. 视觉设计元素

#### Hero Section
- **标题**: "Send a Raven" (发送乌鸦传信)
- **副标题**: "Contact the Maesters of the Map"
- **装饰**: 乌鸦剪影图标、羊皮纸卷轴装饰
- **背景**: 深色渐变，带有微妙的纸张纹理

#### Contact Form (左侧)
- **容器样式**: 
  - 羊皮纸背景色 (#f4e8d0)
  - 边框：3-4px 棕色边框，带有蜡封印章装饰
  - 阴影：深色投影，营造立体感
  - 四角装饰：金色装饰角

- **表单字段**:
  - Label: 使用 Cinzel 字体，深棕色
  - Input/Textarea: 
    - 浅色背景，带有纸张纹理
    - 边框：2px 棕色
    - Focus 状态：金色边框
    - 字体：Lora serif

- **提交按钮**:
  - 文字："Send Raven" 或 "Dispatch Message"
  - 样式：金色渐变背景，带有乌鸦图标
  - Hover 效果：发光效果，按钮轻微上浮

#### Contact Info (右侧)
- **卡片样式**: 与表单相似的羊皮纸风格
- **内容区块**:
  1. **Email Contact**
     - 图标：信封或乌鸦
     - 邮箱地址
     - 说明文字："For general inquiries and map suggestions"

  2. **Social Media**
     - 图标：社交媒体图标（中世纪风格化）
     - 链接到官方社交账号
     - 说明："Follow our journey across the realm"

  3. **Response Time**
     - 图标：沙漏或时钟
     - 文字："We typically respond within 24-48 hours"
     - 说明："Like a raven's flight, swift but sure"

  4. **Location** (可选)
     - 图标：地图标记
     - 文字："Based in [Location]"
     - 幽默说明："Not quite King's Landing, but close"

### 3. 交互设计

#### 表单验证
- 实时验证，错误提示使用红色边框
- 成功提示：绿色边框 + 勾选图标
- 错误信息：在字段下方显示，使用小字体

#### 提交成功状态
- 显示成功消息："Your raven has been dispatched!"
- 动画：乌鸦飞走的简单动画效果
- 自动清空表单
- 显示确认信息："We'll respond as swiftly as a raven flies"

#### 加载状态
- 提交按钮显示加载动画
- 文字变为："Dispatching raven..."
- 禁用表单输入

### 4. 响应式设计

#### Desktop (>1024px)
- 两列布局：表单 60% | 信息 40%
- 最大宽度：1200px

#### Tablet (768px - 1024px)
- 两列布局：表单 55% | 信息 45%
- 减小间距和字体大小

#### Mobile (<768px)
- 单列布局
- 表单在上，信息卡片在下
- 全宽显示
- 增加触摸友好的输入框大小

### 5. 文案建议

#### 标题区域
- 主标题：**"Send a Raven"**
- 副标题：**"Contact the Maesters of the Map"**
- 描述：*"Have questions about the realm? Spotted an error on the map? Want to suggest a new location? Send us a message and we'll respond as swiftly as a raven flies."*

#### 表单字段
- Name: "Your Name" / "Ser/Lady..."
- Email: "Your Email" / "Raven Return Address"
- Subject: "Subject" / "Purpose of Your Message"
- Message: "Your Message" / "What brings you to the Citadel?"

#### 提交按钮
- 默认："Send Raven"
- 加载："Dispatching Raven..."
- 成功："Raven Dispatched!"

#### 联系信息
```
📧 Email
hello@thegameofthronesmap.com
For general inquiries and map suggestions

🐦 Follow Our Journey
Twitter | Facebook | Instagram
Stay updated on new locations and features

⏰ Response Time
We typically respond within 24-48 hours
Like a raven's flight, swift but sure

💡 Suggestions Welcome
Found an error? Have a location to add?
We're always improving the map of the realm
```

### 6. 技术实现要点

#### React 组件结构
```tsx
<ContactPage>
  <Header />
  <main>
    <HeroSection />
    <ContactSection>
      <ContactForm />
      <ContactInfo />
    </ContactSection>
  </main>
  <Footer />
</ContactPage>
```

#### 表单处理
- 使用 React Hook Form 进行表单管理
- Zod 进行表单验证
- 客户端验证 + 服务端验证
- 使用 Server Actions 处理表单提交

#### 样式实现
- 使用现有的 CSS 变量保持一致性
- 添加 contact 专用的 CSS 类
- 使用 CSS Grid 和 Flexbox 实现响应式布局

### 7. 可选增强功能

1. **FAQ Section**
   - 在表单下方添加常见问题
   - 手风琴式展开/收起
   - 减少重复咨询

2. **Map Issue Reporter**
   - 专门的地图错误报告表单
   - 可以上传截图
   - 标注具体位置

3. **Newsletter Signup**
   - 订阅地图更新通知
   - 集成到联系信息卡片中

4. **Live Chat** (未来)
   - 实时聊天支持
   - 工作时间显示

### 8. 无障碍性考虑

- 所有表单字段都有明确的 label
- 使用 aria-labels 和 aria-describedby
- 键盘导航友好
- 错误信息与字段关联
- 足够的颜色对比度
- 支持屏幕阅读器

### 9. SEO 优化

- 页面标题："Contact Us - Game of Thrones Map"
- Meta 描述："Get in touch with the Game of Thrones Map team. Report errors, suggest locations, or ask questions about the realm."
- Schema.org ContactPage 标记
- 结构化数据

## 实现优先级

### Phase 1 (MVP)
1. ✅ 基础页面结构和布局
2. ✅ 表单组件（Name, Email, Subject, Message）
3. ✅ 基础样式（羊皮纸风格）
4. ✅ 表单验证
5. ✅ 联系信息卡片

### Phase 2 (增强)
1. 提交成功动画
2. 加载状态优化
3. 错误处理改进
4. 响应式优化

### Phase 3 (可选)
1. FAQ Section
2. Newsletter 订阅
3. 地图错误报告功能
4. 更多交互动画

## 设计参考

- 主页的羊皮纸卡片样式
- 中世纪蜡封印章
- Game of Thrones 官方网站的视觉风格
- 乌鸦传信的概念（剧中重要通讯方式）
