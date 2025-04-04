// 树状图
(function(){
     // 戏曲行当数据（树形结构）
 const Data = {
    name: '戏曲行当',
    children: [
        {
            name: '生',
            symbol: 'image://https://example.com/laosheng.png', // 需替换实际图标
            children: [
                {//老生
                    name: '老生',
                    feature: '沉稳持重，忠义沧桑',
                    content: '老生属于传统戏曲角色行当，是生行的一支，主要扮演中年或老年男性，大都是性格正直刚毅，重视仁义礼信的正面人物，因多戴髯口，俗称胡子生。重唱功，用真声，念韵白；动作造型庄重、端方。',
                    costumes: ['images/custume/laosheng1.png'],
                    makeup: ['images/makeup/laosheng1.png'],
                    bvid: 'BV11p4y197FS',
                    video: 'vedio/laosheng1.mp4',
                    actors: [
                        {name: '谭富英（京剧四大须生之一）《群英会》饰演鲁肃', img: 'images/actor/laosheng1.png'},
                        {name: '马连良（京剧四大须生之一）《群英会》饰演诸葛亮', img: 'images/actor/laosheng2.png'},
                        {name: '越剧老生张桂凤（在越剧中既饰演男老生也有女老生）在《三看御妹》饰演刘天化', img: 'images/actor/laosheng3.png'},
                        {name: '唐玉成（豫东调最有代表性的红脸（老生）演员）', img: 'images/actor/laosheng4.png'},
                        {name: '张银旺（黄梅戏演员）在《女驸马》中饰演刘文举', img: 'images/actor/laosheng5.png'}
                    ]
                },
                {//小生
                    name: '小生',
                    feature: '俊逸风流，儒雅激扬',
                    content: '与老生相对应，小生扮演青年男性。小生的表演在不同剧种中各具特色，但也有共同点。在音色运用上大致可分为两类：一类用真声，高腔和地方小系统剧种多用之；一类是以假声为主、真假声结合，昆曲和皮黄系统剧种多用之。动作造型的基调儒雅倜傥、秀逸飞动。',
                    costumes: ['images/custume/xiaosheng1.png'],
                    makeup: ['images/makeup/xiaosheng1.png'],
                    bvid:'BV19T411T7Zn',
                    video: 'vedio/xiaosheng.mp4',
                    actors: [
                        {name: '叶盛兰（首席京剧小生）在《群会英》中饰演周瑜', img: 'images/actor/xiaosheng1.png'},
                        {name: '在《花为媒》中，评剧演员张德福饰演贾俊英', img: 'images/actor/xiaosheng2.png'},
                        {name: '越剧小生——尹桂芳（有越剧皇帝的美称）她创立的尹派，是越剧小生中的第一个流派', img: 'images/actor/xiaosheng3.png'},
                        {name: '黄梅戏——王少舫在《天仙配》中饰演董永', img: 'images/actor/xiaosheng4.png'},
                        {name: '豫剧小生赵义亭', img: 'images/actor/xiaosheng5.png'}
                    ]
                },
                { //武生
                    name: '武生',
                    feature: '刚烈豪迈，英武铿锵',
                    content: '扮演擅长武艺的人物，分长靠武生和短打武生两类。长靠武生扮演大将，以扎大靠、穿厚底靴而得名。念白讲究吐字清晰，峻拔有力；重腰腿功和武打，更重身段工架，以突出人物的大将风度和英武气概。短打武生常穿抱衣抱裤和薄底鞋，以动作的轻捷矫健，跌扑翻打的勇猛炽烈见长。',
                    costumes: ['images/custume/wusheng1.png'],
                    makeup: ['images/makeup/wusheng1.png'],
                    bvid: 'BV1wtH7eNE2R',
                    video: 'vedio/wusheng.mp4',
                    actors: [
                        {name: '侯永奎', img: 'images/actor/wusheng1.png'},
                        {name: '京剧武生高盛麟在《薛礼叹月》饰演', img: 'images/actor/wusheng2.png'},
                        {name: '奚中路在《挑滑车》中饰演高宠', img: 'images/actor/wusheng3.png'},
                        {name: '豫剧武生李广海', img: 'images/actor/wusheng4.png'},
                        {name: '《连环套》叶金援饰黄天霸', img: 'images/actor/wusheng5.png'}
                    ]
                }
            ]
        },
        {
            name: '旦',
            feature: '长靠短打，如《长坂坡》赵云',
            symbol: 'image://https://example.com/wusheng.png',
            children: [
                { //正旦
                    name: '正旦',
                    feature: '端庄大气，唱功精湛',
                    content: '正旦俗称“青衣”，因所扮演的角色常穿黑色褶子而得名。中国戏曲中旦行的一种，北方剧种多称青衣，南方剧种多称正旦。按照传统来说，青衣在旦行里占着最主要的位置，所以叫正旦，扮演的一般都是端庄、严肃、正派的人物，大多数是贤妻良母，或者是贞节烈女之类的人物',
                    costumes: ['images/custume/zhengdan1.png'],
                    makeup: ['images/makeup/zhengdan1.png'],
                    bvid: 'BV1VN411d7VR',
                    video: 'vedio/zhengdan.mp4',
                    actors: [
                        {name: '梅兰芳《贵妃醉酒》饰演杨玉环', img: 'images/actor/zhengdan1.png'},
                        {name: '尚小云《失子惊疯》', img: 'images/actor/zhengdan2.png'},
                        {name: '程砚秋《荒山泪》', img: 'images/actor/zhengdan3.png'},
                        {name: '荀慧生', img: 'images/actor/zhengdan4.png'}
                    ] 
                },
                { //花旦
                    name: '花旦',
                    feature: '活泼俏丽，灵动轻盈',
                    content: '花旦，是中国戏曲旦行中的一支，区别于正旦（北方剧种多称“青衣”）、武旦和老旦。扮演的多为天真烂漫、性格开朗的妙龄女子。《春草闯堂》中的春草。也有的是属于泼辣，放荡的中、青年女性称做泼辣旦。影视界所称的“当家花旦”，指的也是善演这样角色的演员，想来是从戏曲中借用的称谓。',
                    costumes: ['images/custume/huadan1.png'],
                    bvid: 'BV1rA411j7rj',
                    makeup: ['images/makeup/huadan1.png'],
                    video: 'vedio/huadan.mp4',
                    actors: [
                        {name: '吴素秋《红娘》中的红娘', img: 'images/actor/huadan1.png'},
                        {name: '梁谷音《琵琶记*描容》中的赵五娘', img: 'images/actor/huadan2.png'},
                        {name: '管波《金玉奴》中的金玉奴', img: 'images/actor/huadan3.png'},
                        {name: '越剧演员陈晓红《梨花情》中的梨花', img: 'images/actor/huadan4.png'}
                    ] 
                },
                { //闺门旦
                    name: '闺门旦',
                    feature: '温婉含蓄，少女情态',
                    content: '又称小旦，扮演闺女、少妇等形象。顾名思义特指扮演未出嫁的闺阁少女。这类角色大多是性格内向、腼腆，与正旦（青衣）以及花旦相近。清李斗《扬州画舫录·新城北录下》：“小旦谓之闺门旦。”唐弢《“言论老生”》：“这种角色，也像京戏里的‘长靠’、‘短打’、‘闺门旦’、‘刀马旦’一样，在老生行中有一个因此而获得的专称，叫做‘言论老生’。”',
                    costumes: ['images/custume/guimendan1.png'],
                    makeup: ['images/makeup/guimendan1.png'],
                    bvid: 'BV15W411J7Sm',
                    video: 'vedio/guimendan.mp4',
                    actors: [
                        {name: '单雯《牡丹亭》中的杜丽娘', img: 'images/actor/guimendan1.png'},
                        {name: '方亚芬在《西厢记》饰演崔莺莺', img: 'images/actor/guimendan2.png'},
                        {name: '张冉《玉簪记》中的陈妙常', img: 'images/actor/guimendan3.png'},
                        {name: '李敏《盘妻索妻》中的谢云霞', img: 'images/actor/guimendan4.png'}
                    ] 
                },
                { //武旦
                    name: '武旦',
                    feature: '矫健凌厉，短打英姿',
                    content: '多扮演英姿飒爽、勇武的女性。注重武打，具有高超的武技和出手功，有的也有筋斗展示。亮相及动作幅度大，劲头足，既溜又稳，及帅又美，干净利索，手持兵器大枪、刀马刀等。既有男士的英猛，又不失女士的柔媚。',
                    costumes: ['images/custume/wudan1.png'],
                    makeup: ['images/makeup/wudan1.jpg'],
                    bvid: 'BV1jW411n7T1',
                    video: 'vedio/wudan.mp4',
                    actors: [
                        {name: '李红艳《白蛇传》中的白素贞', img: 'images/actor/wudan1.png'},
                        {name: '张淑景《白蛇传》中的青儿》', img: 'images/actor/wudan2.png'},
                        {name: '方小亚《青石山》', img: 'images/actor/wudan3.png'},
                        {name: '王芝泉在《盗仙草》中饰演白素贞', img: 'images/actor/wudan4.png'}
                    ] 
                },
                { //刀马旦
                    name: '刀马旦',
                    feature: '文武兼备，擅演巾帼',
                    content: '刀马旦是中国戏剧里“旦”的角色之一，所谓“旦”指的是各种不同年龄与身份的女性角色。刀马旦专演巾帼英雄，提刀骑马、武艺高强的女性，身份大多是元帅或大将，因此以气势见长，例如樊梨花、穆桂英等等。刀马旦在表演上唱、念、做并重，虽也需要开打，但打斗场面不如武旦激烈，而是较重身段，强调人物威武稳重的气质。',
                    costumes: ['images/custume/daomadan1.png'],
                    makeup: ['images/makeup/daomadan1.png'],
                    bvid: 'BV1hK421v7SN',
                    video: 'vedio/daomadan.mp4',
                    actors: [
                        {name: '潘月娇《扈家庄》中的扈三娘', img: 'images/actor/daomadan1.png'},
                        {name: '王芝泉', img: 'images/actor/daomadan2.png'},
                        {name: '史依弘', img: 'images/actor/daomadan3.png'},
                        {name: '冯蕴', img: 'images/actor/daomadan4.png'}
                    ] 
                },
                { //老旦
                    name: '老旦',
                    feature: '沉稳持重，悲情唱腔',
                    content: "老旦，属戏曲行当之一，是扮演老年妇女的角色，老旦的表演特点，是唱、念都用本嗓，用真嗓，但不像老生那样平、直、刚劲，而像青衣那样婉转迂回。老旦是京剧艺术中相对晚熟的行当，在历史演进中经过“谭郝奠基—龚派定型—多派领航—新李派升华”的发展，表演功法技术上取源老生行当，借法青衣行当，在兼收并蓄的基础上，不断融汇时代审美风格，探索新的审美样式和美学特性，成为京剧艺术中独树一帜的重要行当。",
                    costumes: ['images/custume/laodan1.png'],
                    makeup: ['images/makeup/laodan1.png'],
                    bvid: 'BV174411D7Yr',
                    video: 'vedio/laodan.mp4',
                    actors: [
                        {name: '王梦云', img: 'images/actor/laodan1.png'},
                        {name: '李鸣岩', img: 'images/actor/laodan2.png'},
                        {name: '蓝文云', img: 'images/actor/laodan3.png'},
                        {name: '王晶华', img: 'images/actor/laodan4.png'}
                    ] 
                },
                { //彩旦
                    name: '彩旦', 
                    feature: '滑稽夸张，多为丑婆',
                    content: '戏曲中扮演女性的丑角，年龄比较老的也叫丑婆子。彩旦俗称丑婆子，戏曲角色行当。丑行的一支。扮演滑稽风趣或奸刁的女子，也有性格爽朗无拘无束的逗笑角色。实为扮演女性的丑角。化装一般面涂白粉，再搽厚重胭脂。唱念都用本嗓，实际是用丑角来应工的。简单说彩旦是重说白的，而且基本上都说京白，以做工为主，表演、化妆都很夸张，是以滑稽和诙谐的表演为主的喜剧性的角色。川剧叫“摇旦”，秦腔称“媒旦”，京剧谓“彩旦”，均指扮演诙谐、滑稽、风趣、明快、爽朗、辛辣、刁蛮等为特点的中年以上女性丑角。',
                    costumes: ['images/custume/caidan1.png'],
                    bvid: 'BV1YN41187zp',
                    makeup: ['images/makeup/caidan1.png'],
                    video: 'vedio/caidan.mp4',
                    actors: [
                        {name: '张晓英', img: 'images/actor/caidan1.png'},
                        {name: '赵丽蓉', img: 'images/actor/caidan2.png'},
                        {name: '花砚茹', img: 'images/actor/caidan3.png'},
                        {name: '孙震', img: 'images/actor/caidan4.png'}
                    ]
                }
            ]
        },
        {
            name: '净',
            feature: '勾红脸角色，如关羽',
            symbol: 'image://https://example.com/hongsheng.png',
            children: [
                { //大花脸
                    name: '大花脸',
                    feature: '气势磅礴，唱腔浑厚',
                    content: '一般是以唱工为主，所以又叫唱工花脸。唱工花脸还有两个专门名称：铜锤和黑头。这两个名称与两个人物有关——徐彦昭和包公。京戏《二进宫》里的花脸徐彦昭，他是典型的唱工花脸，手里拿一柄铜锤，所以人们就把铜锤作为唱工花脸的代名词了。京剧中铜锤花脸讲究唱、念、做，以唱为主；架子花脸讲究做、念、唱，以做为主。铜锤的唱多用“立音”、“顺音”，以高亢洪亮、韵味醇厚取胜；架子花脸的唱多用“横音”、“炸音”，以叱咤峥嵘取胜。另外，京剧里的包公戏都以唱工繁重见长，例如《打龙袍》、《赤桑镇》、《铡美案》等戏。而且戏里的包公都勾着黑脸，因此黑头也就成为唱工花脸的代名词了。另外，像《草桥关》里的铫期、《白良关》里的尉迟恭、《牧虎关》里的高旺，还有《大回朝》里的闻太师等，都是以唱工为主的花脸戏，都属于所谓正净的范畴。',
                    costumes: ['images/custume/dahualian1.png'],
                    bvid: 'BV1rW41197Rd',
                    makeup: ['images/makeup/dahualian1.png'],
                    video: 'vedio/dahualian.mp4',
                    actors: [
                        {name: '康万生', img: 'images/actor/dahualian1.png'},
                           {name: '赵丽蓉', img: 'images/actor/dahualian2.png'},
                        {name: '邓沐玮', img: 'images/actor/dahualian3.png'},
                        {name: '孙震', img: 'images/actor/dahualian4.png'}
                    ]
                },
                { //二花脸
                    name: '二花脸',
                    feature: '豪放直率，工架威严',
                    content: '是架子花脸和二花脸的统称。架子花脸的范围特别广，以工架、念白、表演为主。当然也得有点唱工基础。比如《连环套·盗御马》，前半截《连环套·坐寨》是重唱工的，《盗御马》是工架与唱工并重的，最后《拜山》一折又是念白与工架并重的。所以演架子花的人，既要有很深厚的武功底子，又要善于表演，善于念白，还要能唱，并要有优美的工架。架子花脸的剧目相当多，像张飞的戏、牛皋的戏、李逵的戏、焦赞的戏、绝大多数的曹操戏，还有像《失街亭·空城计·斩马谡》里的马谡、《取洛阳》里的马武、《十三妹》里的邓九公、《审潘洪》里的潘洪、《李慧娘》里的贾似道、《群英会》里的黄盖、《法门寺》里的刘瑾、《连环套·盗御马》里的窦尔敦等等都是属于架子花脸的范畴。特别值得说一下的是曹操戏，化妆勾水白脸的，不用一般的油彩，而是用水粉加上一些黑笔道勾成水白脸的，这就是所谓奸臣脸，以曹操为最典型。实际上不止曹操一个人，很多历史上的奸臣，像赵高、董卓、贾似道、严嵩等，都是勾的水白脸。所以水白脸就形成了一种典型，只要勾这种脸，就一定是坏人。这样的角色都由架子花脸来应工。二花脸的戏比较少。虽然也勾同样的脸谱，可是表演风格有时近似丑角，有时候还扮演一些诙谐狡猾的角色。例如《法门寺》里的刘彪、《武松打店》里的大解差这类的角色。净行中资格最老的是架子花脸徐宝成，其次是庆春圃、钱宝峰。他们虽然没有创树一个属于自己的艺术流派，但却是架子花脸艺术的来源。架子花脸能自成一个艺术流派的当推黄润甫为首。',
                    costumes: ['images/custume/erhualian1.png'],
                    makeup: ['images/makeup/erhualian1.png'],
                    bvid: 'BV1Ab4y1T7Ur',
                    video: 'vedio/erhualian.mp4',
                    actors: [
                        {name: '郝寿臣', img: 'images/actor/erhualian1.png'},
                        {name: '尚长荣', img: 'images/actor/erhualian2.png'},
                        {name: '孟广禄', img: 'images/actor/erhualian3.png'},
                        {name: '袁世海', img: 'images/actor/erhualian4.png'}
                    ]
                },
                { //武二花
                    name: '武二花',
                    feature: '勇猛刚烈，武戏为主',
                    content: '又叫武净，或者叫摔打花脸，武花脸顾名思义，是全武行的花脸行当。他们必须练就勇猛、冲、率、迅捷的武打功夫和跌打翻扑的绝活儿，一般演武花脸的演员嗓音都不是很好，所以除了一些“全武行”的重头戏以外，大多以辅佐名角、与名角合作为主。好的武花脸演员大多都能为全剧的演出起到烘托、添色、“水涨船高”之作用。而迄今为止，能自成一派、有所建树的武花脸演员只有三位前人，他们就是钱金福、许德义和范宝亭。',
                    costumes: ['images/custume/wuerhua1.png'],
                    bvid: 'BV1eK4y1U7aT',
                    makeup: ['images/makeup/wuerhua1.png'],
                    video: 'vedio/wuerhua.mp4',
                    actors: [
                        {name: '赵永墩', img: 'images/actor/wuerhua1.png'},
                        {name: '刘砚亭', img: 'images/actor/wuerhua2.png'},
                        {name: '许徳义', img: 'images/actor/wuerhua3.png'}
                    ]
                },
                { //油花脸
                    name: '油花脸',
                    feature: '油彩重抹，性格粗犷',
                    content: '油花脸俗称毛净。多用垫胸、假臀等塑形扎扮（叫做扎判），以形象奇特笨重、舞蹈身段粗犷而妩媚多姿为其特点；有时用喷火、耍牙等特技。源于昆曲，《天下乐·嫁妹》的钟馗即油花脸的代表性形象。京剧受昆曲影响亦有此类角色，如《闹天宫》的巨灵神、《单刀会》的周仓等，但不另分油花脸一行，而由架子花脸或武花脸应工。',
                    costumes: ['images/custume/youhualian1.png'],
                    makeup: ['images/makeup/youhualian1.png'],
                    bvid: 'BV13s4y117UZ',
                    video: 'vedio/youhualian.mp4',
                    actors: [
                        {name: '张兰秦', img: 'images/actor/youhualian1.png'},
                        {name: '景荣庆', img: 'images/actor/youhualian2.png'},
                        {name: '李买刚', img: 'images/actor/youhualian3.png'},
                        {name: '乔国瑞', img: 'images/actor/youhualian4.png'}
                    ]
                }
            ]
        },
        {
            name: '丑',
            feature: '勾红脸角色，如关羽',
            symbol: 'image://https://example.com/hongsheng.png',
            children: [
                { //文丑
                    name: '文丑',
                    feature: '诙谐机敏，以念白见长',
                    content: '戏曲中丑角的一种，扮演性格滑稽的人物，以念白、做功为主。京剧里的一个行当，丑角包括文丑和武丑，文丑亦称小花脸或三花睑，武丑又称开口跳。文丑分为官文丑、方巾丑、茶衣丑、巾子丑和彩旦。传说当年唐明皇演戏，就是应工丑角，因皇帝的身份，演戏有诸多不便，为此皇帝特意在脸上挂一块白玉，久而久之，丑角的脸上就留下了——块白，这就是我们今天戏曲舞台上丑角所画脸谱中的白色“豆腐块儿”。当然这只是传说而已，在长期的戏曲发展史上，丑角的化妆根据人物的身份、年龄、性格、行为的不同和差异，也逐渐形成了一套完整的、系统的脸谱，如腰子型粉脸、圆形粉脸、枣核型粉脸、筝型粉脸、元宝型粉脸、丑老脸、丑破脸以及碎脸、揉脸和象形脸等。其中最典型的是方巾丑，脸部中央用白粉勾画—幅“豆腐块儿”型的白粉脸，因此观众一看见这块“豆腐块儿”就知道这个演员是丑角。',
                    costumes: ['images/custume/wenchou1.png'],
                    bvid: 'BV1fB4y1P7QG',
                    makeup: ['images/makeup/wenchou1.png'],
                    video: 'vedio/wenchou.mp4',
                    actors: [
                        {name: '赵春亮', img: 'images/actor/wenchou1.png'},
                        {name: '沈家林', img: 'images/actor/wenchou2.png'},
                        {name: '萧长华', img: 'images/actor/wenchou3.png'}
                    ]
                },
                { //武丑
                    name: '武丑',
                    feature: '身手敏捷，武打滑稽',
                    content: '武丑，戏曲中丑角的一种，扮演有武艺而性格滑稽的人物，偏重武工，也有人称为“开口跳”，以牙功见长，多为神出鬼没的武林人士。用倒八字形的“二挑髯”，穿紧身衣裤，步履轻盈，动作灵活、迅捷，可以从几米高处翻下，落地无声。在一次空难中，著名武丑演员张春华是唯一幸存者，可能同他身怀绝技有关。张春华演的《大破铜网阵》被誉为京剧武戏史上的一座丰碑。',
                    costumes: ['images/custume/wuchou1.png'],
                    bvid: 'BV18g4y1i7kT',
                    makeup: ['images/makeup/wuchou1.png'],
                    video: 'vedio/wuchou.mp4',
                    actors: [
                        {name: '徐孟珂', img: 'images/actor/wuchou1.png'},
                        {name: '张春华', img: 'images/actor/wuchou2.png'},
                        {name: '石晓亮', img: 'images/actor/wuchou3.png'},
                        {name: '胡小毛', img: 'images/actor/wuchou4.png'}
                    ]
                }
            ]
        }
    ]
};

// 初始化图表
const chart = echarts.init(document.getElementById('tree-container'));

// 配置选项
const option = {
    title: {
        text: '戏曲行当 - 生角分类体系',
        subtext: '点击节点展开/折叠分支',
        textStyle: {
            fontSize: 18,
            color: '#8B4513'
        },
         left: 'left'
    },
    tooltip: {
        formatter: ({ name, data }) => `
        <b style="color:#8B4513;font-size:16px">${name}</b>
        <hr style="margin:8px 0;border-color:#CDAA7D">
        <div style="color:#654321;max-width:300px">
            ${data.feature || '点击查看详细角色信息'}
        </div>
    `
    },
    series: [{
        type: 'tree',
        data: [Data],
        layout: 'orthogonal', // 正交布局
        orient: 'vertical',   // 垂直方向
        symbol: 'vertical',     // 默认节点形状
        expandAndCollapse: true,
        initialTreeDepth: 2,  // 初始展开层级
        symbol: 'path://M0,0 L10,0 L5,17 z', // 三角形符号
        symbolSize: [20, 16],
        itemStyle: {
            color: params => {
                const colors = {
                    '行当大类': '#8B4513',
                    '文生': '#B87333',
                    '武生': '#CD2626'
                };
                return colors[params.data.type] || '#666';
            },
            borderColor: '#654321',
            borderWidth: 1
        },
        ineStyle: {
            color: '#CD8500',
            width: 2,
            curveness: 0.3
        },
        label: {
            position: 'left',
            verticalAlign: 'middle',
            fontSize: 16,
            color: '#654321',
            rich: {
                type: {
                    fontSize: 12,
                    color: '#999',
                    padding: [2, 5],
                    backgroundColor: '#FAEBD7',
                    borderRadius: 3
                }
            },
            formatter: ({ name, data }) => {
                return `{name|${name}}${data.type ? '\n{type|' + data.type + '}' : ''}`;
            }
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(139,69,19,0.5)'
            }
        },
        animationDuration: 600
    }]
};

// 初始化渲染 把配置项给实例对象
chart.setOption(option);


// 添加初始化函数
function initLaosheng() {
    const laoshengNode = Data.children[0].children[0];
    
    // 更新所有板块
    updateRoleTitle(laoshengNode);
    updateFeatures(laoshengNode);
    updateCostumeGallery(laoshengNode);
    updateMakeupGallery(laoshengNode);
    updateVideoPlayer(laoshengNode);
    updateActorsGallery(laoshengNode);

    // 高亮树状图节点
    chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: chart._chartsMap.get('0-0')._dataIndex
    });
}

