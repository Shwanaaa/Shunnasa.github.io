document.addEventListener('DOMContentLoaded', function () {
    // 颜色对应的图片链接数组
    const colorImages = {
        red: "./images/face/1.png",
        purple: "./images/face/purple.png",
        pink: "./images/face/pink.png",
        yellow: "./images/face/yellow.png",
        green: "./images/face/green.png",
        blue: "./images/face/bule.png",
        gold: "./images/face/gold.png",
        white: "./images/face/white.png",
        black: "./images/face/black.png"
    };

    // 谱系结构对应的图片链接数组
    const spectrumImages = {
        wholeFace: "./images/face/1.png",
        threeTiles: "./images/face/2.png",
        flowerThreeTiles: "./images/face/3.png",
        sixDivisions: "./images/face/4.png",
        crossGate: "./images/face/5.png",
        shatteredFlower: "./images/face/6.png",
        yuanbaoFace: "./images/face/7.png",
        xiangxingFace: "./images/face/8.png",
        monkTaoist: "./images/face/9.png",
        crookedFace: "./images/face/10.png",
        eunuchFace: "./images/face/11.png",
        godFace: "./images/face/12.png",
        clownFace: "./images/face/13.png"
    };

    // 颜色tab切换
    const colorTabs = document.querySelectorAll('.color-tab');
    const colorImg = document.getElementById('colorImg');
    const colorDesc = document.getElementById('colorDesc');

    const colorDescriptions = {
        red: "红色一般用来表示耿直、忠义、有血性，多表现正面角色。忠勇良将、有道神仙勾画红色脸谱，如关羽、姜维等。",
        purple: "紫色是红色和黑色的中间色，其表示的象征意义也介于红黑之间，一般表示肃穆稳重，刚正威严，富有正义感。",
        pink: "在京剧脸谱中，用粉红色代表年老的忠贞角色。",
        yellow: "在京剧脸谱中，用黄色寓意人物骁勇剽悍，或凶暴残忍，所以黄色脸谱一般用于勇猛而暴躁的人物。",
        green: "在京剧脸谱中，绿色脸谱一般用来表示勇猛、猛撞、暴躁的任务，与黑色脸谱有相似的寓意。",
        blue: "在京剧脸谱中，蓝色与绿色的含义相近，都是黑色的延伸，表示人物性格刚强，豪爽。",
        gold: "金银色在神怪脸谱中应用较为广泛，用来表示神仙的金光普照，鬼怪的青面獠牙。",
        white: "京剧中常常用白色脸谱来表现奸邪的反面角色，表明其奸诈多疑。此外，鹤发童颜的老英雄、将官以及和尚、太监等角色也可以画白色脸谱。",
        black: "黑色脸谱一般用于正直无私，刚正不阿以及性格直爽刚毅而勇猛的人物。"
    };

    colorTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            colorTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const color = this.getAttribute('data-color');
            colorDesc.textContent = colorDescriptions[color];

            // 动态更新图片
            colorImg.src = colorImages[color];
            colorImg.alt = `${color}脸谱示例`;
        });
    });

    // 谱系结构tab切换
    const spectrumTabs = document.querySelectorAll('.tab');
    const spectrumImg = document.getElementById('spectrumImg');
    const spectrumDesc = document.getElementById('spectrumDesc');

    const spectrumDescriptions = {
        wholeFace: "整脸：整个面部涂一种颜色为主色，再勾眉、眼、鼻、口的轮廓，然后再勾画整个面部肌肉的纹理，表现出任务的神色和气质。",
        threeTiles: "三块脸：在眉、眼、鼻三处突出画出眉窝、眼窝，鼻窝，形似盖在脸上的三块瓦。'三块瓦'要求中正、对称，即鼻窝中正，两眼窝对称。",
        flowerThreeTiles: "花三块：在三块瓦脸的基础上，于眉、眼和鼻窝部位加画比较复杂的色彩和纹饰，以表现人物性格的多重性。",
        sixDivisions: "六分脸：由整脸变化而来，保留脸颊主色，把脑门的主色缩为窄窄一条使面部主色占面积的十分之六而得名。",
        crossGate: "十字门脸：由三块瓦脸演变而来，用抽象的手法减去两颊主色，仅以自鼻端至脑门的色条表示人物面部主色。",
        shatteredFlower: "碎花脸：由花三块瓦脸演变而来，减去两颊主色，只留正额主色，然后在脸上各个部位增加复杂复杂的辅色和复杂的纹理。",
        yuanbaoFace: "元宝脸：由三块瓦脸演变而来，脑门保留原来的肤色或者揉微红色，两颊涂白，形成元宝形式，用以表示身份不高的人物。",
        xiangxingFace:"象形脸：由'六分脸'演变而来，以'象'形来表示人物的形象，象形的大小和颜色都有变化。象形的大小和颜色都有变化。象形的大小和颜色都有变化。",
        monkTaoist: "僧道脸：它的特征是腰子眼窝、花鼻窝、花嘴岔，脑门还会勾一个红色的舍利珠圆光，或是九个点，表示其要进入佛门接受戒律。所用颜色多为白色、红色、黄色、蓝色等，但以白色为主，髯口处挂上'虬'和'髯'字，还会使用光嘴岔。",
        crookedFace: "歪脸：此谱类似'碎花脸' '三块脸'，只是勾嘴、眼时线条不对称，时无关错位，呈歪状。色彩因人而异，多种多样。表现相貌丑陋歪嘴眼斜的坏人形象。",
        eunuchFace: "太监脸：专用来表现擅权害人的宦官，色彩只有红白两种，形式近似'整脸'与'三块瓦脸'，只是夸张太监的特点；脑门勾个圆光，以示其阉割净身，自诩为佛门弟子。脑门和两颊的胖纹，表现出养尊处优的神态。",
        godFace: "神仙脸：由'整脸' '三块瓦脸'发展而来，都用来表现神、佛的面貌，构图取法佛像。主要用金、银色，或在辅色中添勾金、银色线条和涂色块，以示神圣威严。",
        clownFace: "丑角脸：又名'三花脸'或'小花脸'，特点是在鼻梁中心抹一个白色'豆腐块'，用漫画的手法表现人物的喜剧特征。"
    };

    spectrumTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            spectrumTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            spectrumDesc.textContent = spectrumDescriptions[tabId];

            // 动态更新图片
            spectrumImg.src = spectrumImages[tabId];
            spectrumImg.alt = `${tabId}示例`;
        });
    });
});
  