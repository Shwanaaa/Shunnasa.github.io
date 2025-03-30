// 图表管理器
const chartManager = {
    currentChart: null,
    initSunburstChart: function (operaType, data) {
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
                data: data.children,
                radius: [0, '90%'],
                label: {
                    rotate: 'radial',
                    color: '#333',
                    fontSize: 18
                },
                levels: [
                    {},
                    {
                        r0: '10%',
                        r: '40%',
                        itemStyle: {
                            borderWidth: 2
                        },
                        label: {
                            rotate: 'tangential'
                        }
                    },
                    {
                        r0: '40%',
                        r: '80%',
                        label: {
                            align: 'right'
                        }
                    },
                    {
                        r0: '80%',
                        r: '85%',
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

// 数据
const typedata = {
    1: {
        title: "京剧",
        image: "./images/1.jpg",
        introduction: "京剧起源于清朝乾隆年间，融合了徽剧、汉剧等多种地方戏曲艺术，发展成为中国最具代表性的戏曲剧种之一。京剧以唱、念、做、打为表演手段，以锣鼓、京胡等乐器伴奏，具有鲜明的艺术特色。",
        timeline: [
            { year: "18世纪末", top: "徽商推动戏曲繁荣，徽班随商帮崛起。1790年，徽商江春组织“三庆班”为乾隆祝寿进京，融合昆曲、秦腔等声腔，开启徽班称霸京城舞台的时代，四大徽班（三庆、四喜、和春、春台）形成“徽班进京”盛况。", bottom: "" },
            { year: "19世纪初", top: "", bottom: "徽班与秦腔（徽秦合流）、汉调（徽汉合流）深度融合，吸纳西皮、二黄等声腔，兼容武戏、文戏，奠定京剧声腔基础。程长庚、余三胜等艺人推动语言京化，形成“皮黄戏”雏形。" },
            { year: "1840-1860年", top: "徽、汉、秦声腔与北京方言结合，吸收昆曲、梆子等元素，确立以皮黄为核心的京剧体系。老生“三鼎甲”（程长庚、余三胜、张二奎）完善行当与剧目，标志京剧正式诞生。", bottom: "" },
            { year: "19世纪末-20世纪中", top: "", bottom: "京剧被列为国家级非物质文化遗产，继续传承发展" },
            { year: "正式定名与传承", top: "", bottom: "京剧被列为国家级非物质文化遗产，继续传承发展" }
        ],
        music: {
            items: [
                {
                    image: "./images/instrument/jing1.png",
                    intro: "功能：主奏乐器，掌控旋律走向，音色高亢激越，与演员唱腔紧密贴合，尤擅表现“西皮”“二黄”板式。特色：通过滑音、打音等技法强化戏剧张力，如《空城计》中诸葛亮唱段的清亮托腔。"
                },
                {
                    image: "./images/instrument/jing2.png",
                    intro: "功能：中音辅助，填补京胡高频与乐队中低音间的空白，柔化整体音色，多用于旦角戏（如梅派《贵妃醉酒》）。特色：20世纪20年代由梅兰芳引入，与京胡形成“阴阳互补”，增强抒情性。这是图片2的专属介绍"
                },
                {
                    image: "./images/instrument/jing3.png",
                    intro: "功能：弹拨乐器，以颗粒性音色点缀旋律，强化节奏，常用“轮指”“撮弦”技法（如《铡美案》包公唱段中的铿锵伴奏）。特色：定弦高亢，与京胡音域重叠却形成错落层次，增添灵动感。"
                },
                {
                    image: "./images/instrument/jing4.png",
                    intro: "低音支撑，夯实节奏基础，增强伴奏厚度，尤其在武戏或磅礴唱段中（如《野猪林》风雪场景）。特色：音色浑厚略带粗犷，与月琴的清脆形成对比，现代演出中有时以阮替代，但传统流派仍重三弦。"
                },
                {
                    image: "./images/instrument/jing5.png",
                    intro: "组成：单皮鼓（板鼓）与檀板，由鼓师一人操持，是武场“指挥中枢”。功能：单皮鼓用鼓楗敲击，通过轻重缓急控制全场节奏，如【急急风】表现紧张厮杀；檀板击节定拍，标志唱腔起止（如西皮导板前的“扎多衣”）；模拟风声、马蹄等音效（如《夜奔》中林冲踏雪声）。"
                },
                {
                    image: "./images/instrument/jing6.png",
                    intro: "音色：低沉洪亮，余音绵长。应用：烘托武将威仪（如《挑滑车》高宠出场配【四击头】）；强化高潮段落（如《霸王别姬》项羽悲叹时重击大锣）；与铙钹合奏表现战斗激烈（如【冲头】锣鼓）"
                },
                {
                    image: "./images/instrument/jing7.png",
                    intro: "形制：铜制，两片互击，音色尖锐铿锵。作用：制造紧张冲突感（如《三岔口》黑暗中打斗的“冷钹”）；衔接锣鼓点过渡（如【撕边】中铙钹碎击铺垫情绪）；特殊技法“闷击”可模仿水声、鬼魅气氛（如《白蛇传》水漫金山）。"
                },
                {
                    image: "./images/instrument/jing8.png",
                    intro: "音色：清脆灵巧，富有跳跃感。使用场景：配合丑角表演（如《法门寺》贾桂念状子的“小锣流水”）；武戏中点缀轻快动作（如《盗仙草》鹤童翻跃时“小锣抽头”）。"
                },
            ]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/1.png"
            },
            {
                name: "方纛",
                desc: "一般代表主帅的姓氏。可以根据主帅的颜色服饰确定方纛颜色",
                image: "./images/tools/2.png"
            },
            {
                name: "令旗",
                desc: "大多为元帅传令之用",
                image: "./images/tools/3.png"
            },
            {
                name: "手杻",
                desc: "有木制和铁制两种，是犯人发配时的一种刑具，手杻在舞台上使用较广，大多为男性使用",
                image: "./images/tools/4.png"
            },
            {
                name: "人字剑",
                desc: "剑身有大小之分，大人字剑主要为摆样子用，使人物佩带上显得威武、有气魄。人字剑用于净行人物",
                image: "./images/tools/5.png"
            },
            {
                name: "鬼头刀",
                desc: "主要用于神话戏",
                image: "./images/tools/6.png"
            },
            {
                name: "霸王枪",
                desc: "此枪在舞台上专为那些武艺高强、力大无比的角色使用",
                image: "./images/tools/7.png"
            },
            {
                name: "印盒、文房四宝",
                desc: "在舞台上为表现“公堂”“帅帐”等环境而摆设的物品",
                image: "./images/tools/8.png"
            },
            {
                name: "辇车",
                desc: "常用于表现古代帝王或贵族的出行场景",
                image: "./images/tools/9.png"
            },
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
                title: "四郎探母",
                image: "./images/operas/jingju/silangtanmu.jpg",
                year: "1930年",
                description: "讲述杨四郎冒险探望母亲的故事"
            },
            {
                title: "空城计",
                image: "./images/operas/jingju/kongchengji.jpg",
                year: "1940年",
                description: "诸葛亮智退司马懿大军的经典故事"
            }
        ]
    },
    2: {
        title: "越剧",
        image: "./images/2.jpg",
        introduction: "越剧起源于浙江嵊州，是中国第二大戏曲剧种。越剧以柔美的唱腔、细腻的表演和唯美的舞台呈现著称，尤其擅长表现才子佳人的爱情故事。",
        timeline: [
            { year: "孕育时期", top: "1852年，浙江嵊县农民金其柄创“落地唱书”，是越剧的前身，由半农半艺的男性农民演出，故称男班", bottom: "" },
            { year: "诞生与早期发展", top: "", bottom: "1906年3月27日，落地唱书艺人首次登台试演，越剧（最初称“小歌班”）诞生。1917年小歌班初进上海，1919年在上海立足。1920年起，小歌班集中知名演员编演新剧目，如《梁山伯与祝英台》等，适应了当时社会思潮，受到观众欢迎" },
            { year: "绍兴文戏时期", top: "1921年9月16日，“绍兴文戏”之名首次在报纸广告中出现。男班艺人将剧种改称“绍兴文戏”，吸收京剧、绍剧的表演程式，向古装大戏发展。1923年，第一个女班成立，1925年上海《申报》首次用“越剧”称之", bottom: "" },
            { year: "解放前女子越剧的兴盛", top: "", bottom: "1928年起，女班大量来沪，男班逐渐被取代。以姚水娟为代表的一批越剧从业者进行变革，称为“改良文戏”。 1938年多数戏班、剧团称“越剧”。1942年袁雪芬开始改革，称为“新越剧”，编演新剧目，建立剧本制，废除幕表制，越剧面貌焕然一新" },
            { year: "解放后的发展与辉煌", top: "1949年上海解放后，越剧界进行改人、改戏、改制的工作，成立国家剧团，如华东越剧实验剧团、上海越剧院等，拍摄了新中国第一部彩色戏曲艺术片越剧电影《梁山伯与祝英台》，扩大了越剧的国内外影响", bottom: "" },
            { year: "文革时期的低潮", top: "", bottom: "1966年开始的“文化大革命”，越剧受到严重的摧残，一批著名演员、创作人员和管理干部受到迫害，越剧被迫停演" },
            { year: "文革后的复兴", top: "文革后，越剧得到复兴，创作演出了男女合演的现代戏，重建了解体的区级越剧团。改革开放初期，全国专业戏曲界恢复评奖制度，浙江越剧界掀起小百花热潮，上海越剧界的青年演员在各种大赛中脱颖而出", bottom: "" },
        ],
        music: {
            items: [
                {
                    image: "./images/instrument/yue1.png",
                    intro: "功能：主奏乐器，掌控旋律走向，音色高亢激越，与演员唱腔紧密贴合，尤擅表现“西皮”“二黄”板式。特色：通过滑音、打音等技法强化戏剧张力，如《空城计》中诸葛亮唱段的清亮托腔。"
                },
                {
                    image: "./images/instrument/yue2.png",
                    intro: "功能：中音辅助，填补京胡高频与乐队中低音间的空白，柔化整体音色，多用于旦角戏（如梅派《贵妃醉酒》）。特色：20世纪20年代由梅兰芳引入，与京胡形成“阴阳互补”，增强抒情性。这是图片2的专属介绍"
                },
                {
                    image: "./images/instrument/yue3.png",
                    intro: "功能：中音辅助，填补京胡高频与乐队中低音间的空白，柔化整体音色，多用于旦角戏（如梅派《贵妃醉酒》）。特色：20世纪20年代由梅兰芳引入，与京胡形成“阴阳互补”，增强抒情性。这是图片2的专属介绍"
                }
            ]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/1.png"
            },
            {
                name: "方纛",
                desc: "一般代表主帅的姓氏。可以根据主帅的颜色服饰确定方纛颜色",
                image: "./images/tools/2.png"
            },
            {
                name: "令旗",
                desc: "大多为元帅传令之用",
                image: "./images/tools/3.png"
            },
            {
                name: "手杻",
                desc: "有木制和铁制两种，是犯人发配时的一种刑具，手杻在舞台上使用较广，大多为男性使用",
                image: "./images/tools/4.png"
            },
            {
                name: "人字剑",
                desc: "剑身有大小之分，大人字剑主要为摆样子用，使人物佩带上显得威武、有气魄。人字剑用于净行人物",
                image: "./images/tools/5.png"
            },
            {
                name: "鬼头刀",
                desc: "主要用于神话戏",
                image: "./images/tools/6.png"
            },
            {
                name: "霸王枪",
                desc: "此枪在舞台上专为那些武艺高强、力大无比的角色使用",
                image: "./images/tools/7.png"
            },
            {
                name: "印盒、文房四宝",
                desc: "在舞台上为表现“公堂”“帅帐”等环境而摆设的物品",
                image: "./images/tools/8.png"
            },
            {
                name: "辇车",
                desc: "常用于表现古代帝王或贵族的出行场景",
                image: "./images/tools/9.png"
            },
        ],
        operas: [
            {
                title: "梁山伯与祝英台",
                image: "./images/operas/yueju/liangshanbo.jpg",
                year: "1954年",
                description: "讲述梁山伯与祝英台凄美的爱情故事"
            },
            {
                title: "红楼梦",
                image: "./images/operas/yueju/hongloumeng.jpg",
                year: "1962年",
                description: "改编自曹雪芹的古典名著"
            },
            {
                title: "西厢记",
                image: "./images/operas/yueju/xixiangji.jpg",
                year: "1956年",
                description: "讲述张生与崔莺莺的爱情故事"
            }
        ]
    },
    3: {
        title: "黄梅戏",
        image: "./images/3.jpg",
        introduction: "黄梅戏起源于湖北黄梅县，后在安徽安庆发扬光大，是中国五大戏曲剧种之一。黄梅戏以生活化的内容、通俗易懂的唱词和优美的旋律著称。",
        timeline: [
            { year: "第一阶段", top: "清乾隆末期到辛亥革命前后，黄梅戏起源于皖、鄂、赣三省间的采茶调等，受当地戏曲和民间艺术影响，逐渐形成小戏、本戏，“串戏”是过渡形式，期间“三打七唱”形成发展，传统剧目丰富", bottom: "" },
            { year: "第二阶段", top: "", bottom: "辛亥革命到1949年，黄梅戏演出活动职业化，从农村草台走向城市舞台，受京剧、越剧等影响，演出内容与形式变化，编排新剧目，音乐、表演等方面改革，吸收其他剧种长处" },
            { year: "第三阶段", top: "1949年至今，黄梅戏迅速恢复发展，专业剧团成立，《天仙配》等剧目成功演出并被拍成电影，影响扩大，新创作剧目多，表演艺术融合话剧电影形式，造就大批优秀演员", bottom: "" }
        ],
        music: {
            items: [
                {
                    image: "./images/instrument/huang1.png",
                    intro: "功能：主奏乐器，掌控旋律走向，音色高亢激越，与演员唱腔紧密贴合，尤擅表现“西皮”“二黄”板式。特色：通过滑音、打音等技法强化戏剧张力，如《空城计》中诸葛亮唱段的清亮托腔。"
                },
                {
                    image: "./images/instrument/huang2.png",
                    intro: "功能：中音辅助，填补京胡高频与乐队中低音间的空白，柔化整体音色，多用于旦角戏（如梅派《贵妃醉酒》）。特色：20世纪20年代由梅兰芳引入，与京胡形成“阴阳互补”，增强抒情性。这是图片2的专属介绍"
                },
                {
                    image: "./images/instrument/huang3.png",
                    intro: "功能：弹拨乐器，以颗粒性音色点缀旋律，强化节奏，常用“轮指”“撮弦”技法（如《铡美案》包公唱段中的铿锵伴奏）。特色：定弦高亢，与京胡音域重叠却形成错落层次，增添灵动感。"
                },
                {
                    image: "./images/instrument/huang4.png",
                    intro: "低音支撑，夯实节奏基础，增强伴奏厚度，尤其在武戏或磅礴唱段中（如《野猪林》风雪场景）。特色：音色浑厚略带粗犷，与月琴的清脆形成对比，现代演出中有时以阮替代，但传统流派仍重三弦。"
                }
            ]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/1.png"
            },
            {
                name: "方纛",
                desc: "一般代表主帅的姓氏。可以根据主帅的颜色服饰确定方纛颜色",
                image: "./images/tools/2.png"
            },
            {
                name: "令旗",
                desc: "大多为元帅传令之用",
                image: "./images/tools/3.png"
            },
            {
                name: "手杻",
                desc: "有木制和铁制两种，是犯人发配时的一种刑具，手杻在舞台上使用较广，大多为男性使用",
                image: "./images/tools/4.png"
            },
            {
                name: "人字剑",
                desc: "剑身有大小之分，大人字剑主要为摆样子用，使人物佩带上显得威武、有气魄。人字剑用于净行人物",
                image: "./images/tools/5.png"
            },
            {
                name: "鬼头刀",
                desc: "主要用于神话戏",
                image: "./images/tools/6.png"
            },
            {
                name: "霸王枪",
                desc: "此枪在舞台上专为那些武艺高强、力大无比的角色使用",
                image: "./images/tools/7.png"
            },
            {
                name: "印盒、文房四宝",
                desc: "在舞台上为表现“公堂”“帅帐”等环境而摆设的物品",
                image: "./images/tools/8.png"
            },
            {
                name: "辇车",
                desc: "常用于表现古代帝王或贵族的出行场景",
                image: "./images/tools/9.png"
            },
        ],
        operas: [
            {
                title: "天仙配",
                image: "./images/operas/huangmeixi/tianshenpei.jpg",
                year: "1955年",
                description: "讲述董永与七仙女的爱情故事"
            },
            {
                title: "女驸马",
                image: "./images/operas/huangmeixi/nupuma.jpg",
                year: "1958年",
                description: "讲述冯素珍女扮男装考中状元的故事"
            }
        ]
    },
    4: {
        title: "评剧",
        image: "./images/4.jpg",
        introduction: "评剧起源于河北，是中国北方最具代表性的戏曲剧种之一。评剧以生活化的内容、通俗易懂的唱词和生动的表演著称，尤其擅长表现市民生活。",
        timeline: [
            { year: "莲花落阶段", top: "19世纪末，河北唐山一带的贫苦农民在农闲时以唱莲花落谋生，1890年前后逐渐出现专业艺人。莲花落是一种民间说唱艺术，评剧在此基础上发展起来", bottom: "" },
            { year: "对口莲花落阶段", top: "", bottom: "清嘉庆以后，莲花落发展为彩扮（对口莲花落）形式，流行于农村。光绪年间，东北二人转传入关内，莲花落艺人吸收其艺术形式，开始演唱如《王二小赶脚》等剧目，深受当地农民喜爱" },
            { year: "“拆出”阶段", top: "对口莲花落受东北二人转影响，发展为“拆出”形式，将唱、白拆开，故事分成场次，并吸收二人转的唱腔和乐器，推动了莲花落向戏曲方面的发展", bottom: "" },
            { year: "唐山落子阶段", top: "", bottom: "1908年，成兆才等人重整班社，进入唐山，定名为“平腔梆子戏”，后称“唐山落子”。这一时期，评剧作为一个剧种基本形成，艺术上不断革新，产生了专职编剧和专业剧场" },
            { year: "奉天落子阶段", top: "1919年，警世戏社部分艺人赴东北演出，受到欢迎，被称为“奉天落子”。这一时期，评剧班社在东北活动频繁，唱腔激越高昂，女演员的出现标志着评剧发展进入新阶段，形成了众多流派", bottom: "" },
            { year: "评剧阶段", top: "", bottom: "1935年起，评剧艺人大量涌向南方，在上海、杭州等地演出，并扎下根。上海报纸广告首次出现“评剧”名称。建国后，评剧在各地成立剧团，并对剧目和表演艺术进行改革，涌现出一批著名演员和剧目" }
        ],
        music: {
            items: [
                {
                    image: "./images/instrument/ping1.png",
                    intro: "功能：主奏乐器，掌控旋律走向，音色高亢激越，与演员唱腔紧密贴合，尤擅表现“西皮”“二黄”板式。特色：通过滑音、打音等技法强化戏剧张力，如《空城计》中诸葛亮唱段的清亮托腔。"
                },
                {
                    image: "./images/instrument/ping2.png",
                    intro: "功能：中音辅助，填补京胡高频与乐队中低音间的空白，柔化整体音色，多用于旦角戏（如梅派《贵妃醉酒》）。特色：20世纪20年代由梅兰芳引入，与京胡形成“阴阳互补”，增强抒情性。这是图片2的专属介绍"
                },
                {
                    image: "./images/instrument/ping3.png",
                    intro: "功能：弹拨乐器，以颗粒性音色点缀旋律，强化节奏，常用“轮指”“撮弦”技法（如《铡美案》包公唱段中的铿锵伴奏）。特色：定弦高亢，与京胡音域重叠却形成错落层次，增添灵动感。"
                },
                {
                    image: "./images/instrument/ping4.png",
                    intro: "低音支撑，夯实节奏基础，增强伴奏厚度，尤其在武戏或磅礴唱段中（如《野猪林》风雪场景）。特色：音色浑厚略带粗犷，与月琴的清脆形成对比，现代演出中有时以阮替代，但传统流派仍重三弦。"
                },
                {
                    image: "./images/instrument/ping5.png",
                    intro: "组成：单皮鼓（板鼓）与檀板，由鼓师一人操持，是武场“指挥中枢”。功能：单皮鼓用鼓楗敲击，通过轻重缓急控制全场节奏，如【急急风】表现紧张厮杀；檀板击节定拍，标志唱腔起止（如西皮导板前的“扎多衣”）；模拟风声、马蹄等音效（如《夜奔》中林冲踏雪声）。"
                },
                {
                    image: "./images/instrument/ping6.png",
                    intro: "音色：低沉洪亮，余音绵长。应用：烘托武将威仪（如《挑滑车》高宠出场配【四击头】）；强化高潮段落（如《霸王别姬》项羽悲叹时重击大锣）；与铙钹合奏表现战斗激烈（如【冲头】锣鼓）"
                }
            ]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/1.png"
            },
            {
                name: "方纛",
                desc: "一般代表主帅的姓氏。可以根据主帅的颜色服饰确定方纛颜色",
                image: "./images/tools/2.png"
            },
            {
                name: "令旗",
                desc: "大多为元帅传令之用",
                image: "./images/tools/3.png"
            },
            {
                name: "手杻",
                desc: "有木制和铁制两种，是犯人发配时的一种刑具，手杻在舞台上使用较广，大多为男性使用",
                image: "./images/tools/4.png"
            },
            {
                name: "人字剑",
                desc: "剑身有大小之分，大人字剑主要为摆样子用，使人物佩带上显得威武、有气魄。人字剑用于净行人物",
                image: "./images/tools/5.png"
            },
            {
                name: "鬼头刀",
                desc: "主要用于神话戏",
                image: "./images/tools/6.png"
            },
            {
                name: "霸王枪",
                desc: "此枪在舞台上专为那些武艺高强、力大无比的角色使用",
                image: "./images/tools/7.png"
            },
            {
                name: "印盒、文房四宝",
                desc: "在舞台上为表现“公堂”“帅帐”等环境而摆设的物品",
                image: "./images/tools/8.png"
            },
            {
                name: "辇车",
                desc: "常用于表现古代帝王或贵族的出行场景",
                image: "./images/tools/9.png"
            },
        ],
        operas: [
            {
                title: "刘巧儿",
                image: "./images/operas/pingju/liuqiaoer.jpg",
                year: "1951年",
                description: "讲述刘巧儿追求婚姻自由的故事"
            },
            {
                title: "杨三姐告状",
                image: "./images/operas/pingju/yangsangjie.jpg",
                year: "1962年",
                description: "讲述杨三姐为姐姐伸张正义的故事"
            }
        ]
    },
    5: {
        title: "豫剧",
        image: "./images/5.jpg",
        introduction: "豫剧起源于河南，是中国五大戏曲剧种之一。豫剧以高亢激昂的唱腔、生动的表演和丰富的剧目著称，尤其擅长表现历史故事和民间传说。",
        timeline: [
            { year: "起源与形成", top: "豫剧起源于明朝中后期，是在河南民间演唱艺术的基础上，吸收了“弦索”等艺术成果发展而成的。其前身是“梆子戏”，在河南地区逐渐形成并发展，深受当地民众喜爱", bottom: "" },
            { year: "民国时期的发展", top: "", bottom: "1928年，河南省教育厅成立了戏曲审查会，以樊粹庭等为代表的一批知识分子开始介入豫剧，改革豫剧；1930年，豫剧五大流派在开封形成；1934-1935年，樊粹庭建立了剧场与剧社" },
            { year: "抗战时期", top: "1937年卢沟桥事变后，豫剧界积极投入抗战宣传，编写并演出了许多抗战题材的剧目，如《涤耻血》《伉俪箭》等，以支援抗日战争；随着战事的扩大，部分豫剧团体迁往西安等地，使豫剧在更广泛的地区传播和发展", bottom: "" },
            { year: "解放后的发展", top: "", bottom: "中华人民共和国成立后，河南梆子被正式命名为“豫剧”；20世纪50年代中期，豫剧现代戏开始兴起，导演杨兰春、作曲王基笑等开辟了豫剧现代戏道路；从1940年到1960年，豫剧开始向全国更广的范围传播，传播至全国二十多个省份" },
            { year: "文革时期", top: "在文化大革命期间，大量传统豫剧目被批判和禁止演出，许多豫剧演员也受到迫害；豫剧工作者为豫剧移植样板戏做了大量工作，一些不适合演样板戏的演员被迫改行", bottom: "" },
            { year: "改革开放后的发展", top: "", bottom: "文革结束后，豫剧创作出现了新的思想涌动，出现了一些令人耳目一新的新作品；1980年，举行了“豫剧流派汇报演出”，逐渐形成各大豫剧流派，确立了陈、常、崔、马、阎五大旦角以及唐喜成、李斯忠等生净一些流派；1990年，台湾豫剧团开始与大陆进行交流演出，并逐渐走向国际化，豫剧的影响力进一步扩大" }
        ],
        music: {
            items: [
                {
                    image: "./images/instrument/yu1.png",
                    intro: "功能：主奏乐器，掌控旋律走向，音色高亢激越，与演员唱腔紧密贴合，尤擅表现“西皮”“二黄”板式。特色：通过滑音、打音等技法强化戏剧张力，如《空城计》中诸葛亮唱段的清亮托腔。"
                },
                {
                    image: "./images/instrument/yu2.png",
                    intro: "功能：中音辅助，填补京胡高频与乐队中低音间的空白，柔化整体音色，多用于旦角戏（如梅派《贵妃醉酒》）。特色：20世纪20年代由梅兰芳引入，与京胡形成“阴阳互补”，增强抒情性。这是图片2的专属介绍"
                },
                {
                    image: "./images/instrument/yu3.png",
                    intro: "功能：弹拨乐器，以颗粒性音色点缀旋律，强化节奏，常用“轮指”“撮弦”技法（如《铡美案》包公唱段中的铿锵伴奏）。特色：定弦高亢，与京胡音域重叠却形成错落层次，增添灵动感。"
                },
                {
                    image: "./images/instrument/yu4.png",
                    intro: "低音支撑，夯实节奏基础，增强伴奏厚度，尤其在武戏或磅礴唱段中（如《野猪林》风雪场景）。特色：音色浑厚略带粗犷，与月琴的清脆形成对比，现代演出中有时以阮替代，但传统流派仍重三弦。"
                },
                {
                    image: "./images/instrument/yu5.png",
                    intro: "组成：单皮鼓（板鼓）与檀板，由鼓师一人操持，是武场“指挥中枢”。功能：单皮鼓用鼓楗敲击，通过轻重缓急控制全场节奏，如【急急风】表现紧张厮杀；檀板击节定拍，标志唱腔起止（如西皮导板前的“扎多衣”）；模拟风声、马蹄等音效（如《夜奔》中林冲踏雪声）。"
                },
                {
                    image: "./images/instrument/yu6.png",
                    intro: "音色：低沉洪亮，余音绵长。应用：烘托武将威仪（如《挑滑车》高宠出场配【四击头】）；强化高潮段落（如《霸王别姬》项羽悲叹时重击大锣）；与铙钹合奏表现战斗激烈（如【冲头】锣鼓）"
                },
                {
                    image: "./images/instrument/yu7.png",
                    intro: "形制：铜制，两片互击，音色尖锐铿锵。作用：制造紧张冲突感（如《三岔口》黑暗中打斗的“冷钹”）；衔接锣鼓点过渡（如【撕边】中铙钹碎击铺垫情绪）；特殊技法“闷击”可模仿水声、鬼魅气氛（如《白蛇传》水漫金山）。"
                }
            ]
        },
        tools: [
            {
                name: "马鞭",
                desc: "象征战马，不同颜色代表不同马种，红色为赤兔马",
                image: "./images/tools/1.png"
            },
            {
                name: "方纛",
                desc: "一般代表主帅的姓氏。可以根据主帅的颜色服饰确定方纛颜色",
                image: "./images/tools/2.png"
            },
            {
                name: "令旗",
                desc: "大多为元帅传令之用",
                image: "./images/tools/3.png"
            },
            {
                name: "手杻",
                desc: "有木制和铁制两种，是犯人发配时的一种刑具，手杻在舞台上使用较广，大多为男性使用",
                image: "./images/tools/4.png"
            },
            {
                name: "人字剑",
                desc: "剑身有大小之分，大人字剑主要为摆样子用，使人物佩带上显得威武、有气魄。人字剑用于净行人物",
                image: "./images/tools/5.png"
            },
            {
                name: "鬼头刀",
                desc: "主要用于神话戏",
                image: "./images/tools/6.png"
            },
            {
                name: "霸王枪",
                desc: "此枪在舞台上专为那些武艺高强、力大无比的角色使用",
                image: "./images/tools/7.png"
            },
            {
                name: "印盒、文房四宝",
                desc: "在舞台上为表现“公堂”“帅帐”等环境而摆设的物品",
                image: "./images/tools/8.png"
            },
            {
                name: "辇车",
                desc: "常用于表现古代帝王或贵族的出行场景",
                image: "./images/tools/9.png"
            },
        ],
        operas: [
            {
                title: "穆桂英挂帅",
                image: "./images/operas/yuju/muguixing.jpg",
                year: "1959年",
                description: "讲述穆桂英再次出征的故事"
            },
            {
                title: "花木兰",
                image: "./images/operas/yuju/huamulan.jpg",
                year: "1960年",
                description: "讲述花木兰代父从军的故事"
            }
        ]
    }
};

