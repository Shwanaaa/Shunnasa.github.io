// 定义每个时期的图片组
const periodImages = {
    xianqin: [
        { src: 'images/history/xianqin1.png', alt: '先秦时期图片1', title: '西周乐舞《大武》' },
        { src: 'images/history/xianqin2.png', alt: '先秦时期图片2', title: '《九歌》' },
        { src: 'images/history/xianqin3.png', alt: '先秦时期图片3', title: '傩' }
    ],
    hanwei: [
        { src: 'images/history/hanwei1.png', alt: '汉魏时期图片1', title: '《东海黄公》' },
        { src: 'images/history/hanwei2.png', alt: '汉魏时期图片2', title: '《总会仙倡》' }
    ],
    weijin: [
        { src: 'images/history/weijin1.png', alt: '魏晋时期图片1', title: '《大面》' },
        { src: 'images/history/weijin2.png', alt: '魏晋时期图片2', title: '《踏谣娘》' }
    ],
    tang: [
        { src: 'images/history/weijin1.png', alt: '唐代图片1', title: '《大面》' },
        { src: 'images/history/weijin2', alt: '唐代图片2', title: '《踏谣娘》' }
    ],
    songyuan: [
        { src: 'images/history/songyuan1.png', alt: '宋元时期图片1', title: '《眼药酸》' },
        { src: 'images/history/songyuan2.png', alt: '宋元时期图片2', title: '《目连救母》' },
        { src: 'images/history/songyuan3.png', alt: '宋元时期图片3', title: '《窦娥冤》' },
        { src: 'images/history/songyuan4.png', alt: '宋元时期图片4', title: '金代董墓院本的戏台和戏俑' },

    ],
    mingqing: [
        { src: 'images/history/mingqing4.png', alt: '明清时期图片4', title: '《琵琶记》' },
        { src: 'images/history/mingqing1.png', alt: '明清时期图片1', title: '《南九宫谱》' },
        { src: 'images/history/mingqing2.png', alt: '明清时期图片2', title: '南朝第一寺”鸡鸣寺' },
        { src: 'images/history/mingqing3.png', alt: '明清时期图片3', title: '故宫畅音阁' }
    ]
};

/// 时间轴节点点击事件
document.querySelectorAll('.timeline-node').forEach(node => {
    node.addEventListener('click', function () {
        // 移除所有节点的 active 类
        document.querySelectorAll('.timeline-node').forEach(n => {
            n.classList.remove('active');
        });

        // 为当前点击的节点添加 active 类
        this.classList.add('active');

        // 获取当前节点对应的时间段标识符
        const period = this.getAttribute('data-period');

        // 隐藏所有内容区域
        document.querySelectorAll('.timeline-content-area').forEach(content => {
            content.classList.remove('active');
        });

        // 显示对应的内容区域
        const contentArea = document.getElementById(period + 'Content');
        contentArea.classList.add('active');

        // 更新 module-3 中的轮播图
        updateCarousel(period);
    });
});

// 更新轮播图内容
function updateCarousel(period) {
    const carouselInner = document.querySelector('.module-3 .carousel-inner');
    const titleElement = document.querySelector('.module-3 h2');
    if (!carouselInner) return;

    // 清空现有轮播项
    carouselInner.innerHTML = '';

    // 添加新的轮播项
    periodImages[period].forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        if (index === 0) carouselItem.classList.add('active');

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
    });

    if (periodImages[period].length > 0) {
        titleElement.textContent = periodImages[period][0].title; // 设置标题为第一张图片的alt文本
    }

    // 重置轮播逻辑
    resetCarousel();
}

