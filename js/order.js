let allDishes = []; // 全局变量存储菜品数据
let cartItems = {}; // 全局变量存储购物车数据

function getApiType(frontendType) {
  const typeMap = {
    all: "全部菜品",
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
    .map((dish) => {
      // 处理图片URL - 拼接基础URL
      const imgUrl = dish.img 
        ? `https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/${dish.img.replace(/^\//, '')}` 
        : null;
      
      const cartQuantity = cartItems[dish.id]?.quantity || 0;

      return `
  <div class="dish-card" data-category="${dish.type}" data-dish-id="${dish.id}">
    ${imgUrl 
      ? `<img src="${imgUrl}" alt="${dish.name}" 
           onerror="this.onerror=null;this.src='default-dish.jpg'">` 
      : '<div class="no-image">暂无图片</div>'}
    <div class="dish-header">
      <h4>${dish.name}</h4>
      <span>￥${dish.price?.toFixed(2) || "0.00"}</span>
      <div class="quantity-control">
    <button class="quantity-btn minus-btn" data-dish-id="${dish.id}" ${cartQuantity <= 0 ? 'disabled' : ''}>-</button>
    <span class="quantity-display">${cartQuantity}</span>
    <button class="quantity-btn plus-btn" data-dish-id="${dish.id}">+</button>
  </div>
    </div>
    <div class="dish-info">
      <span>${dish.type || "未分类"}</span> • ${dish.sales ?? 0}人已购买
    </div>
    <p class="dish-desc">${dish.description || "暂无描述"}</p>
  </div>
`;
    })
    .join("");

  // 绑定商品选购显示按钮事件
  bindQuantityButtons();
}

// 绑定加减按钮事件
function bindQuantityButtons() {
  // 先移除旧的事件监听器，防止重复绑定
  document.querySelectorAll('.plus-btn, .minus-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  // 加号按钮
  document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const dishId = parseInt(btn.dataset.dishId);
      btn.disabled = true;
      try {
        await updateCartQuantity(dishId, 1);
      } finally {
        btn.disabled = false;
      }
    });
  });

  // 减号按钮
  document.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const dishId = parseInt(btn.dataset.dishId);
      const currentQuantity = cartItems[dishId]?.quantity || 0;
      if (currentQuantity <= 0) return;
      
      btn.disabled = true;
      try {
        await updateCartQuantity(dishId, -1);
      } finally {
        btn.disabled = false;
      }
    });
  });
}

// 更新购物车数量
async function updateCartQuantity(dishId, change) {
  try {
    await fetchCartItems();

    const currentQuantity = cartItems[dishId]?.quantity || 0;
    const newQuantity = currentQuantity + change;
    
    if (newQuantity < 0) return; // 防止负数

    // 获取菜品信息
    const dish = allDishes.find(d => d.id === dishId);
    if (!dish) {
      throw new Error("找不到对应菜品");
    }

    // 调用接口
    const success = await addToCart(dishId, change > 0 ? 1 : 0);
    
    if (success) {
      // 更新本地购物车数据
      if (newQuantity === 0) {
        delete cartItems[dishId];
        showToast(`${dish.name}已从购物车移除`);
      } else {
        cartItems[dishId] = {
          quantity: newQuantity,
          name: dish.name,
          price: dish.price
        };
        showToast(change > 0 
          ? `${dish.name}已添加到购物车` 
          : `${dish.name}已从购物车减少`);
      }
    
      // 更新UI
      updateCartUI(dishId, newQuantity);
      
      // 更新购物车总数显示
      updateCartTotal();
    }
  } catch (error) {
    console.error("更新购物车数量失败:", error);
    showToast(`操作失败: ${error.message}`, 'error');
  }
}

//商品总数更新
function updateCartTotal() {
  const total = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalElement = document.querySelector('.cart-total');
  if (cartTotalElement) {
    cartTotalElement.textContent = total > 0 ? total : '';
  }
}

// 添加提示框
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

// 更新UI显示
function updateCartUI(dishId, quantity) {
  // 更新数量显示
  const quantityDisplays = document.querySelectorAll(`.dish-card[data-dish-id="${dishId}"] .quantity-display`);
  quantityDisplays.forEach(display => {
    display.textContent = quantity;
  });

  // 更新减号按钮状态
  const minusButtons = document.querySelectorAll(`.dish-card[data-dish-id="${dishId}"] .minus-btn`);
  minusButtons.forEach(btn => {
    btn.disabled = quantity <= 0;
  });
}

