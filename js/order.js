// 全局变量存储菜品数据
let allDishes = [];

function getApiType(frontendType) {
  const typeMap = {
    chinese: "中式快餐",
    western: "西式汉堡",
    japanese: "日式料理",
    korean: "韩式美食",
    hongkong: "港式茶点",
    sichuan: "川湘菜系",
    jiangzhe: "江浙菜系",
    vegan: "素食轻食",
    drink: "饮品甜点",
  };
  return typeMap[frontendType] || frontendType;
}
// 加入购物车功能
const cartBtns = document.querySelectorAll(".cart-btn-small");

cartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const dishName = button.dataset.dish;
    alert(`已将 ${dishName} 加入购物车！`);

    // 添加点击动画效果
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 300);
  });
});

// 菜单分类筛选
const menuLinks = document.querySelectorAll(".menu-index ul li a");
const dishesContainer = document.querySelector(".dish-list");

// 分类筛选逻辑
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    menuLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    const category = link.dataset.category;
    const filteredDishes =
      category === "all"
        ? allDishes
        : allDishes.filter((dish) => dish.type === getApiType(category)); // 使用 getApiType 转换

    renderDishes(filteredDishes);
  });
});

// 渲染菜品列表
function renderDishes(dishes) {
  console.log("正在渲染菜品:", dishes); // 调试用

    // 验证原始数据中的ID类型
  console.log("原始数据ID类型:", dishes.map(d => typeof d.id));

  const dishesContainer = document.querySelector(".dish-list");
  if (!dishesContainer) {
    console.error("渲染时无法找到.dish-list元素");
    return;
  }

  if (!dishes || dishes.length === 0) {
    dishesContainer.innerHTML = '<div class="no-dishes">暂无菜品数据</div>';
    return;
  }

 dishesContainer.innerHTML = dishes
  .map(
    (dish) => `
  <div class="dish-card" data-category="${dish.type}">
    ${dish.img ? `<img src="${dish.img}" alt="${dish.name}">` : '<div class="no-image">暂无图片</div>'}
    <div class="dish-header">
      <h4>${dish.name}</h4>
      <span>￥${dish.price?.toFixed(2) || "0.00"}</span>
      <button class="cart-btn-small" data-dish="${dish.name}" data-dish-id="${dish.id}"></button>
    </div> 
    <div class="dish-info">
      <span>${dish.type || "未分类"}</span> • ${dish.sales ?? 0}人已购买
    </div>
    <p class="dish-desc">${dish.description || "暂无描述"}</p>
  </div>
`
  )
  .join("");

  // 验证渲染后的ID类型
  const renderedIds = Array.from(document.querySelectorAll(".cart-btn-small"))
    .map(btn => typeof btn.dataset.dishId);
  console.log("渲染后ID类型:", renderedIds);

  // 重新绑定购物车按钮事件
  bindCartButtons();
}

// 添加到购物车
async function addToCart(dishId) {
  try {
    dishId = Number(dishId);
    if (isNaN(dishId)) {
      throw new Error("无效的菜品ID格式");
    }

    // 准备要发送的数据
    const requestData = {
      data: {
        id: dishId,
        type: 0,
      }
    };

    // 打印要发送给后端的数据
    console.log("发送给后端的数据:", JSON.stringify(requestData, null, 2));

    const response = await fetch(
      "http://8.134.154.79:8088/meal/order/addToShoppingList",
      {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    const result = await response.json();
    if (response.ok && result.code === 200) {
      return true;
    } else {
      throw new Error(result.msg || "添加购物车失败");
    }
  } catch (error) {
    console.error("添加购物车出错:", error);
    alert(error.message);
    return false;
  }
}

// 购物车按钮事件
function bindCartButtons() {
  document.querySelectorAll(".cart-btn-small").forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      const dishId = parseInt(button.dataset.dishId, 10);
      const dishName = button.dataset.dish;

if (isNaN(dishId) || !Number.isInteger(dishId) || dishId <= 0) {
        console.error("无效的菜品ID:", button.dataset.dishId);
        alert("菜品ID无效，必须是正整数");
        return;
      }

 try {
        // 显示加载状态
        button.disabled = true;
        button.classList.add("loading");
        
        const success = await addToCart(dishId);
        if (success) {
          alert(`已将 ${dishName} 加入购物车！`);
          button.classList.add("clicked");
          setTimeout(() => {
            button.classList.remove("clicked");
            button.disabled = false;
            button.classList.remove("loading");
          }, 300);
        }
      } catch (error) {
        console.error("添加购物车失败:", error);
        button.disabled = false;
        button.classList.remove("loading");
        alert(`添加失败: ${error.message}`);
      }
    });
  });
}