// 在图表渲染完成后调用
// chart.on('finished', initLaosheng);
// 在页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 延迟确保图表已初始化
    setTimeout(() => {
        initLaosheng();
        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: chart._chartsMap.get('0-0')._dataIndex
        });
    }, 500);
});


// 交互功能

// 1. 点击节点下钻
chart.on('click', params => {
    const data = params.data;

    // console.log('点击节点数据：', params.data);
    // 阻止默认展开行为
    params.event?.event?.stopPropagation();
    
   // 更新各板块内容
   updateFeatures(data);
   updateCostumeGallery(data);
   updateMakeupGallery(data);
   updateVideoPlayer(data);
   updateActorsGallery(data);
    updateRoleTitle(data);
});

//标题更新
function updateRoleTitle(data) {
    const titleEl = document.getElementById('current-role-title');
    titleEl.textContent = data.name && data.feature 
        ? `${data.name} - ${data.feature}`
        : '戏曲行当';
}

// 特征说明更新
function updateFeatures(data) {
    const container = document.querySelector('#features-content .feature-text');
    container.innerHTML = data.feature 
        ? `<p>${data.content}</p>`
        : `<p class="empty-tip">暂无特征说明</p>`;
}

// 服饰图库更新
function updateCostumeGallery(data) {
    const gallery = document.querySelector('#costume-gallery .gallery-grid');
    const content = data.costumes?.length ? data.costumes.map(img => `
        <div class="gallery-item">
            <img src="${img}" alt="戏曲服饰" 
                 style="width:100%; height:400px; object-fit: contain;">
        </div>
    `).join('') : '<p class="empty-tip">暂无服饰数据</p>';
    gallery.innerHTML = content;
}