// 添加到购物车
async function addToCart(dishId, type = 1) {
  try {
    dishId = Number(dishId);
    if (isNaN(dishId)) {
      throw new Error("无效的菜品ID格式");
    }

    const requestData = {
      data: {
        id: dishId,
        type: type
      }
    };

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
      await fetchCartItems();
      return true;
    } else {
      throw new Error(result.msg || "操作失败");
    }
  } catch (error) {
    console.error("操作失败:", error);
    throw error;
  }
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

// 在页面加载时获取购物车数据
async function fetchCartItems() {
  try {
    const response = await fetch(
      "http://8.134.154.79:8088/meal/order/getShoppingList",
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
          "Accept": "application/json",
        },
      }
    );

    const result = await response.json();
    if (response.ok && result.code === 200 && Array.isArray(result.data)) {
      // 转换购物车数据格式
      cartItems = {};
      result.data.forEach(item => {
        cartItems[item.id] = {
          quantity: item.cnt || item.quantity || 0,
          name: item.name
        };
      });
      console.log('购物车数据里的数据已同步:', cartItems);
      return true;
    }
    return false;
  } catch (error) {
    console.error("获取购物车数据失败:", error);
    showToast("获取购物车数据失败，请刷新重试", 'error');
    return false;
  }
}

// 获取菜品数据
async function fetchDishes(type = "all") {
  try {
    const apiType = getApiType(type); 
    const url = `http://8.134.154.79:8088/meal/order/getMenuByType?type=${encodeURIComponent(apiType)}`;

    console.log('正在请求URL:', url); // 记录请求的完整URL
    
    const response = await fetch(url, {
      headers: { 
        "token": localStorage.getItem("token"),
        "Accept": "application/json"
      }
    });

    console.log('响应状态:', response.status); // 记录HTTP状态码

    const result = await response.json();
    console.log('完整响应数据:', result); // 记录完整的响应数据

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

// 统一处理图片URL
function processImageUrl(url) {
  if (!url) return null;

  // 替换旧域名
  if (url.includes('8.134.154.79')) {
    return url.replace(
      /http:\/\/8\.134\.154\.79(:8088)?\//,
      'https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/'
    );
  }

  // 如果不是完整的 URL（不以 http 开头），则添加前缀
  if (!url.startsWith('http')) {
    return `https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/${url.replace(/^\//, '')}`;
  }

  return url;
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

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`);
    }

    const result = await response.json();
    console.log('用户信息响应:', result); // 调试日志

    if (result.code === 200 && result.data) {
      // 更新头部用户信息
      const userElement = document.querySelector(".user span");
      if (userElement) {
        userElement.textContent = result.data.userName || '未设置用户名';
      }

      // 更新头像（如果有）
      const avatarElement = document.getElementById("header-avatar");
      if (avatarElement) {
        if (result.data.avatar) {
          const processedUrl = processImageUrl(result.data.avatar);
          const finalUrl = `${processedUrl}?t=${Date.now()}`;
          avatarElement.src = finalUrl;
          console.log('头像更新成功:', finalUrl);
          
          // 错误处理
          avatarElement.onerror = () => {
            console.error('头像加载失败，使用默认头像');
            avatarElement.src = './img/user.png';
          };
        } else {
          console.warn('头像URL为空，使用默认头像');
          avatarElement.src = './img/user.png';
        }
      } else {
        console.error('未找到头像元素');
      }
    } else {
      console.error('获取用户信息失败:', result.msg);
    }
  } catch (error) {
    console.error("更新用户信息失败:", error);
  }
}

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    // 先获取购物车数据
    await fetchCartItems();
    
    // 更新购物车总数显示
    updateCartTotal();

    // 设置默认选中"全部菜品"
    const defaultLink = document.querySelector('.menu-index ul li a[data-category="all"]');
    if (defaultLink) {
      defaultLink.classList.add("active");
    }

    // 默认加载全部菜品
    await fetchDishes("all");
    await updateUserInfo();
    
    // 确保按钮事件绑定
    bindQuantityButtons();
  } catch (error) {
    console.error("初始化失败:", error);
    showToast("页面初始化失败，请刷新重试", 'error');
  }
});
