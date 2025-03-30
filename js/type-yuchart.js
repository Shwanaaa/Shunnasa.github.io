const yuData = {
    name: "豫剧流派",
    children: [
      {
        name: "老生",
        children: [
          { name: "唐门（唐玉成）", value: 5 },
          { name: "唐派（唐喜成）", value: 5 },
          { name: "刘派（刘忠河）", value: 5 }
        ]
      },
      {
        name: "武生", 
        children: [
          { name: "王派（王二顺）", value: 5 }
        ]
      },
      {
        name: "小生",
        children: [
          { name: "黄派（黄儒秀）", value: 5 },
          { name: "刘派（刘法印）", value: 5 },
          { name: "赵派（赵义庭）", value: 5 },
          { name: "王派（王素君）", value: 5 }
        ]
      },
      {
        name: "正净",
        children: [
          { name: "李派（李斯忠）", value: 5 },
          { name: "吴派（吴心平）", value: 5 }
        ]
      },
      {
        name: "丑",
        children: [
          { name: "牛派（牛得草）", value: 5 },
          { name: "高派（高兴旺）", value: 5 }
        ]
      },
      {
        name: "旦",
        children: [
          { name: "张派（张岫云）", value: 5 },
          { name: "王派（王秀兰）", value: 5 },
          { name: "宋派（宋桂玲）", value: 5 },
          { 
            name: "六大名旦",
            children: [
              { name: "崔兰田", value: 5 },
              { name: "桑振君", value: 5 },
              { name: "陈素真", value: 5 },
              { name: "常香玉", value: 5 },
              { name: "马金凤", value: 5 },
              { name: "阎立品", value: 5 }
            ]
          },
          { name: "武旦（王敬先）", value: 5 }
        ]
      }
    ]
  };
  
  // 导出数据
  window.yuData = yuData;