// 默认菜品数据
// const DEFAULT_DISHES = [
//   {
//     id: 1,
//     name: "老坛酸菜鱼饭",
//     price: 85.00,
//     type: "chinese",
//     description: "老坛酸菜搭配嫩滑鱼片，酸辣开胃，搭配香米饭一绝",
//     sales: 1892,
//     img: "./img/老坛酸菜鱼饭.png"
//   },
//   {
//     id: 2,
//     name: "黑椒牛柳意面",
//     price: 69.00,
//     type: "western",
//     description: "精选牛柳搭配黑椒酱炒制，搭配劲道意面，附赠例汤",
//     sales: 1543,
//     img: "img/黑椒牛柳意面.png"
//   },
//   // 添加更多默认菜品...
// ];

// 获取菜品数据
async function fetchDishes(type = "vegan") {
  try {
    const apiType = type === "all" ? "" : getApiType(type);
    const url = `http://8.134.154.79:8088/meal/order/getMenuByType?type=${apiType}`;
    
    const response = await fetch(url, {
      headers: { 
        "token": localStorage.getItem("token"),
        "Accept": "application/json"
      }
    });

    const result = await response.json();

    if (response.ok && result.code === 200 && Array.isArray(result.data)) {
        // 验证并确保所有ID是整数
      allDishes = result.data.map(dish => {
        if (typeof dish.id !== 'number') {
          console.warn(`菜品ID ${dish.id} 不是数字类型，尝试转换`);
          dish.id = parseInt(dish.id, 10);
        }
        return dish;
      });
      
      renderDishes(allDishes);
    }
    
    if (response.ok && result.code === 200 && Array.isArray(result.data)) {
      allDishes = result.data;
      renderDishes(allDishes);
    } else {
      // 直接显示错误提示，不尝试加载默认数据
      showError(result.msg || "获取菜品数据失败");
    }
  } catch (error) {
    console.error("获取菜品数据出错:", error);
    showError("网络连接失败，请稍后重试");
  }
}

// 显示错误信息的函数
function showError(message) {
  const dishesContainer = document.querySelector(".dish-list");
  if (dishesContainer) {
    dishesContainer.innerHTML = `
      <div class="error-message">
        <i class="icon-warning"></i>
        <p>${message}</p>
      </div>
    `;
  }
}

// 更新用户信息
async function updateUserInfo() {
  try {
    const response = await fetch(
      "http://8.134.154.79:8088/meal/user/getUserInfo",
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (result.code === 200 && result.data) {
        // 更新头部用户信息
        const userElement = document.querySelector(".user span");
        if (userElement) {
          userElement.textContent = result.data.userName;
        }

        // 更新头像（如果有）
        const avatarElement = document.querySelector(".user img");
        if (avatarElement && result.data.avatarUrl) {
          avatarElement.src = result.data.avatarUrl;
        }
      }
    }
  } catch (error) {
    console.error("更新用户信息失败:", error);
  }
}

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // 默认加载 "素食轻食" 分类
  fetchDishes("vegan"); // 改为明确请求有效分类
  updateUserInfo();

  // 分类点击事件（保持原有逻辑）
  const menuLinks = document.querySelectorAll(".menu-index ul li a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      menuLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      const category = link.dataset.category;
      fetchDishes(category); // 直接调用接口
    });
  });
});
