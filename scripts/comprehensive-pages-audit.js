#!/usr/bin/env node

// 全面页面完整性校验脚本
const fs = require('fs');
const path = require('path');

console.log('=== Game of Thrones Map - 页面完整性校验 ===\n');

// 1. 扫描所有实际的页面文件
console.log('1. 扫描所有实际页面文件...');
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
            // 计算路由路径
            let route = relativePath.replace(/\\/g, '/').replace('/page.tsx', '');
            if (route === 'app') {
                route = '/'; // 根页面
            }
            pages.push({
                file: fullPath,
                route: route.startsWith('/') ? route : '/' + route,
                displayName: route === '/' ? '首页' : route
            });
        }
    }
    
    return pages;
}

const allPages = findPageFiles(path.join(__dirname, '..', 'app'));
console.log(`找到 ${allPages.length} 个页面文件:`);
allPages.forEach(page => {
    console.log(`  ✅ ${page.displayName} (${page.route}) - ${page.file.replace(__dirname + path.sep, '')}`);
});

console.log('\n2. 检查sitemap.ts配置...');
const sitemapPath = path.join(__dirname, '../app/sitemap.ts');
if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // 提取sitemap中的所有URL
    const urlMatches = sitemapContent.match(/url:\s*`?\${SITE_URL}([^`"]+)`?/g);
    const sitemapUrls = [];
    if (urlMatches) {
        urlMatches.forEach(match => {
            const url = match.replace(/url:\s*`?\${SITE_URL}/, '').replace(/`?$/, '');
            if (url && url !== '') {
                sitemapUrls.push(url);
            }
        });
    }
    
    console.log('Sitemap中配置的页面:');
    sitemapUrls.forEach(url => {
        console.log(`  📍 ${url}`);
    });
    
    console.log('\n3. 校验结果:');
    
    // 检查缺失的页面
    const actualRoutes = allPages.map(p => p.route);
    const missingInSitemap = [];
    const extraInSitemap = [];
    
    actualRoutes.forEach(route => {
        if (route === '/') {
            // 首页在sitemap中可能表示为空字符串
            if (!sitemapUrls.includes('') && !sitemapUrls.includes('/')) {
                missingInSitemap.push('首页 (/)');
            }
        } else {
            if (!sitemapUrls.includes(route)) {
                missingInSitemap.push(route);
            }
        }
    });
    
    // 检查sitemap中多余的页面
    sitemapUrls.forEach(sitemapUrl => {
        if (sitemapUrl === '' || sitemapUrl === '/') {
            // 首页
        } else if (!actualRoutes.includes(sitemapUrl)) {
            extraInSitemap.push(sitemapUrl);
        }
    });
    
    // 报告结果
    if (missingInSitemap.length === 0 && extraInSitemap.length === 0) {
        console.log('🎉 完美匹配！sitemap包含了所有现有页面，没有多余页面');
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
    
    console.log('\n4. 建议的sitemap配置:');
    console.log('如果需要更新sitemap.ts，应该包含以下页面:');
    allPages.forEach(page => {
        if (page.route === '/') {
            console.log('  主页: SITE_URL');
        } else {
            console.log(`  ${page.route}: \${SITE_URL}${page.route}`);
        }
    });
    
} else {
    console.log('❌ sitemap.ts 文件不存在');
}

console.log('\n=== 校验完成 ===');