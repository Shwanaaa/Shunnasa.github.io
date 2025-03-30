// 在type.js顶部添加
const chartManager = {
    currentChart: null,
    initSunburstChart: function(operaType, data) {
        const chartDom = document.getElementById('chart01');
        if (this.currentChart) {
            this.currentChart.dispose();
        }
        this.currentChart = echarts.init(chartDom);
        
        const option = {
            title: {
                text: `${operaType}流派层次结构`,
                subtext: `数据来源：${operaType}流派分类`,
                left: 'center',
                textStyle: {
                    fontSize: 18,
                    color: '#c33'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>权重值: {c}'
            },
            series: {
                type: 'sunburst',
                data: data.children,  // 使用传入的数据
                radius: [0, '90%'],
                label: {
                    rotate: 'radial',
                    color: '#333',
                    fontSize: 18
                },
                levels: [
                    {}, // 第0层（通常为根节点，无需调整）
                    {
                        r0: '10%',  // 缩小内半径，扩大第一层
                        r: '40%',    // 扩大外半径
                        itemStyle: {
                            borderWidth: 2
                        },
                        label: {
                            rotate: 'tangential'
                        }
                    },
                    {
                        r0: '40%',  // 与上一层的 r 对齐
                        r: '80%',   // 大幅扩大外半径
                        label: {
                            align: 'right'
                        }
                    },
                    {
                        r0: '80%',   // 与上一层的 r 对齐
                        r: '85%',    // 接近容器边缘（避免溢出）
                        label: {
                            position: 'outside',
                            padding: 3,
                            silent: false
                        },
                        itemStyle: {
                            borderWidth: 3
                        }
                    }
                ],
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center'
            }     
        };
        
        this.currentChart.setOption(option);
        
        window.addEventListener('resize', () => {
            this.currentChart.resize();
        });
    }
};

const typedata = {
    1: {
        title: "京剧",
        image: "./images/1.jpg",
        introduction: "通过以上步骤排查和解决问题后，地图应该能够正常显示。如果问题仍然存在，可以提供更多的错误信息（如浏览器控制台的错误日志），我可以进一步帮助你分析问题。",
        timeline: [
            { year: "18世纪末", top: "徽商推动戏曲繁荣，徽班随商帮崛起。1790年，徽商江春组织“三庆班”为乾隆祝寿进京，融合昆曲、秦腔等声腔，开启徽班称霸京城舞台的时代，四大徽班（三庆、四喜、和春、春台）形成“徽班进京”盛况。", bottom: "" },
            { year: "2018", top: "", bottom: "徽班与秦腔（徽秦合流）、汉调（徽汉合流）深度融合，吸纳西皮、二黄等声腔，兼容武戏、文戏，奠定京剧声腔基础。程长庚、余三胜等艺人推动语言京化，形成“皮黄戏”雏形。" },
            { year: "18世纪末", top: "", bottom: "" },
            { year: "2018", top: "", bottom: "" },
    
        ],
        music: {
            intro: "京剧乐器主要有京胡、月琴、三弦等...",
            images: ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg", "./images/3.jpg", "./images/4.jpg"]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/jingju/horsewhip.jpg"
            },
            {
                name: "水袖",
                desc: "白色绸制，长度可达2米，通过甩袖表达情感",
                image: "./images/tools/jingju/water-sleeves.jpg"
            },
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马象征战马，",
                image: "./images/1.jpg"
            },
            {
                name: "水袖",
                desc: "白色绸制，长度可达2米，通过甩袖表达情感",
                image: "./images/1.jpg"
            },
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/jingju/horsewhip.jpg"
            },
            {
                name: "水袖",
                desc: "白色绸制，长度可达2米，通过甩袖表达情感",
                image: "./images/tools/jingju/water-sleeves.jpg"
            },
            // 其他京剧道具...
        ],
        operas: [
            { 
                title: "霸王别姬", 
                image: "./images/operas/jingju/bawangbieji.jpg",
                year: "1922年",
                description: "讲述西楚霸王项羽与爱妃虞姬的生死离别故事"
            },
            {
                title: "贵妃醉酒",
                image: "./images/2.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            { 
                title: "霸王别姬", 
                image: "./images/operas/jingju/bawangbieji.jpg",
                year: "1922年",
                description: "讲述西楚霸王项羽与爱妃虞姬的生死离别故事"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            // 添加更多京剧剧目...
        ]
    },
    2: {
        title: "越剧",
        image: "./images/1.jpg",
        introduction: "中国，以华夏文明为源泉、中华文化为基础，是世界上历史最悠久的国家之一。中国各族人民共同创造了光辉灿烂的文化，具有光荣的革命传统。中国是以汉族为主体民族的多民族国家，通用汉语、汉字，汉族与少数民族统称为“中华民族”，自称“炎黄子孙”、“龙的传人”。",
        timeline: [
            { year: "2017", top: "Hazy I do not know what to do...", bottom: "" },
            { year: "2018", top: "", bottom: "I gradually became addicted..." },
            // 添加更多年份数据
        ],
        music: {
            intro: "京剧乐器主要有京胡、月琴、三弦等...",
            images: ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg"]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/jingju/horsewhip.jpg"
            },
            {
                name: "水袖",
                desc: "白色绸制，长度可达2米，通过甩袖表达情感",
                image: "./images/tools/jingju/water-sleeves.jpg"
            },
            // 其他京剧道具...
        ],
        operas: [
            { 
                title: "霸王别姬", 
                image: "./images/operas/jingju/bawangbieji.jpg",
                year: "1922年",
                description: "讲述西楚霸王项羽与爱妃虞姬的生死离别故事"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            {
                title: "贵妃醉酒",
                image: "./images/4.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            // 添加更多京剧剧目...
        ]
    },
    3: {
        title: "黄梅戏",
        image: "./images/1.jpg",
        introduction: "通过以上步骤排查和解决问题后，地图应该能够正常显示。如果问题仍然存在，可以提供更多的错误信息（如浏览器控制台的错误日志），我可以进一步帮助你分析问题。",
        timeline: [
            { year: "2017", top: "Hazy I do not know what to do...", bottom: "" },
            { year: "2018", top: "", bottom: "I gradually became addicted..." },
            // 添加更多年份数据
        ],
        music: {
            intro: "京剧乐器主要有京胡、月琴、三弦等...",
            images: ["./images/4.jpg", "./images/2.jpg", "./images/3.jpg"]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/jingju/horsewhip.jpg"
            },
            {
                name: "水袖",
                desc: "白色绸制，长度可达2米，通过甩袖表达情感",
                image: "./images/tools/jingju/water-sleeves.jpg"
            },
            // 其他京剧道具...
        ],
        operas: [
            { 
                title: "霸王别姬", 
                image: "./images/operas/jingju/bawangbieji.jpg",
                year: "1922年",
                description: "讲述西楚霸王项羽与爱妃虞姬的生死离别故事"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            // 添加更多京剧剧目...
        ]
    },
    4: {
        title: "评剧",
        image: "./images/1.jpg",
        introduction: "通过以上步骤排查和解决问题后，地图应该能够正常显示。如果问题仍然存在，可以提供更多的错误信息（如浏览器控制台的错误日志），我可以进一步帮助你分析问题。",
        timeline: [
            { year: "2017", top: "Hazy I do not know what to do...", bottom: "" },
            { year: "2018", top: "", bottom: "I gradually became addicted..." },
            // 添加更多年份数据
        ],
        music: {
            intro: "京剧乐器主要有京胡、月琴、三弦等...",
            images: ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg"]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/jingju/horsewhip.jpg"
            },
            {
                name: "水袖",
                desc: "白色绸制，长度可达2米，通过甩袖表达情感",
                image: "./images/tools/jingju/water-sleeves.jpg"
            },
            // 其他京剧道具...
        ],
        operas: [
            { 
                title: "霸王别姬", 
                image: "./images/operas/jingju/bawangbieji.jpg",
                year: "1922年",
                description: "讲述西楚霸王项羽与爱妃虞姬的生死离别故事"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            // 添加更多京剧剧目...
        ]
    },
    5: {
        title: "豫剧",
        image: "./images/1.jpg",
        introduction: "通过以上步骤排查和解决问题后，地图应该能够正常显示。如果问题仍然存在，可以提供更多的错误信息（如浏览器控制台的错误日志），我可以进一步帮助你分析问题。",
        timeline: [
            { year: "2017", top: "Hazy I do not know what to do...", bottom: "" },
            { year: "2018", top: "", bottom: "I gradually became addicted..." },
            { year: "2017", top: "Hazy I do not know what to do...", bottom: "" },
            { year: "2018", top: "", bottom: "I gradually became addicted..." },
            // 添加更多年份数据
        ],
        music: {
            intro: "京剧乐器主要有京胡、月琴、三弦等...",
            images: ["./images/4.jpg", "./images/2.jpg", "./images/3.jpg"]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/jingju/horsewhip.jpg"
            },
            {
                name: "水袖",
                desc: "白色绸制，长度可达2米，通过甩袖表达情感",
                image: "./images/tools/jingju/water-sleeves.jpg"
            },
            // 其他京剧道具...
        ],
        operas: [
            { 
                title: "霸王别姬", 
                image: "./images/operas/jingju/bawangbieji.jpg",
                year: "1922年",
                description: "讲述西楚霸王项羽与爱妃虞姬的生死离别故事"
            },
            {
                title: "贵妃醉酒",
                image: "./images/operas/jingju/guifeizuijiu.jpg",
                year: "1956年",
                description: "表现杨贵妃酒醉后的妩媚与哀怨"
            },
            // 添加更多京剧剧目...
        ]
    }
};

