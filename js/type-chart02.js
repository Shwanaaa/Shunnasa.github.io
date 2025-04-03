const actorData = {
    "黄梅戏": {
        "actors": ["严凤英", "王少舫", "张云风", "潘璟琍", "黄宗毅", 
                 "黄新德", "马兰", "陈小芳", "张辉", "吴琼", 
                 "杨俊", "吴亚玲", "袁玫", "韩再芬", "周莉",
                 "李萍", "汪菱花", "汪静", "李文", "赵媛媛",
                 "孙娟", "余顺", "周源源", "周珊"],
        "color": [50, 60]  // H,S
    },
    "评剧": {
        "actors": ["李金顺", "刘翠霞", "白玉霜", "爱莲君", "喜彩莲",
                 "张德福", "新凤霞", "赵丽蓉", "花淑兰", "谷文月", "张淑桂"],
        "color": [350, 50]
    },
    "京剧": {
        "actors": ["程长庚", "张二奎", "梅兰芳", "程砚秋", "尚小云",
                 "荀慧生", "马连良", "赵葆秀", "张建国", "董圆圆"],
        "color": [0, 50]
    },
    "豫剧": {
        "actors": ["崔兰田", "桑振君", "陈素真", "常香玉", "马金凤",
                 "阎立品", "唐喜成", "李斯忠", "张梅贞", "王善朴", "柳兰芳"],
        "color": [120, 50]
    },
    "越剧": {
        "actors": ["王文娟", "殷瑞芬", "郑国凤", "王志萍", "张杭英",
                 "金采风", "徐玉兰", "王君安", "单仰萍", "钱惠丽"],
        "color": [210, 50]

    }
};

// 生成词云数据
function generateWordData() {
    const wordData = [];
    
    for (const [genre, data] of Object.entries(actorData)) {
        const [h, s] = data.color;
        
        data.actors.forEach(actor => {
            // 随机生成同色系不同深浅的颜色
            const lightness = 50 + Math.random() * 10;  
            const color = `hsl(${h}, ${s}%, ${lightness}%)`;
            
            wordData.push({
                name: actor,
                value: Math.floor(Math.random() * 50) + 30, // 30-80的随机值控制大小
                itemStyle: {
                    color: color
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: color
                    }
                },
                genre: genre
            });
        });
    }
    
    return wordData;
}

// 初始化图表
const chart = echarts.init(document.getElementById('wordcloud'));

const myoption = {
    backgroundColor: '#fff',
    tooltip: {
        show: true,
        formatter: function(params) {
            const actor = params.name;
            const genre = params.data.genre; 
            return `${actor}<br/>剧种: ${genre}`;
        }
    },
    series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '90%',
        height: '90%',
        right: null,
        bottom: null,
        sizeRange: [20, 50],
        rotationRange: [-45, 45],
        rotationStep: 15,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontWeight: 'bold',
            color: function () {
                return 'hsl(' + Math.round(Math.random() * 360) + ', 50%, 70%)';
            }
        },
        emphasis: {
            focus: 'self',
            textStyle: {
                shadowBlur: 10
            }
        },
        data: generateWordData()
    }]
};

chart.setOption(myoption);

// 响应窗口大小变化
window.addEventListener('resize', function() {
    chart.resize();
});