const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function analyzeWebsite() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log("正在访问网站...");
  await page.goto("https://maps.wikiofthrones.com/", {
    waitUntil: "networkidle"
  });

  // 等待页面完全加载
  await page.waitForTimeout(3000);

  console.log("\n=== 页面标题 ===");
  const title = await page.title();
  console.log(title);

  console.log("\n=== 页面结构分析 ===");
  const structure = await page.evaluate(() => {
    const result = {
      bodyClasses: document.body.className,
      mainElements: [],
      scripts: [],
      styles: []
    };

    // 获取主要元素
    const mainSelectors = [
      "#app",
      ".leaflet-container",
      ".sidebar",
      ".search",
      ".filter",
      "nav",
      "header",
      ".map-container"
    ];

    mainSelectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        result.mainElements.push({
          selector,
          exists: true,
          classes: el.className,
          id: el.id
        });
      }
    });

    // 获取所有脚本
    document.querySelectorAll("script[src]").forEach((script) => {
      result.scripts.push(script.src);
    });

    // 获取所有样式
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      result.styles.push(link.href);
    });

    return result;
  });

  console.log(JSON.stringify(structure, null, 2));

  console.log("\n=== Leaflet 地图信息 ===");
  const mapInfo = await page.evaluate(() => {
    const result = {
      hasLeaflet: typeof L !== "undefined",
      leafletVersion: typeof L !== "undefined" ? L.version : null,
      mapContainers: []
    };

    // 查找所有 Leaflet 容器
    document.querySelectorAll(".leaflet-container").forEach((container) => {
      const bounds = container.getBoundingClientRect();
      result.mapContainers.push({
        id: container.id,
        classes: container.className,
        width: bounds.width,
        height: bounds.height
      });
    });

    return result;
  });

  console.log(JSON.stringify(mapInfo, null, 2));

  console.log("\n=== 地图标记和图层 ===");
  await page.waitForTimeout(2000); // 等待标记加载

  const markersInfo = await page.evaluate(() => {
    const result = {
      markers: [],
      popups: [],
      controls: []
    };

    // 查找所有标记
    document.querySelectorAll(".leaflet-marker-icon").forEach((marker) => {
      result.markers.push({
        classes: marker.className,
        src: marker.src || null,
        alt: marker.alt || null
      });
    });

    // 查找弹出窗口
    document.querySelectorAll(".leaflet-popup").forEach((popup) => {
      result.popups.push({
        classes: popup.className,
        content: popup.textContent.substring(0, 100)
      });
    });

    // 查找控制按钮
    document.querySelectorAll(".leaflet-control").forEach((control) => {
      result.controls.push({
        classes: control.className
      });
    });

    return result;
  });

  console.log(JSON.stringify(markersInfo, null, 2));

  console.log("\n=== UI 组件分析 ===");
  const uiComponents = await page.evaluate(() => {
    const result = {
      searchBox: null,
      sidebar: null,
      filters: [],
      buttons: []
    };

    // 查找搜索框
    const searchInput = document.querySelector('input[type="search"], input[type="text"]');
    if (searchInput) {
      result.searchBox = {
        placeholder: searchInput.placeholder,
        classes: searchInput.className
      };
    }

    // 查找侧边栏
    const sidebar = document.querySelector(".sidebar, aside, [class*='side']");
    if (sidebar) {
      result.sidebar = {
        classes: sidebar.className,
        visible: window.getComputedStyle(sidebar).display !== "none"
      };
    }

    // 查找所有按钮
    document.querySelectorAll("button").forEach((btn) => {
      result.buttons.push({
        text: btn.textContent.trim().substring(0, 50),
        classes: btn.className
      });
    });

    return result;
  });

  console.log(JSON.stringify(uiComponents, null, 2));

  console.log("\n=== 网络请求分析 ===");
  const requests = [];
  page.on("request", (request) => {
    requests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });

  // 重新加载以捕获请求
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const apiRequests = requests.filter(
    (r) => r.resourceType === "xhr" || r.resourceType === "fetch"
  );
  console.log("\nAPI 请求:");
  apiRequests.forEach((req) => {
    console.log(`${req.method} ${req.url}`);
  });

  const imageRequests = requests.filter((r) => r.resourceType === "image");
  console.log(`\n图片请求数量: ${imageRequests.length}`);

  console.log("\n=== 截图保存 ===");
  await page.screenshot({
    path: "design/wikimap-screenshot.png",
    fullPage: true
  });
  console.log("截图已保存到 design/wikimap-screenshot.png");

  // 保存完整的 DOM 结构
  const html = await page.content();
  fs.writeFileSync("design/wikimap-dom.html", html, "utf8");
  console.log("DOM 结构已保存到 design/wikimap-dom.html");

  console.log("\n分析完成！按任意键关闭浏览器...");
  await page.waitForTimeout(5000);

  await browser.close();
}

analyzeWebsite().catch((error) => {
  console.error("分析失败:", error);
  process.exitCode = 1;
});
