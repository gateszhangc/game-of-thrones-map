#!/usr/bin/env node

// 精确的sitemap校验脚本
const fs = require('fs');
const path = require('path');

console.log('=== Game of Thrones Map - 精确sitemap校验 ===\n');

function findPageFiles(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    const pages = [];
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        
        if (fs.statSync(fullPath).isDirectory()) {
            const subPages = findPageFiles(fullPath, relativePath);
            pages.push(...subPages);
        } else if (item === 'page.tsx') {
            let route = relativePath.replace(/\\/g, '/').replace('/page.tsx', '');
            if (route === 'app') {
                route = '/';
            }
            pages.push({
                route: route.startsWith('/') ? route : '/' + route,
                file: fullPath,
                displayName: route === '/' ? '主页' : route
            });
        }
    }
    
    return pages;
}

// 1. 获取所有实际页面文件
console.log('1. 扫描所有实际页面文件...');
const allPages = findPageFiles(path.join(__dirname, '..', 'app'));
console.log(`找到 ${allPages.length} 个页面文件:`);
allPages.forEach(page => {
    console.log(`  ✅ ${page.displayName} (${page.route})`);
});

// 2. 获取sitemap中实际返回的URL
console.log('\n2. 分析sitemap.ts中实际返回的页面...');
const sitemapPath = path.join(__dirname, '../app/sitemap.ts');
if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // 解析返回的URL
    const actualSitemapUrls = [];
    
    // 提取所有url配置
    const urlLines = sitemapContent.split('\n');
    for (const line of urlLines) {
        const trimmedLine = line.trim();
        
        // 匹配 url: SITE_URL (根路径)
        if (trimmedLine === 'url: SITE_URL,') {
            actualSitemapUrls.push('/');
        }
        
        // 匹配 url: `${SITE_URL}/...` 格式
        if (trimmedLine.startsWith('url: `${SITE_URL}/')) {
            // 提取模板字符串内容
            const match = trimmedLine.match(/url:\s*`\$\{SITE_URL\}([^`]+)`/);
            if (match && match[1]) {
                actualSitemapUrls.push(match[1]);
            }
        }
    }
    
    // 调试信息
    console.log('调试信息 - 扫描的行:');
    urlLines.forEach((line, i) => {
        if (line.trim().includes('url:')) {
            console.log(`  ${i+1}: ${line.trim()}`);
        }
    });
    
    console.log('Sitemap中实际包含的页面:');
    actualSitemapUrls.forEach(url => {
        console.log(`  📍 ${url || '(根路径)'}`);
    });
    
    console.log('\n3. 精确校验结果:');
    
    // 特殊处理：检查重定向页面
    const redirectPages = ['/houses-simple'];
    const ignoredPages = new Set();
    
    allPages.forEach(page => {
        if (redirectPages.includes(page.route)) {
            const fileContent = fs.readFileSync(page.file, 'utf8');
            if (fileContent.includes('index: false') || fileContent.includes('redirect')) {
                ignoredPages.add(page.route);
                console.log(`  ⏭️  跳过: ${page.route} (重定向页面，不应索引)`);
            }
        }
    });
    
    // 找出需要被索引的页面
    const indexablePages = allPages.filter(page => !ignoredPages.has(page.route));
    
    const missingInSitemap = [];
    const extraInSitemap = [];
    
    // 检查sitemap中缺少的页面
    indexablePages.forEach(page => {
        if (page.route === '/') {
            if (!actualSitemapUrls.includes('') && !actualSitemapUrls.includes('/')) {
                missingInSitemap.push('主页 (/)');
            }
        } else {
            if (!actualSitemapUrls.includes(page.route)) {
                missingInSitemap.push(page.route);
            }
        }
    });
    
    // 检查sitemap中多余的页面
    actualSitemapUrls.forEach(sitemapUrl => {
        if (sitemapUrl === '' || sitemapUrl === '/') {
            // 主页存在
        } else if (!indexablePages.some(page => page.route === sitemapUrl)) {
            extraInSitemap.push(sitemapUrl);
        }
    });
    
    // 报告结果
    if (missingInSitemap.length === 0 && extraInSitemap.length === 0) {
        console.log('🎉 完美匹配！sitemap与实际页面文件完全一致');
    } else {
        if (missingInSitemap.length > 0) {
            console.log('❌ sitemap中缺少的页面:');
            missingInSitemap.forEach(page => {
                console.log(`   - ${page}`);
            });
        }
        
        if (extraInSitemap.length > 0) {
            console.log('⚠️  sitemap中多余的页面:');
            extraInSitemap.forEach(page => {
                console.log(`   - ${page}`);
            });
        }
    }
    
    console.log('\n4. 最终状态总结:');
    console.log(`  - 实际页面文件: ${allPages.length} 个`);
    console.log(`  - 需要索引的页面: ${indexablePages.length} 个`);
    console.log(`  - sitemap包含页面: ${actualSitemapUrls.length} 个`);
    console.log(`  - 被忽略的重定向页面: ${ignoredPages.size} 个`);
    
    if (missingInSitemap.length === 0 && extraInSitemap.length === 0) {
        console.log('  ✅ 状态: 完全正确');
    } else {
        console.log('  ❌ 状态: 需要调整');
    }
    
} else {
    console.log('❌ sitemap.ts 文件不存在');
}

console.log('\n=== 校验完成 ===');