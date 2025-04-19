// 初始化图表对象
var myChart = echarts.init(document.getElementById('map'));

// 加载GeoJSON地图数据
$.get('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full', function(geoJson) {
    // 注册地图
    echarts.registerMap('china', geoJson);
    
    // 完整数据（适配GeoJSON中的省份名称）
    var data = [
        { name: '北京市', value: 8 },
        { name: '天津市', value: 5 },
        { name: '河北省', value: 36 },
        { name: '山西省', value: 38 },
        { name: '内蒙古自治区', value: 14 },
        { name: '辽宁省', value: 6 },
        { name: '吉林省', value: 8 },
        { name: '黑龙江省', value: 5 },
        { name: '上海市', value: 9 },
        { name: '江苏省', value: 20 },
        { name: '浙江省', value: 16 },
        { name: '安徽省', value: 31 },
        { name: '福建省', value: 23 },
        { name: '江西省', value: 26 },
        { name: '山东省', value: 28 },
        { name: '河南省', value: 25 },
        { name: '湖北省', value: 26 },
        { name: '湖南省', value: 20 },
        { name: '广东省', value: 16 },
        { name: '广西壮族自治区', value: 21 },
        { name: '海南省', value: 3 },
        { name: '重庆市', value: 6 },
        { name: '四川省', value: 11 },
        { name: '贵州省', value: 10 },
        { name: '云南省', value: 18 },
        { name: '西藏自治区', value: 6 },
        { name: '陕西省', value: 26 },
        { name: '甘肃省', value: 13 },
        { name: '青海省', value: 7 },
        { name: '宁夏回族自治区', value: 7 },
        { name: '新疆维吾尔自治区', value: 8 },
        { name: '台湾省', value: 5 },
        { name: '香港特别行政区', value: 3 },
        { name: '澳门特别行政区', value: 2 }
    ];

    // 五大剧种主要分布省份
    var operaData = [
        { name: '北京市', opera: '京剧' },
        { name: '上海市', opera: '越剧' },
        { name: '河南省', opera: '豫剧' },
        { name: '浙江省', opera: '越剧' },
        { name: '安徽省', opera: '黄梅戏' },
        { name: '湖北省', opera: '黄梅戏' },
        { name: '天津市', opera: '评剧' }
    ];

    var option = {
        title: {
            text: '中国各省份剧种数量分布热力图',
            subtext: '数据来源：国家统计局，审图号：GS京(2022)1061号',
            left: 'center',
            textStyle: {
                fontSize: 18,
                color: '#333'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                var tooltipContent = params.name + '<br/>剧种数量: ' + (params.value || 0) + '个';
                
                // 添加五大剧种信息
                var operaInfo = operaData.find(item => item.name === params.name);
                if (operaInfo) {
                    tooltipContent += '<br/>主要剧种: ' + operaInfo.opera;
                }
                
                return tooltipContent;
            }
        },
        visualMap: {
            type: 'continuous',
            min: 0,
            max: 40,
            left: '30px',
            bottom: '30px',
            text: ['高', '低'],
            inRange: {
                color: ['#f6efa7', '#d88273', '#bf444c']
            },
            calculable: true,
            textStyle: {
                color: '#666'
            }
        },
        series: [
            {
                type: 'map',
                map: 'china',
                roam: true,
                scaleLimit: { // 设置缩放范围
                    min: 2, // 最小缩放比例
                    max: 6 // 最大缩放比例
                },
                center: [105, 36],
                label: {
                    show: true,
                    fontSize: 12,
                    color: '#333'
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#fff'
                    },
                    itemStyle: {
                        areaColor: '#81D4FA'
                    }
                },
                data: data,
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: 40,
                label: {
                    show: true,
                    formatter: function(params) {
                        var opera = operaData.find(item => item.name === params.name);
                        return opera ? opera.opera : '';
                    },
                    color: '#fff',
                    fontSize: 10,
                    position: 'inside'
                },
                itemStyle: {
                    color: '#c23531'
                },
                data: operaData.map(item => {
                    return {
                        name: item.name,
                        value: geoJson.features.find(f => f.properties.name === item.name).properties.center,
                        opera: item.opera
                    };
                }),
                zlevel: 2
            }
        ]
    };

    myChart.setOption(option);
});

// 窗口自适应
window.addEventListener('resize', function() {
    myChart.resize();
});