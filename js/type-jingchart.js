// 流派数据
const jingData = {
    name: "京剧流派",
    children: [
        {
            name: "老生",
            children: [
                {name: "谭派(谭鑫培)", value: 10},
                {name: "新谭派(谭富英)", value: 8},
                {name: "汪派(汪桂芬)", value: 7},
                {name: "汪派(汪笑侬)", value: 6},
                {name: "孙派(孙菊仙)", value: 5},
                {name: "王派(王鸿寿)", value: 5},
                {name: "李派(李洪春)", value: 4},
                {name: "刘派(刘鸿声)", value: 4},
                {name: "余派(余叔岩)", value: 9},
                {name: "言派(言菊朋)", value: 5},
                {name: "高派(高庆奎)", value: 5},
                {name: "马派(马连良)", value: 8},
                {name: "麒派(周信芳)", value: 7},
                {name: "杨派(杨宝森)", value: 6},
                {name: "奚派(奚啸伯)", value: 5},
                {name: "唐派(唐韵笙)", value: 4}
            ]
        },
        {
            name: "武生",
            children: [
                {name: "俞派(俞菊笙)", value: 6},
                {name: "李派(李春来)", value: 5},
                {name: "黄派(黄月山)", value: 5},
                {name: "杨派(杨小楼)", value: 7},
                {name: "盖派(盖叫天)", value: 6}
            ]
        },
        {
            name: "小生",
            children: [
                {name: "程派(程继先)", value: 5},
                {name: "德派(德珺如)", value: 4},
                {name: "姜派(姜妙香)", value: 5},
                {name: "叶派(叶盛兰)", value: 6}
            ]
        },
        {
            name: "旦角",
            children: [
                {name: "陈派(陈德霖)", value: 5},
                {name: "王派(王瑶卿)", value: 7},
                {name: "梅派(梅兰芳)", value: 10},
                {name: "尚派(尚小云)", value: 8},
                {name: "程派(程砚秋)", value: 9},
                {name: "荀派(荀慧生)", value: 8},
                {name: "筱派(筱翠花)", value: 5},
                {name: "黄派(黄桂秋)", value: 5},
                {name: "张派(张君秋)", value: 7},
                {name: "徐派(徐碧云)", value: 5},
                {name: "杜派(杜近芳)", value: 5},
                {name: "赵派(赵燕侠)", value: 5},
                {name: "阎派(阎岚秋)", value: 4},
                {name: "朱派(朱桂芳)", value: 4},
                {name: "宋派(宋德珠)", value: 4},
                {name: "关派(关肃霜)", value: 5}
            ]
        },
        {
            name: "老旦",
            children: [
                {name: "龚派(龚云甫)", value: 6},
                {name: "李派(李多奎)", value: 7},
                {name: "孙派(孙甫亭)", value: 5},
                {name: "罗派(罗福山)", value: 4},
                {name: "李派(李金泉)", value: 5}
            ]
        },
        {
            name: "花脸",
            children: [
                {name: "何派(何桂山)", value: 5},
                {name: "金派(金秀山)", value: 6},
                {name: "裘派(裘桂仙)", value: 5},
                {name: "金派(金少山)", value: 7},
                {name: "郝派(郝寿臣)", value: 6},
                {name: "侯派(侯喜瑞)", value: 5},
                {name: "裘派(裘盛戎)", value: 8},
                {name: "袁派(袁世海)", value: 7},
                {name: "钱派(钱金福)", value: 5},
                {name: "黄派(黄润甫)", value: 5}
            ]
        },
        {
            name: "丑角",
            children: [
                {name: "萧派(萧长华)", value: 6},
                {name: "傅派(傅小山)", value: 5},
                {name: "叶派(叶盛章)", value: 5}
            ]
        }
    ]
};

// 确保数据可以被全局访问
window.jingData = jingData;

