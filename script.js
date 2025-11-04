// 权力的游戏地图交互脚本
class GameOfThronesMap {
    constructor() {
        this.map = document.getElementById('got-map');
        this.infoPanel = document.getElementById('location-info');
        this.zoomLevel = 1;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.currentCity = null;

        this.locations = {
            '临冬城': {
                description: '史塔克家族的祖传城堡，北境的首府。',
                house: '史塔克家族',
                words: '凛冬将至',
                founded: '先民时代',
                ruler: '瑞肯·史塔克',
                population: '约500,000',
                culture: '北境文化',
                religion: '旧神'
            },
            '君临城': {
                description: '七大王国的首都，铁王座的所在地。',
                house: '坦格利安家族（历史上）',
                words: '血火同源',
                founded: '征服战争时期',
                ruler: '国王委员会',
                population: '约500,000',
                culture: '安达尔文化',
                religion: '七神信仰'
            },
            '凯岩城': {
                description: '兰尼斯特家族的城堡，西境的首府，建立在巨大的岩石之上。',
                house: '兰尼斯特家族',
                words: '听我怒吼',
                founded: '英雄纪元',
                ruler: '瑟曦·兰尼斯特',
                population: '约300,000',
                culture: '西境文化',
                religion: '七神信仰'
            },
            '风息堡': {
                description: '拜拉席恩家族的城堡，风暴地的首府。',
                house: '拜拉席恩家族',
                words: '怒火燎原',
                founded: '征服战争时期',
                ruler: '史坦尼斯·拜拉席恩',
                population: '约200,000',
                culture: '风暴地文化',
                religion: '七神信仰'
            },
            '阳戟城': {
                description: '马泰尔家族的城堡，多恩的首府。',
                house: '马泰尔家族',
                words: '不屈不挠',
                founded: '先民时代',
                ruler: '亚莲恩·马泰尔',
                population: '约150,000',
                culture: '多恩文化',
                religion: '七神信仰'
            },
            '长城': {
                description: '由传说中的人物建造的巨大冰墙，保护维斯特洛大陆免受异鬼威胁。',
                house: '守夜人',
                words: '今夜我为王',
                founded: '8000年前',
                ruler: '总司令',
                population: '守夜人军团',
                culture: '守夜人文化',
                religion: '旧神'
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCityMarkers();
        this.setupControls();
        this.setupTooltip();
    }

    setupEventListeners() {
        // 城市标记点击事件
        document.querySelectorAll('.city-marker').forEach(marker => {
            marker.addEventListener('click', (e) => this.handleCityClick(e));
            marker.addEventListener('mouseenter', (e) => this.handleCityHover(e));
            marker.addEventListener('mouseleave', (e) => this.handleCityLeave(e));
        });

        // 地图拖拽功能
        this.map.addEventListener('mousedown', (e) => this.startDrag(e));
        this.map.addEventListener('mousemove', (e) => this.drag(e));
        this.map.addEventListener('mouseup', () => this.endDrag());
        this.map.addEventListener('mouseleave', () => this.endDrag());

        // 滚轮缩放
        this.map.addEventListener('wheel', (e) => this.handleWheel(e));
    }

    setupCityMarkers() {
        // 添加脉冲动画效果
        document.querySelectorAll('.city-marker circle').forEach(circle => {
            circle.addEventListener('animationend', () => {
                circle.style.animation = '';
            });
        });
    }

    setupControls() {
        // 缩放控制
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(0.1));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(-0.1));
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());