// 重置轮播逻辑
function resetCarousel() {
    const carouselItems = document.querySelectorAll('.module-3 .carousel-item');
    let currentIndex = 0;

    function showItem(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[index].classList.add('active');
        currentIndex = index;
        // 更新标题
        const currentImage = carouselItems[index];
        const titleElement = document.querySelector('.module-3 h2');
        if (currentImage) {
            titleElement.textContent = currentImage.querySelector('img').alt;
        }
    }

    // 清除之前的轮播定时器
    if (window.carouselInterval) {
        clearInterval(window.carouselInterval);
    }

    // 自动轮播
    window.carouselInterval = setInterval(function () {
        let newIndex = currentIndex + 1;
        if (newIndex >= carouselItems.length) newIndex = 0;
        showItem(newIndex);
    }, 2000);
}

// 初始化时激活第一个轮播图
document.addEventListener('DOMContentLoaded', function () {
    // 手动触发“先秦”时期的点击事件
    const firstPeriodNode = document.querySelector('.timeline-node[data-period="xianqin"]');
    if (firstPeriodNode) {
        firstPeriodNode.click();
    }
});

// 展开/收起内容
function toggleCollapse(id) {
    const content = document.getElementById(id);
    const button = content.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        button.innerHTML = "展开更多 ▼";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        button.innerHTML = "收起内容 ▲";
    }
}

//轮播图逻辑
document.addEventListener('DOMContentLoaded', function () {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showItem(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[index].classList.add('active');
        currentIndex = index;
    }

    // 自动轮播
    setInterval(function () {
        let newIndex = currentIndex + 1;
        if (newIndex >= carouselItems.length) newIndex = 0;
        showItem(newIndex);
    }, 2000);
});
//性别占比图
var myChart = echarts.init(document.getElementById('main'));

// 戏曲风格配置
const option = {
    title: {
        text: '看客性别比',
        subtext: '戏曲观众群体分布',
        left: 'center',
        textStyle: {
            color: '#b22222',
            fontSize: 26,
            fontFamily: '方正启体',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        },
        subtextStyle: {
            color: '#3a5e8c',
            fontSize: 16,
            fontStyle: 'italic'
        }
    },
    grid: { top: 100, bottom: 30 },
    legend: {
        orient: 'vertical',
        right: 40,
        top: 'middle',
        itemWidth: 20,
        itemHeight: 12,
        textStyle: {
            color: '#4a4a4a',
            fontSize: 14
        }
    },
    series: [{
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '55%'],
        label: {
            formatter: ({ percent }) =>
                `{b|${percent}%}`,
            rich: {
                a: {
                    fontSize: 18,
                    color: '#582814',
                    align: 'center',
                    fontFamily: '华文楷体'
                },
                b: {
                    fontSize: 18,
                    color: '#b22222',
                    fontWeight: 'bold',
                    padding: [5, 0]
                }
            }
        },
        data: [
            {
                value: 20.14,
                name: '男性观众',
                itemStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [
                            { offset: 0, color: '#2b4a6d' },  // 武生靠甲蓝
                            { offset: 1, color: '#15243a' }
                        ]
                    }
                }
            },
            {
                value: 79.86,
                name: '女性观众',
                itemStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [
                            { offset: 0, color: '#d14b61' },  // 花旦胭脂红
                            { offset: 1, color: '#9a3241' }
                        ]
                    }
                }
            }
        ],
        itemStyle: {
            borderColor: '#f3d9a4',  // 戏曲服饰金绣色
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.2)'
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(0,0,0,0.3)'
            }
        }
    }]
};
myChart.setOption(option);
window.addEventListener('resize', myChart.resize);

//传播认知度图
var myChart2 = echarts.init(document.getElementById('main2'));