// 妆容图库更新
function updateMakeupGallery(data) {
    const gallery = document.querySelector('#makeup-gallery .gallery-grid');
    const content = data.makeup?.length ? data.makeup.map(img => `
        <div class="gallery-item">
            <img src="${img}" alt="戏曲妆容" 
                 style="width:100%; height:400px; object-fit: contain;">
        </div>
    `).join('') : '<p class="empty-tip">暂无妆容数据</p>';
    gallery.innerHTML = content;
}

// 视频播放器更新
function updateVideoPlayer(data) {
    const player = document.querySelector('#video-player .video-wrapper');
    
    if (data?.bvid) {
        player.innerHTML = `
            <iframe 
                src="https://player.bilibili.com/player.html?bvid=${data.bvid}&high_quality=1&danmaku=0&autoplay=0" 
                width="100%" 
                height="500px" 
                scrolling="no" 
                frameborder="0" 
                allowfullscreen>
            </iframe>
        `;
    } else if (data?.video) {
        // 保留原有本地视频逻辑作为备用
        player.innerHTML = `
            <video controls style="width:100%">
                <source src="${data.video}" type="video/mp4">
            </video>
        `;
    } else {
        player.innerHTML = '<div class="empty-tip">暂无视频资料</div>';
    }
}

// 演员画廊更新
function updateActorsGallery(data) {
    const gallery = document.querySelector('#actors-gallery .actors-grid');
    const content = data.actors?.length ? data.actors.map(actor => `
        <div class="actor-card">
            <img src="${actor.img}" alt="${actor.name}" class="actor-avatar">
            <div class="actor-info">
                <h4>${actor.name}</h4>
            </div>
        </div>
    `).join('') : '<p class="empty-tip">暂无演员数据</p>';
    gallery.innerHTML = content;
}

