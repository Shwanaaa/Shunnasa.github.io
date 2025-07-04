let cartItems = [];

// API基础配置
const API_BASE_URL = "http://8.134.154.79:8088/meal/order";
const API_HEADERS = {
  token: localStorage.getItem("token"),
  "Content-Type": "application/json",
};

const cartItemsContainer = document.getElementById("cartItems");
const checkoutBtn = document.getElementById("checkoutBtn");
const badge = document.querySelector(".badge");

// 显示Toast提示函数
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "4px";
  toast.style.color = "white";
  toast.style.zIndex = "1000";
  toast.style.transition = "all 0.3s ease";

  // 根据类型设置背景色
  const colors = {
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
  };
  toast.style.backgroundColor = colors[type] || colors.info;

  toast.textContent = message;
  document.body.appendChild(toast);

  // 3秒后自动消失
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
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
     const avatarElement = document.querySelector(".user img");
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

// 获取购物车数据
function fetchCart() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("未登录，请先登录！");
    return;
  }

  API_HEADERS.token = token;
  console.log("开始调用获取购物车接口...");

  fetch(`${API_BASE_URL}/getShoppingList`, {
    method: "GET",
    headers: API_HEADERS,
  })
    .then((response) => {
      console.log("获取购物车接口响应状态码:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("获取购物车接口返回数据:", data);
      if (data.code === 200) {
        cartItems = data.data.map((item) => ({
          ...item,
          cnt: item.cnt || 1,
          selected: true, // 默认选中
        }));
        console.log("处理后的购物车数据:", cartItems);
        renderCart();
      } else {
        console.error("获取购物车失败:", data.msg);
        alert("获取购物车失败: " + data.msg);
      }
    })
    .catch((error) => {
      console.error("获取购物车出错:", error);
      alert("获取购物车时出错，请重试");
    });
}

// 渲染购物车
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>您的购物车是空的</h2>
                        <p>快去添加您喜欢的菜品吧，丰富美食等着您来挑选！</p>
                        <button class="btn btn-primary">去点餐</button>
                    </div>
                `;
    badge.textContent = "0";
    return;
  }

  // 更新商品总数量（所有商品的数量之和）
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.cnt || 1),
    0
  );
  badge.textContent = totalQuantity;

  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = `cart-item ${item.selected ? "selected" : ""}`;
    cartItemElement.dataset.id = item.id;

    cartItemElement.innerHTML = `
                    <div class="item-selector">
                        <input type="checkbox" ${
                          item.selected ? "checked" : ""
                        }>
                    </div>
                    <img src="https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/${
                      item.img
                    }" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-desc">${item.description}</p>
                        <div class="cart-item-bottom">
                            <div class="cart-item-price">￥${item.price.toFixed(
                              2
                            )}</div>
                            <div style="display: flex; align-items: center;">
                                <div class="cart-item-controls">
                                    <button class="quantity-btn decrease">-</button>
                                    <span class="quantity-display">${
                                      item.cnt
                                    }</span>
                                    <button class="quantity-btn increase">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

    cartItemsContainer.appendChild(cartItemElement);

    // 添加选择功能
    const checkbox = cartItemElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", function () {
      item.selected = this.checked;
      updateTotalPrice();
    });

    // 减少数量功能
    cartItemElement
      .querySelector(".decrease")
      .addEventListener("click", function () {
        const oldCnt = item.cnt;
        item.cnt--;

        const requestData = {
          data: {
            id: item.id,
            type: 0, // 0表示删除/减少
          },
        };

        console.log("减少商品数量，发送给后端的数据:", requestData);

        fetch(`${API_BASE_URL}/addToShoppingList`, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            console.log("响应状态:", response.status);
            return response.json().then((data) => {
              console.log("完整响应数据:", data);
              return data;
            });
          })
          .then((data) => {
            if (data.code === 200) {
              if (item.cnt <= 0) {
                // 数量减到0时从购物车中移除该商品
                cartItems = cartItems.filter(
                  (cartItem) => cartItem.id !== item.id
                );
                showToast("商品已移除", "success");
              } else {
                showToast("商品数量减少成功", "success");
              }
              renderCart();
            } else {
              console.error("减少商品失败:", data.msg);
              item.cnt = oldCnt;
              showToast(`操作失败: ${data.msg}`, "error");
              renderCart();
            }
          })
          .catch((error) => {
            console.error("减少商品出错:", error);
            item.cnt = oldCnt;
            showToast("网络错误，请重试", "error");
            renderCart();
          });
      });

    // 增加数量功能
    cartItemElement
      .querySelector(".increase")
      .addEventListener("click", function () {
        const oldCnt = item.cnt;
        item.cnt++;

        const requestData = {
          data: {
            id: item.id,
            type: 1, // 1表示添加/增加
          },
        };

        console.log("增加商品数量，发送给后端的数据:", requestData);

        fetch(`${API_BASE_URL}/addToShoppingList`, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            console.log("响应状态:", response.status);
            return response.json().then((data) => {
              console.log("完整响应数据:", data);
              return data;
            });
          })
          .then((data) => {
            if (data.code === 200) {
              showToast("商品数量增加成功", "success");
              renderCart();
            } else {
              console.error("增加商品失败:", data.msg);
              item.cnt = oldCnt;
              showToast(`操作失败: ${data.msg}`, "error");
              renderCart();
            }
          })
          .catch((error) => {
            console.error("增加商品出错:", error);
            item.cnt = oldCnt;
            showToast("网络错误，请重试", "error");
            renderCart();
          });
      });
  });

  // 更新总价
  updateTotalPrice();
}

