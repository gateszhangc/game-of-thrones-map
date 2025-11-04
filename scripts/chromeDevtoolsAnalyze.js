const { chromium } = require("playwright");
const fs = require("fs");

async function analyzeWithDevTools() {
  console.log("连接到 Chrome DevTools...");
  
  // 连接到已经运行的 Chrome 实例
  const browser = await chromium.connectOverCDP("http://localhost:9222");
  const contexts = browser.contexts();
  
  if (contexts.length === 0) {
    console.log("没有找到活动的浏览器上下文");
    await browser.close();
    return;
  }
  
  const context = contexts[0];
  const pages = context.pages();
  
  if (pages.length === 0) {
    console.log("没有找到活动的页面");
    await browser.close();
    return;
  }
  
  const page = pages[0];
  console.log("当前页面:", await page.title());
  
  // 等待页面加载完成
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  
  console.log("\n=== 详细 DOM 结构分析 ===");
  const domAnalysis = await page.evaluate(() => {
    const analysis = {
      app: {},
      map: {},
      ui: {},
      data: {}
    };
    
    // 分析 #app 容器
    const app = document.querySelector("#app");
    if (app) {
      analysis.app = {
        children: Array.from(app.children).map(child => ({
          tagName: child.tagName,
          className: child.className,
          id: child.id
        }))
      };
    }
    
    // 分析地图容器
    const mapContainer = document.querySelector(".map-container");
    if (mapContainer) {
      analysis.map = {
        className: mapContainer.className,
        dimensions: {
          width: mapContainer.offsetWidth,
          height: mapContainer.offsetHeight
        },
        children: Array.from(mapContainer.children).map(child => ({
          tagName: child.tagName,
          className: child.className
        }))
      };
    }
    
    // 查找所有可能的 UI 组件
    const uiSelectors = [
      ".sidebar", ".side-panel", "[class*='sidebar']",
      ".search", ".search-box", "[class*='search']",
      ".filter", ".filters", "[class*='filter']",
      ".legend", "[class*='legend']",
      ".info", ".info-panel", "[class*='info']",
      "nav", "header", "aside"
    ];
    
    uiSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        analysis.ui[selector] = Array.from(elements).map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          visible: window.getComputedStyle(el).display !== "none",
          position: window.getComputedStyle(el).position,
          dimensions: {
            width: el.offsetWidth,
            height: el.offsetHeight
          }
        }));
      }
    });
    
    return analysis;
  });
  
  console.log(JSON.stringify(domAnalysis, null, 2));
  
  console.log("\n=== React 组件树分析 ===");
  const reactAnalysis = await page.evaluate(() => {
    const analysis = {
      hasReact: false,
      reactVersion: null,
      rootElement: null,
      components: []
    };
    
    // 检查 React
    const app = document.querySelector("#app");
    if (app) {
      const reactRoot = Object.keys(app).find(key => key.startsWith("__react"));
      if (reactRoot) {
        analysis.hasReact = true;
        analysis.rootElement = "#app";
      }
    }
    
    // 尝试获取 React 版本
    if (window.React) {
      analysis.reactVersion = window.React.version;
    }
    
    return analysis;
  });
  
  console.log(JSON.stringify(reactAnalysis, null, 2));
  
  console.log("\n=== Leaflet 地图详细信息 ===");
  const leafletAnalysis = await page.evaluate(() => {
    const analysis = {
      version: null,
      maps: [],
      layers: [],
      markers: [],
      controls: []
    };
    
    if (typeof L !== "undefined") {
      analysis.version = L.version;
      
      // 尝试获取地图实例
      const mapContainer = document.querySelector(".leaflet-container");
      if (mapContainer && mapContainer._leaflet_id) {
        const mapId = mapContainer._leaflet_id;
        
        // 获取地图中心和缩放级别
        const panes = mapContainer.querySelectorAll(".leaflet-pane");
        analysis.layers = Array.from(panes).map(pane => ({
          className: pane.className,
          zIndex: window.getComputedStyle(pane).zIndex
        }));
      }
      
      // 获取所有标记
      const markerElements = document.querySelectorAll(".leaflet-marker-icon");
      analysis.markers = Array.from(markerElements).map(marker => ({
        className: marker.className,
        src: marker.src,
        alt: marker.alt,
        position: {
          left: marker.style.left,
          top: marker.style.top
        }
      }));
      
      // 获取控制按钮
      const controls = document.querySelectorAll(".leaflet-control");
      analysis.controls = Array.from(controls).map(control => ({
        className: control.className,
        innerHTML: control.innerHTML.substring(0, 100)
      }));
    }
    
    return analysis;
  });
  
  console.log(JSON.stringify(leafletAnalysis, null, 2));
  
  console.log("\n=== 样式和布局分析 ===");
  const styleAnalysis = await page.evaluate(() => {
    const analysis = {
      bodyStyles: {},
      appStyles: {},
      mapStyles: {},
      customProperties: []
    };
    
    const body = document.body;
    const bodyStyles = window.getComputedStyle(body);
    analysis.bodyStyles = {
      backgroundColor: bodyStyles.backgroundColor,
      fontFamily: bodyStyles.fontFamily,
      margin: bodyStyles.margin,
      padding: bodyStyles.padding,
      overflow: bodyStyles.overflow
    };
    
    const app = document.querySelector("#app");
    if (app) {
      const appStyles = window.getComputedStyle(app);
      analysis.appStyles = {
        display: appStyles.display,
        position: appStyles.position,
        width: appStyles.width,
        height: appStyles.height
      };
    }
    
    const mapContainer = document.querySelector(".map-container");
    if (mapContainer) {
      const mapStyles = window.getComputedStyle(mapContainer);
      analysis.mapStyles = {
        position: mapStyles.position,
        width: mapStyles.width,
        height: mapStyles.height,
        zIndex: mapStyles.zIndex
      };
    }
    
    // 获取 CSS 自定义属性
    const allStyles = Array.from(document.styleSheets);
    allStyles.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.style) {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i];
              if (prop.startsWith("--")) {
                analysis.customProperties.push({
                  property: prop,
                  value: rule.style.getPropertyValue(prop)
                });
              }
            }
          }
        });
      } catch (e) {
        // CORS 限制
      }
    });
    
    return analysis;
  });
  
  console.log(JSON.stringify(styleAnalysis, null, 2));
  
  console.log("\n=== JavaScript 全局对象分析 ===");
  const globalAnalysis = await page.evaluate(() => {
    const analysis = {
      libraries: {},
      customGlobals: []
    };
    
    // 检查常见库
    const libraries = ["React", "ReactDOM", "L", "axios", "jQuery", "$"];
    libraries.forEach(lib => {
      if (window[lib]) {
        analysis.libraries[lib] = typeof window[lib];
      }
    });
    
    // 查找自定义全局变量
    const standardGlobals = new Set([
      "window", "document", "location", "navigator", "console",
      "setTimeout", "setInterval", "fetch", "XMLHttpRequest"
    ]);
    
    Object.keys(window).forEach(key => {
      if (!standardGlobals.has(key) && 
          !key.startsWith("webkit") && 
          !key.startsWith("chrome") &&
          typeof window[key] !== "function") {
        analysis.customGlobals.push({
          name: key,
          type: typeof window[key]
        });
      }
    });
    
    return analysis;
  });
  
  console.log(JSON.stringify(globalAnalysis, null, 2));
  
  console.log("\n=== 事件监听器分析 ===");
  const eventAnalysis = await page.evaluate(() => {
    const analysis = {
      clickHandlers: [],
      inputHandlers: [],
      mapHandlers: []
    };
    
    // 查找带有点击事件的元素
    const clickableElements = document.querySelectorAll("[onclick], button, a");
    analysis.clickHandlers = Array.from(clickableElements).slice(0, 10).map(el => ({
      tagName: el.tagName,
      className: el.className,
      text: el.textContent.trim().substring(0, 50)
    }));
    
    // 查找输入元素
    const inputs = document.querySelectorAll("input, select, textarea");
    analysis.inputHandlers = Array.from(inputs).map(input => ({
      type: input.type,
      name: input.name,
      placeholder: input.placeholder,
      className: input.className
    }));
    
    return analysis;
  });
  
  console.log(JSON.stringify(eventAnalysis, null, 2));
  
  // 保存完整分析结果
  const fullAnalysis = {
    timestamp: new Date().toISOString(),
    url: await page.url(),
    title: await page.title(),
    dom: domAnalysis,
    react: reactAnalysis,
    leaflet: leafletAnalysis,
    styles: styleAnalysis,
    globals: globalAnalysis,
    events: eventAnalysis
  };
  
  fs.writeFileSync(
    "design/wikimap-devtools-analysis.json",
    JSON.stringify(fullAnalysis, null, 2),
    "utf8"
  );
  
  console.log("\n完整分析已保存到 design/wikimap-devtools-analysis.json");
  
  await browser.close();
}

analyzeWithDevTools().catch(error => {
  console.error("分析失败:", error);
  process.exitCode = 1;
});