function updateTitleAndImage(index) {
    var detailTitle = document.getElementById('detail-title');
    var originImage = document.getElementById('origin-image');

    detailTitle.textContent = typedata[index].title;

    if (originImage) {
        originImage.src = typedata[index].image;
        originImage.alt = typedata[index].title;
    }
}

function updateIntroduction(index) {
    var intro = document.getElementById('brief-intro');

    intro.textContent = typedata[index].introduction;
}

//发展概要更新
function updateTimeline(index) {
    const timelineItems = typedata[index].timeline;
    const timelineContainer = document.querySelector('.develop');
    timelineContainer.innerHTML = ''; // 清空现有内容

    timelineItems.forEach(item => {
        const boxx = document.createElement('div');
        boxx.className = 'boxx';
        boxx.innerHTML = `
            <div class="top">${item.top}</div>
            <div class="center"><span>${item.year}</span></div>
            <div class="bottom">${item.bottom}</div>
        `;
        timelineContainer.appendChild(boxx);
    });
}

//音乐器具轮播图更新
function renderSlider(images) {
    const slider = document.getElementById('music-slider');
    
    slider.innerHTML = `
        <div class="slides">
            ${images.map((_, i) => `
                <input type="radio" name="r" id="r${i+1}" ${i === 0 ? 'checked' : ''}>
            `).join('')}
            ${images.map((img, i) => `
                <div class="slide${i === 0 ? ' s1' : ''}">
                    <img src="${img}" alt="乐器图片 ${i+1}">
                </div>
            `).join('')}
        </div>
        <div class="navigation">
            ${images.map((_, i) => `
                <label for="r${i+1}" class="bar"></label>
            `).join('')}
        </div>
    `;
}