// 更新标题和图片
function updateTitleAndImage(index) {
    const detailTitle = document.getElementById('detail-title');
    const originImage = document.getElementById('origin-image');

    detailTitle.textContent = typedata[index].title;

    if (originImage) {
        originImage.src = typedata[index].image;
        originImage.alt = typedata[index].title;
    }
}

// 更新简要介绍
function updateIntroduction(index) {
    const intro = document.getElementById('brief-intro');

    intro.textContent = typedata[index].introduction;
}

// 更新时间线
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


// 更新音乐器具轮播图
function renderSlider(items) {
    const slider = document.getElementById('music-slider');
    const introElement = document.getElementById('music-introduction');

    // 生成轮播图HTML - 只显示一张图片
    slider.innerHTML = `
        <div class="slides">
            ${items.map((item, i) => `
                <div class="slide${i === 0 ? ' active' : ''}" style="display: ${i === 0 ? 'block' : 'none'}">
                    <img src="${item.image}" alt="乐器图片 ${i + 1}">
                </div>
            `).join('')}
        </div>
        <div class="navigation">
            ${items.map((_, i) => `
                <label for="r${i + 1}" class="bar${i === 0 ? ' active' : ''}"></label>
            `).join('')}
        </div>
    `;

    // 初始显示第一张图的介绍
    if (items.length > 0) {
        introElement.textContent = items[0].intro;
    }

    // 获取DOM元素
    const slides = document.querySelectorAll('.slide');
    const bars = document.querySelectorAll('.bar');

    // 点击导航按钮切换
    bars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            // 隐藏所有幻灯片
            slides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // 移除所有活动状态
            bars.forEach(b => b.classList.remove('active'));
            
            // 显示选中的幻灯片
            slides[index].style.display = 'block';
            bar.classList.add('active');
            
            // 更新介绍文字
            introElement.textContent = items[index].intro;
        });
    });
}