// 窗口自适应
window.onresize = () => chart.resize();
})();




// 图表内容
// 确保在DOM加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function () {
    // 双轴折线图
    let trendChart = echarts.init(document.getElementById('trendChart'));
    let trendOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['地方戏曲类收入', '京剧、昆曲类收入', '地方戏曲类演出场次', '京剧、昆曲类演出场次'],
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2019', '2020', '2021', '2022', '2023']
        },
        yAxis: [
            {
                type: 'value',
                name: '收入（千万元）',
                position: 'left',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '演出场次（万场次）',
                position: 'right',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '地方戏曲类收入',
                type: 'line',
                yAxisIndex: 0,
                data: [108.40, 74.49, 88.02, 100.37, 85.45],
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#91cc75'
                },
                itemStyle: {
                    color: '#91cc75'
                }
            },
            {
                name: '京剧、昆曲类收入',
                type: 'line',
                yAxisIndex: 0,
                data: [20.16, 18.88, 19.39, 18.66, 14.42],
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#fac858'
                },
                itemStyle: {
                    color: '#fac858'
                }
            },

            {
                name: '地方戏曲类演出场次',
                type: 'line',
                yAxisIndex: 1,
                data: [84.9, 58.9, 65.9, 46.4, 34.7],
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#91cc75',
                    opacity: 0.5
                },
                itemStyle: {
                    color: '#91cc75',
                    opacity: 0.5
                }
            },
            {
                name: '京剧、昆曲类演出场次',
                type: 'line',
                yAxisIndex: 1,
                data: [2.2, 1.6, 1.7, 1.3, 1.1],
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#fac858',
                    opacity: 0.5
                },
                itemStyle: {
                    color: '#fac858',
                    opacity: 0.5
                }
            }
        ]
    };

    //饼图
    trendChart.setOption(trendOption);
    let distributionChart = echarts.init(document.getElementById('distributionChart'));
    let distributionOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['京剧、昆曲类', '地方戏曲类', '曲艺类']
        },
        series: [
            {
                name: '2024年从业人员占比',
                type: 'pie',
                radius: ['50%', '70%'], // 设置玫瑰图的内半径和外半径
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },

                data: [
                    { value: 0.075, name: '京剧、昆曲类' },
                    { value: 0.893, name: '地方戏曲类' },
                    { value: 0.032, name: '曲艺类' },
                ]
            }
        ]
    };
    distributionChart.setOption(distributionOption);
    distributionChart.setOption(distributionOption);
});