function updateMusicintro(index) {
    var intro = document.getElementById('music-introduction');

    intro.textContent = typedata[index].music.intro;
}

function updateTools(index) {
    const toolsContainer = document.querySelector('.tool');
    const toolsData = typedata[index].tools;
    
    toolsContainer.innerHTML = `
        <h2 class="tools-title">${typedata[index].title}舞台道具</h2>
        <div class="tools-gallery">
            ${toolsData.map(tool => `
                <div class="tool-card">
                    <img src="${tool.image}" alt="${tool.name}" class="tool-image">
                    <div class="tool-info">
                        <h3>${tool.name}</h3>
                        <p>${tool.desc}</p>
                    </div>
                </div>
            `).join('')}
            <!-- 添加一些空白卡片确保内容足够长 -->
            ${Array(3).fill().map((_,i) => `
                <div class="tool-card placeholder">
                    <div class="tool-image placeholder"></div>
                    <div class="tool-info">
                        <h3>更多道具</h3>
                        <p>敬请期待</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showDetail(index) {
    // 更新详细介绍中的标题和图片
    updateTitleAndImage(index);

    //更新简要介绍
    updateIntroduction(index);

    // 更新时间线
    updateTimeline(index);
    
    // 更新音乐器具轮播图
    renderSlider(typedata[index].music.images);
    //更新音乐器具介绍
    updateMusicintro(index);

    // 更新流派旭日图
    loadChartScript(index);

    //更新舞台道具
    updateTools(index);

    // 更新剧目滚动区域
    currentIndex = index;
    updateOperasScroll(index);

}

// 动态加载对应剧种的图表JS文件
// 确保只有一个 loadChartScript 函数定义
function loadChartScript(index) {
    const operaType = typedata[index].title;
    const scriptMap = {
        "京剧": "type-jingchart.js",
        "越剧": "type-yuechart.js",
        "黄梅戏": "type-huangchart.js",
        "评剧": "type-pingchart.js",
        "豫剧": "type-yuchart.js"
    };
    
    // 移除之前加载的图表脚本
    const oldScript = document.querySelector('script[data-chart-script]');
    if (oldScript) {
        oldScript.remove();
    }
    
    // 创建新的脚本元素
    const script = document.createElement('script');
    script.src = `./js/${scriptMap[operaType]}`;
    script.setAttribute('data-chart-script', 'true');
    
    script.onload = function() {
        // 调试日志 - 确认脚本加载完成
        console.log(`${operaType}图表脚本加载完成`);
        
        // 获取对应剧种的数据
        let chartData;
        switch(operaType) {
            case "京剧":
                chartData = window.jingData;
                break;
            case "越剧":
                chartData = window.yueData;
                break;
            case "黄梅戏":
                chartData = window.huangData;
                break;
            case "评剧":
                chartData = window.pingData;
                break;
            case "豫剧":
                chartData = window.yuData;
                break;
            // 添加其他剧种的case
            default:
                chartData = {
                    name: `${operaType}流派`,
                    children: [{name: "暂无数据", value: 1}]
                };
        }
        
        // 调试日志 - 确认获取到数据
        console.log('获取到的图表数据:', chartData);
        
        // 初始化图表
        if (chartData) {
            chartManager.initSunburstChart(operaType, chartData);
        } else {
            console.error('未能获取图表数据');
        }
    };
    
    script.onerror = function() {
        console.error(`加载${operaType}图表脚本失败`);
    };
    
    document.body.appendChild(script);
}

// 修改updateOperasScroll函数
function updateOperasScroll(index) {
    const operasData = typedata[index].operas;
    const scrollContent = document.getElementById('scrollContent');
    
    // 清空现有内容
    scrollContent.innerHTML = '';
    
    // 生成三组相同的剧目元素实现更流畅的循环
    const createItems = () => {
        operasData.forEach(opera => {
            const operaItem = document.createElement('div');
            operaItem.className = 'scroll-item';
            operaItem.innerHTML = `
                <img src="${opera.image}" alt="${opera.title}">
                <div class="opera-info">
                    <h3>${opera.title}</h3>
                    <p>${opera.year}</p>
                    <p>${opera.description}</p>
                </div>
            `;
            scrollContent.appendChild(operaItem);
        });
    };
    
    // 创建三组相同的剧目
    createItems();
    createItems();
    createItems();
    
    // 初始化滚动动画
    initOperaScroll();
}

// 修改initOperaScroll函数
let scrollAnimation = null;
let scrollSpeed = 1;
let scrollPos = 0;

function initOperaScroll() {
    const scrollContent = document.getElementById('scrollContent');
    const scrollContainer = document.getElementById('scrollContainer');
    
    // 停止之前的动画
    if (scrollAnimation) {
        cancelAnimationFrame(scrollAnimation);
    }
    
    // 计算单个剧目宽度（包括间距）
    const itemWidth = 220; // 与CSS中.scroll-item的宽度一致
    const gap = 25; // 与CSS中的gap一致
    const itemTotalWidth = itemWidth + gap;
    
    // 获取当前剧种的剧目数量
    const operaCount = typedata[currentIndex].operas.length;
    // 一组剧目的总宽度
    const groupWidth = operaCount * itemTotalWidth;
    
    // 重置滚动位置到中间组
    scrollPos = groupWidth;
    scrollContent.style.transform = `translateX(-${scrollPos}px)`;
    
    function scroll() {
        scrollPos += scrollSpeed;
        
        // 当滚动到第二组末尾时，无缝跳回第一组
        if (scrollPos >= 2 * groupWidth) {
            scrollPos = groupWidth;
            // 立即应用重置，避免视觉跳跃
            scrollContent.style.transition = 'none';
            scrollContent.style.transform = `translateX(-${scrollPos}px)`;
            // 强制重绘
            void scrollContent.offsetWidth;
            // 恢复过渡效果
            scrollContent.style.transition = 'transform 0.5s ease-out';
        }
        
        scrollContent.style.transform = `translateX(-${scrollPos}px)`;
        scrollAnimation = requestAnimationFrame(scroll);
    }
    
    // 开始滚动
    scroll();
    
    // 悬停控制
    scrollContent.addEventListener('mouseenter', () => {
        scrollSpeed = 0.2;
    });
    
    scrollContent.addEventListener('mouseleave', () => {
        scrollSpeed = 1;
    });
    
    // 窗口大小变化时重置
    window.addEventListener('resize', () => {
        scrollPos = groupWidth;
        scrollContent.style.transform = `translateX(-${scrollPos}px)`;
    });
}

// 添加全局变量记录当前索引
let currentIndex = 1;



// 页面加载完成后自动显示京剧内容
document.addEventListener('DOMContentLoaded', function() {
    showDetail(1); // 1 对应京剧
});