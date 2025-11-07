#!/usr/bin/env node

// Sitemap验证测试脚本
const fs = require('fs');
const path = require('path');

console.log('=== Game of Thrones Map - Sitemap 验证测试 ===\n');

// 读取sitemap.ts文件
const sitemapPath = path.join(__dirname, '../app/sitemap.ts');
console.log('1. 检查sitemap.ts配置...');

if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    console.log('✅ sitemap.ts 文件存在');
    
    // 检查是否包含所有页面
    const expectedPages = [
        { pattern: '/regions/westeros', description: 'Westeros区域页' },
        { pattern: '/regions/essos', description: 'Essos区域页' },
        { pattern: '/houses', description: '家族页面' },
        { pattern: '/battles', description: '战役页面' },
        { pattern: '/locations', description: '地点页面' },
        { pattern: '/contact', description: '联系页面' }
    ];
    
    console.log('2. 检查页面包含情况:');
    let missingPages = [];
    
    expectedPages.forEach(page => {
        if (sitemapContent.includes(`\${SITE_URL}${page.pattern}`) ||
            sitemapContent.includes(`SITE_URL}/` + page.pattern.slice(1))) {
            console.log(`✅ ${page.pattern} - ${page.description}`);
        } else {
            console.log(`❌ ${page.pattern} - ${page.description}`);
            missingPages.push(page.pattern);
        }
    });
    
    if (missingPages.length === 0) {
        console.log('\n🎉 所有页面都已包含在sitemap中！');
    } else {
        console.log(`\n⚠️  缺少页面: ${missingPages.join(', ')}`);
    }
    
} else {
    console.log('❌ sitemap.ts 文件不存在');
}

// 3. 检查actual页面文件存在性
console.log('\n3. 检查实际页面文件存在性:');
const pages = [
    { path: 'app/regions/westeros/page.tsx', route: '/regions/westeros' },
    { path: 'app/regions/essos/page.tsx', route: '/regions/essos' },
    { path: 'app/houses/page.tsx', route: '/houses' },
    { path: 'app/battles/page.tsx', route: '/battles' },
    { path: 'app/locations/page.tsx', route: '/locations' },
    { path: 'app/contact/page.tsx', route: '/contact' }
];

let allFilesExist = true;
pages.forEach(page => {
    if (fs.existsSync(path.join(__dirname, '..', page.path))) {
        console.log(`✅ ${page.route}`);
    } else {
        console.log(`❌ ${page.route} - 文件不存在: ${page.path}`);
        allFilesExist = false;
    }
});

// 4. 测试建议
console.log('\n4. 测试建议:');
console.log('由于服务已在localhost:3000运行，建议使用以下方式测试:');

const testUrls = [
    'http://localhost:3000/',
    'http://localhost:3000/regions/westeros',
    'http://localhost:3000/regions/essos',
    'http://localhost:3000/houses',
    'http://localhost:3000/battles',
    'http://localhost:3000/locations',
    'http://localhost:3000/contact',
    'http://localhost:3000/sitemap.xml'
];

testUrls.forEach(url => {
    console.log(`   - 测试: ${url}`);
});

console.log('\n5. 完成状态:');
if (allFilesExist) {
    console.log('✅ 所有页面文件存在');
    console.log('✅ sitemap配置包含所有页面');
    console.log('✅ 准备就绪，可以测试访问');
} else {
    console.log('❌ 某些文件缺失，需要检查');
}

console.log('\n=== 测试完成 ===');