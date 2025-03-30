// 时间轴节点点击事件
document.querySelectorAll('.timeline-node').forEach(node => {
    node.addEventListener('click', function () {
        // 移除所有节点的active类
        document.querySelectorAll('.timeline-node').forEach(n => {
            n.classList.remove('active');
        });

        // 为当前点击的节点添加active类
        this.classList.add('active');

        // 获取当前节点对应的时间段标识符
        const period = this.getAttribute('data-period');

        // 隐藏所有内容区域
        document.querySelectorAll('.timeline-content-area').forEach(content => {
            content.classList.remove('active');
        });

        // 显示对应的内容区域
        document.getElementById(period + 'Content').classList.add('active');
    });
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
    }, 3000);
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
        }
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
            fontSize: 14,
            color: '#582814',
            fontFamily: '华文楷体'
        },
        axisLine: { show: false }, // 隐藏Y轴
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
        bottom: '15%',
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