// 初始化图表对象
var myChart = echarts.init(document.getElementById('map'));

// 完整数据（已适配ECharts官方省份名称）
var data = [
    { name: '北京', value: 8 },
    { name: '天津', value: 5 },
    { name: '河北', value: 36 },
    { name: '北京', value: 8 },
    { name: '天津', value: 5 },
    { name: '河北', value: 36 },
    { name: '山西', value: 38 },
    { name: '内蒙古', value: 14 },
    { name: '辽宁', value: 6 },
    { name: '吉林', value: 8 },
    { name: '黑龙江', value: 5 },
    { name: '上海', value: 9 },
    { name: '江苏', value: 20 },
    { name: '浙江', value: 16 },
    { name: '安徽', value: 31 },
    { name: '福建', value: 23 },
    { name: '江西', value: 26 },
    { name: '山东', value: 28 },
    { name: '河南', value: 25 },
    { name: '湖北', value: 26 },
    { name: '湖南', value: 20 },
    { name: '广东', value: 16 },
    { name: '广西', value: 21 },
    { name: '海南', value: 3 },
    { name: '重庆', value: 6 },
    { name: '四川', value: 11 },
    { name: '贵州', value: 10 },
    { name: '云南', value: 18 },
    { name: '西藏', value: 6 },
    { name: '陕西', value: 26 },
    { name: '甘肃', value: 13 },
    { name: '青海', value: 7 },
    { name: '宁夏', value: 7 },
    { name: '新疆', value: 8, extraInfo: '（包含新疆生产建设兵团2个）' },
    { name: '台湾', value: 0 },
    { name: '南海诸岛', value: 0 }
];

var option = {
    title: {
        text: '中国各省份剧种数量分布热力图',
        subtext: '数据来源：用户提供数据',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            var tooltipContent = params.name + '<br/>剧种数量: ' + params.value + '个';
            // 如果是新疆，添加额外信息
            if (params.name === '新疆') {
                tooltipContent += '<br/>（包含新疆生产建设兵团2个）';
            }
            return tooltipContent;
        }
    },
    visualMap: {
        type: 'continuous',  // 连续型颜色渐变
        min: 0,
        max: 40,            // 覆盖数据最大值（38）
        left: '30px',
        bottom: '30px',
        text: ['高', '低'],
        inRange: {
            color: ['#f6efa7', '#d88273', '#bf444c']  // 黄→橙→红渐变
        },
        calculable: true
    },
    series: [{
        type: 'map',
        map: 'china',
        roam: false,          // 不允许缩放拖动
        label: {
            show: true,     // 显示省份名称
            fontSize: 12
        },
        data: data,
        emphasis: {
            itemStyle: {
                areaColor: '#81D4FA'  // 高亮时显示蓝色
            }
        }
    }]
};

myChart.setOption(option);

// 窗口自适应
window.addEventListener('resize', function() {
    myChart.resize();
});