# 设计文档 - Task 2（联盟营销）

## 设计原则
- 强转化入口 + 不干扰核心地图体验。
- 文案真实可验证，不承诺未确认优惠。
- 明确披露联盟关系，位置紧邻 CTA。
- 视觉风格与现有 medieval 风格一致。

## 入口布局（高转化优先级）
1. 首页 Hero 下方：主横幅（Primary Placement）
2. 首页 Resources 区域：GamsGo 卡片（Secondary Placement）
3. 地图页 /locations 与 /regions/*：地图下方紧凑 CTA 卡片（High Intent）
4. 栏目页 /houses、/battles：首段后轻量支持卡
5. 移动端 Sticky CTA：滚动 50% 后出现（可关闭）

## ASCII 设计图（英文文案，基于官网可验证表述）

### Home / Desktop
```
┌──────────────────────────────────────────────────────────────┐
│ HERO                                                        │
│  [CTA] Explore Map   [CTA] View Houses                       │
├──────────────────────────────────────────────────────────────┤
│ Affiliate Banner                                             │
│  Title: Save up to 60% on select plans                       │
│  Sub: Verified sellers · Pre‑checked accounts                │
│       Instant delivery · Secure checkout                     │
│  Trust line: SSL encryption · PCI DSS v4.0                   │
│  [Button] Visit GamsGo                                       │
│  * Disclosure: We may earn a commission at no extra cost.    │
├──────────────────────────────────────────────────────────────┤
│ Recommended Resources                                       │
│  ...                                                        │
│  [Card] GamsGo                                               │
│   Copy: 80+ digital services · Trusted by 2M+ users           │
│         Up to 60% off official prices (select plans)          │
│   [Button] Visit GamsGo                                       │
│   * Disclosure: We may earn a commission at no extra cost.    │
└──────────────────────────────────────────────────────────────┘
```

### Home / Mobile (Sticky CTA)
```
[Shows after 50% scroll]
┌────────────────────────────────────────────┐
│ Save up to 60% on select plans · Visit GamsGo [Visit] │
│ * Disclosure: We may earn a commission at no extra cost. │
└────────────────────────────────────────────┘
```

### Map Pages
```
┌────────────────────────────────────────────┐
│ Interactive Map                            │
├────────────────────────────────────────────┤
│ Compact CTA Card                           │
│ Title: Stream more for less                │
│ Sub: Up to 60% off official prices (select plans) │
│ [Button] Visit GamsGo                      │
│ * Disclosure: We may earn a commission at no extra cost. │
└────────────────────────────────────────────┘
```

### Category Pages
```
┌────────────────────────────────────────────┐
│ Intro / First paragraph                    │
├────────────────────────────────────────────┤
│ Small Support Card                         │
│ Title: Save on subscriptions               │
│ Sub: Verified sellers · Instant delivery    │
│ [Button] Visit GamsGo                      │
│ * Disclosure: We may earn a commission at no extra cost. │
└────────────────────────────────────────────┘
```

## 交互逻辑
- 统一外链：`target="_blank"` + `rel="noopener noreferrer nofollow"`
- 埋点事件：`affiliate_click`
  - `placement_id`: home-hero / home-resources / map-below / sticky-mobile / content-inline
  - `cta_variant`: value-v1
- Sticky CTA：
  - 仅移动端
  - 滚动 ≥ 50% 出现
  - 关闭后本会话不再显示

## 文案变体（A/B，用于最大化转化）

### Banner Headline
- A: Save up to 60% on select plans
- B: Lower official prices on select subscriptions
- C: Stream more for less (select plans)

### Banner Subheadline
- A: Verified sellers · Pre‑checked accounts · Instant delivery
- B: Secure checkout (SSL + PCI DSS v4.0)
- C: Trusted by 2M+ users · 80+ digital services

### CTA
- A: Visit GamsGo
- B: See plans on GamsGo
- C: Get started on GamsGo

## 待确认（依 overview 文档更新）
- 是否允许使用“save / lower price / discount”等词（如有禁用词需替换）。
- 是否允许添加 promo code 文案。
- 是否可使用官方 Logo 或品牌色。
- 是否允许将“2M+ users / 80+ services / PCI DSS v4.0”作为信任背书。