        // 地区筛选
        document.getElementById('region-filter').addEventListener('change', (e) => {
            this.filterByRegion(e.target.value);
        });
    }

    setupTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        document.body.appendChild(this.tooltip);
    }

    handleCityClick(e) {
        const marker = e.currentTarget;
        const cityName = marker.dataset.city;

        // 移除之前的活动状态
        document.querySelectorAll('.city-marker').forEach(m => m.classList.remove('active'));

        // 添加当前活动状态
        marker.classList.add('active');

        this.currentCity = cityName;
        this.displayCityInfo(cityName);
    }

    handleCityHover(e) {
        const marker = e.currentTarget;
        const cityName = marker.dataset.city;
        const info = marker.dataset.info;

        this.tooltip.textContent = cityName;
        this.tooltip.classList.add('show');

        // 跟随鼠标位置
        document.addEventListener('mousemove', this.updateTooltipPosition);
    }

    handleCityLeave(e) {
        this.tooltip.classList.remove('show');
        document.removeEventListener('mousemove', this.updateTooltipPosition);
    }

    updateTooltipPosition = (e) => {
        this.tooltip.style.left = e.clientX + 10 + 'px';
        this.tooltip.style.top = e.clientY - 30 + 'px';
    }

    displayCityInfo(cityName) {
        const location = this.locations[cityName];
        if (!location) return;

        const infoHTML = `
            <h4>${cityName}</h4>
            <p><strong>描述：</strong>${location.description}</p>
            <p><strong>统治家族：</strong>${location.house}</p>
            <p><strong>家族箴言：</strong>${location.words}</p>
            <p><strong>建立时间：</strong>${location.founded}</p>
            <p><strong>统治者：</strong>${location.ruler}</p>
            <p><strong>人口：</strong>${location.population}</p>
            <p><strong>文化：</strong>${location.culture}</p>
            <p><strong>宗教：</strong>${location.religion}</p>
        `;

        this.infoPanel.innerHTML = infoHTML;
        this.infoPanel.style.opacity = '0';

        // 添加淡入效果
        setTimeout(() => {
            this.infoPanel.style.transition = 'opacity 0.5s ease';
            this.infoPanel.style.opacity = '1';
        }, 100);
    }

    startDrag(e) {
        if (e.target.classList.contains('city-marker') || e.target.parentElement.classList.contains('city-marker')) {
            return;
        }

        this.isDragging = true;
        this.startX = e.clientX - this.translateX;
        this.startY = e.clientY - this.translateY;
        this.map.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;

        e.preventDefault();
        this.translateX = e.clientX - this.startX;
        this.translateY = e.clientY - this.startY;
        this.updateTransform();
    }

    endDrag() {
        this.isDragging = false;
        this.map.style.cursor = 'grab';
    }

    handleWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        this.zoom(delta);
    }

    zoom(delta) {
        const newZoom = Math.max(0.5, Math.min(3, this.zoomLevel + delta));
        if (newZoom !== this.zoomLevel) {
            this.zoomLevel = newZoom;
            this.updateTransform();
        }
    }

    updateTransform() {
        this.map.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.zoomLevel})`;
    }

    resetView() {
        this.zoomLevel = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();

        // 移除所有活动状态
        document.querySelectorAll('.city-marker').forEach(m => m.classList.remove('active'));

        // 重置信息面板
        this.infoPanel.innerHTML = '<p>点击地图上的标记查看详细信息</p>';
        this.currentCity = null;
    }

    filterByRegion(region) {
        const allMarkers = document.querySelectorAll('.city-marker');

        if (region === 'all') {
            allMarkers.forEach(marker => {
                marker.style.display = 'block';
                marker.style.opacity = '1';
            });
            return;
        }

        // 地区映射
        const regionCities = {
            'north': ['临冬城', '长城'],
            'riverlands': [],
            'west': ['凯岩城'],
            'storm': ['风息堡'],
            'dorne': ['阳戟城']
        };

        const citiesToShow = regionCities[region] || [];

        allMarkers.forEach(marker => {
            const cityName = marker.dataset.city;
            if (citiesToShow.includes(cityName)) {
                marker.style.display = 'block';
                marker.style.opacity = '1';
            } else {
                marker.style.opacity = '0.3';
            }
        });
    }
}

// 页面加载完成后初始化地图
document.addEventListener('DOMContentLoaded', () => {
    const gotMap = new GameOfThronesMap();

    // 添加加载完成动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 添加键盘控制
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case '+':
            case '=':
                document.getElementById('zoom-in').click();
                break;
            case '-':
            case '_':
                document.getElementById('zoom-out').click();
                break;
            case 'r':
            case 'R':
                document.getElementById('reset-view').click();
                break;
        }
    });

    // 添加触摸支持（移动设备）
    let touchStartDistance = 0;

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            touchStartDistance = Math.sqrt(dx * dx + dy * dy);
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const scale = distance / touchStartDistance;
            gotMap.zoom((scale - 1) * 0.1);
            touchStartDistance = distance;
        }
    });
});

// 窗口大小调整时重新计算
window.addEventListener('resize', () => {
    // 可以在这里添加响应式调整逻辑
});