const option2 = {
    title: {
        text: '梨园新径',
        subtext: '当代戏曲文化传播渠道认知度TOP8',
        left: 'center',
        textStyle: {
            color: '#c3272b',
            fontSize: 28,
            fontFamily: '华文行楷',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        },
        subtextStyle: {
            color: '#3a5e8c',
            fontSize: 16,
            fontStyle: 'italic'
        },
        top: '10%'
       
    },
    tooltip: {
        trigger: 'axis',
        formatter: '{b0}<br/>{c0}%受访者',
        axisPointer: { type: 'shadow' }
    },
    xAxis: {
        type: 'value',
        name: '认知度 (%)',
        axisLine: {
            lineStyle: { color: '#7a5c3c' }
        },
        splitLine: {
            show: false,
            lineStyle: { type: 'dashed', color: '#e0c8a3' }
        },
        show: false  // 隐藏X轴
    },
    yAxis: {
        type: 'category',
        data: [
            '线下戏曲妆造体验店',
            '经典剧目改编电影',
            '融合戏曲元素的游戏',
            'AR/VR全息沉浸式体验',
            '数字化戏曲博物馆',
            '在线直播|互动教学',
            'AI修复经典剧目'
        ],
        axisLabel: {
            fontSize: 16,
            color: '#582814',
            fontFamily: '华文楷体'
        },
        axisLine: { show: false } // 隐藏Y轴
    },
    series: [{
        type: 'bar',
        data: [57.2, 53.3, 52.2, 51.7, 38.7, 29.9, 25.8],
        itemStyle: {
            color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 0,
                colorStops: [
                    { offset: 0, color: '#c3272b' },  // 旦角胭脂红
                    { offset: 1, color: '#e67e22' }   // 武生橘
                ]
            },
            borderColor: '#f3d9a4',  // 金线描边
            borderWidth: 2,
            shadowBlur: 8,
            shadowColor: 'rgba(0,0,0,0.2)'
        },
        barWidth: '65%',
        label: {
            show: true,
            position: 'right',
            formatter: '{c}%',
            color: '#c3272b',
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
        }
    }],
    grid: {
        left: '22%',
        right: '12%',
        bottom: '7%',
        top: '25%',
        containLabel: true
    },
    graphic: [{
        type: 'image',
        style: {
            image: 'https://example.com/water-sleeve.png', // 水袖剪影
            width: 200,
            height: 300,
            opacity: 0.15
        },
        left: 50,
        top: 100
    },
    {
        type: 'rect',
        shape: { width: 680, height: 360, r: 5 },
        style: {
            fill: 'transparent',
            stroke: '#e0c8a3',
            lineWidth: 2
        },
        left: 'center',
        top: 'middle'
    }]
};

myChart2.setOption(option2);
window.addEventListener('resize', myChart2.resize);

//年龄占比图
var myChart3 = echarts.init(document.getElementById('main3'));

// 配置项
var option3 = {
    title: {
        text: '各年龄层占比分布',
        subtext: '数据单位：百分比(%)',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    xAxis: {
        type: 'category',
        data: ['60后', '70后', '80后', '90后', '00后', '10后'],
        axisLabel: {
            fontSize: 14,
            color: '#666'
        }
    },
    yAxis: {
        type: 'value',
        name: '占比 (%)',
        axisLine: { show: true },
        splitLine: {
            lineStyle: { type: 'dashed' }
        }
    },
    series: [{
        data: [
            { value: 2.48, itemStyle: { color: '#7f8c8d' } },  // 60后-灰色
            { value: 8.5, itemStyle: { color: '#3498db' } },    // 70后-蓝色
            { value: 19.75, itemStyle: { color: '#2ecc71' } }, // 80后-绿色
            { value: 25.57, itemStyle: { color: '#f1c40f' } },  // 90后-黄色
            { value: 41.85, itemStyle: { color: '#e74c3c' } }, // 00后-红色
            { value: 1.86, itemStyle: { color: '#bdc3c7' } }   // 10后-浅灰
        ],
        type: 'bar',
        barWidth: '60%',
        label: {
            show: true,
            position: 'top',
            formatter: '{c}%',
            fontSize: 12,
            color: '#2c3e50'
        },
        itemStyle: {
            barBorderRadius: [5, 5, 0, 0]  // 顶部圆角
        }
    }],
    grid: {
        containLabel: true,
        left: '10%',
        right: '5%',
        bottom: '10%'
    },
    animationDuration: 1500  // 动画时长
};

// 使用配置项显示图表
myChart3.setOption(option3);

// 窗口自适应
window.addEventListener('resize', function () {
    myChart3.resize();
});