// 更新选中商品数量
function updateSelectedCount() {
  const selectedCount = cartItems.filter((item) => item.selected).length;
  badge.textContent = selectedCount;
}

// 更新总价
function updateTotalPrice() {
  console.log("计算总价 - 当前购物车数据:", cartItems);
  const subtotal = cartItems.reduce((sum, item) => {
    // 默认选中（除非显式设置为 false）
    if (item.selected !== false) {
      const itemTotal = item.price * (item.cnt || 1);
      console.log(
        `商品 ${item.name} 单价: ${item.price}, 数量: ${item.cnt}, 小计: ${itemTotal}`
      );
      return sum + itemTotal;
    }
    return sum;
  }, 0);
  console.log("计算总价结果:", subtotal);

  const totalElement = document.querySelector(".summary-total .total");
  if (totalElement) {
    totalElement.textContent = `￥${subtotal.toFixed(2)}`;
  } else {
    console.error("未找到总价元素");
  }
}

// 结算功能
checkoutBtn.addEventListener("click", function () {
  console.log("当前购物车数据:", cartItems);
  const selectedItems = cartItems.filter((item) => item.selected);
  console.log("选中的商品:", selectedItems);

  if (selectedItems.length === 0) {
    alert("请选择要结算的商品！");
    return;
  }

  // 计算选中商品的总价（价格 × 数量 cnt）
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * (item.cnt || 1),
    0
  );

  console.log("总计金额：", totalPrice);

  const requestData = {
    data: { ids: selectedItems.map((item) => item.id) },
  };

  console.log("提交订单请求数据:", requestData);

  // 调用提交订单API
  fetch(`${API_BASE_URL}/orderSubmit`, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("订单提交完整响应:", data);
      if (data.code === 200) {
        // 显示成功消息
        showToast(data.msg || "订单提交成功！", "success");

        // 从购物车中移除已购买的商品
        cartItems = cartItems.filter((item) => !item.selected);
        renderCart();
      } else {
        showToast(data.msg || "订单提交失败", "error");
      }
    })
    .catch((error) => {
      console.error("提交订单出错:", error);
      alert("提交订单时出错，请重试");
    });
});

// 初始化购物车
renderCart();

//初始化代码
document.addEventListener("DOMContentLoaded", function () {
  console.log("购物车界面已加载，开始初始化...");

  // 检查token是否存在
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("用户未登录，无法获取购物车数据");
    alert("未登录，请先登录！");
    return;
  }

  console.log("检测到用户token:", token);

  // 初始化获取购物车数据
  fetchCart();
  updateUserInfo();
});

// 获取购物车数据
function fetchCart() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("获取购物车失败: token不存在");
    alert("未登录，请先登录！");
    return;
  }

  API_HEADERS.token = token;
  console.log("开始调用获取购物车接口...");

  fetch(`${API_BASE_URL}/getShoppingList`, {
    method: "GET",
    headers: API_HEADERS,
  })
    .then((response) => {
      console.log("响应状态:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("完整响应数据:", data);
      if (data.code === 200 && data.data) {
        cartItems = data.data.map((item) => ({
          ...item,
          cnt: item.cnt || 1,
          selected: true,
        }));
        console.log("处理后的购物车数据:", cartItems);
        renderCart();
      } else {
        console.error("获取购物车失败:", data.msg);
        alert(data.msg || "获取购物车失败");
      }
    })
    .catch((error) => {
      console.error("获取购物车出错:", error);
      alert(`获取购物车时出错: ${error.message}`);
    });
}