// 更新舞台道具
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
        </div>
    `;
}

// 加载图表脚本
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


// 更新剧目滚动区域
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

// 初始化剧目滚动
function initOperaScroll() {
    const scrollContent = document.getElementById('scrollContent');
    const scrollContainer = document.querySelector('.scroll-container');

    // 停止之前的动画
    if (scrollAnimation) {
        cancelAnimationFrame(scrollAnimation);
    }

    // 计算单个剧目宽度（包括间距）
    const itemWidth = 220; // 与CSS中.scroll-item的宽度一致
    const gap = 20; // 与CSS中的gap一致
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

// 全局变量
let currentIndex = 1;
let scrollAnimation = null;
let scrollSpeed = 1;
let scrollPos = 0;

// 显示详细信息
function showDetail(index) {
    // 更新详细介绍中的标题和图片
    updateTitleAndImage(index);

    // 更新简要介绍
    updateIntroduction(index);

    // 更新时间线
    updateTimeline(index);

    // 更新音乐器具轮播图
    renderSlider(typedata[index].music.items);

    // 更新流派旭日图
    loadChartScript(index);

    // 更新舞台道具
    updateTools(index);

    // 更新剧目滚动区域
    currentIndex = index;
    updateOperasScroll(index);
}

// 页面加载完成后自动显示京剧内容
document.addEventListener('DOMContentLoaded', function () {
    showDetail(1); // 1 对应京剧
});