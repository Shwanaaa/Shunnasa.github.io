// 购物车数据
// const cartItems = [
//   {
//     id: 1,
//     name: "老坛酸菜鱼饭",
//     price: 85.0,
//     image:
//       "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     desc: "老坛酸菜搭配嫩滑鱼片，酸辣开胃，搭配香米饭一绝",
//     quantity: 1,
//     selected: true,
//   },
//   {
//     id: 2,
//     name: "黑椒牛柳意面",
//     price: 69.0,
//     image:
//       "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     desc: "精选牛柳搭配黑椒酱炒制，搭配劲道意面，附赠例汤",
//     quantity: 2,
//     selected: true,
//   },
//   {
//     id: 3,
//     name: "泰式冬阴功汤",
//     price: 59.0,
//     image:
//       "https://images.unsplash.com/photo-1582878826629-29b7b1e16b9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     desc: "泰国特色香料熬制汤底，搭配鲜虾、蘑菇，酸辣浓郁",
//     quantity: 1,
//     selected: true,
//   },
// ];

let cartItems = [];

// API基础配置
const API_BASE_URL = "http://8.134.154.79:8088/meal/order";
const API_HEADERS = {
  token: localStorage.getItem("token"),
  'Content-Type': 'application/json'
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
    info: "#2196F3"
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
    method: 'GET',
    headers: API_HEADERS
  })
  .then(response => {
    console.log("获取购物车接口响应状态码:", response.status);
    return response.json();
  })
  .then(data => {
    console.log("获取购物车接口返回数据:", data);
    if (data.code === 200) {
      cartItems = data.data;
      renderCart();
    } else {
      console.error("获取购物车失败:", data.msg);
      alert("获取购物车失败: " + data.msg);
    }
  })
   .catch(error => {
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
    // checkoutBtn.style.display = "none";
    return;
  }

  // 更新商品数量
  const selectedCount = cartItems.filter((item) => item.selected).length;
  badge.textContent = selectedCount;

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
                    <img src="https://jayma05-1326851618.cos.ap-guangzhou.myqcloud.com/${item.img}" alt="${
      item.name
    }" class="cart-item-img">
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-desc">${item.desc}</p>
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
                                <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                `;

    cartItemsContainer.appendChild(cartItemElement);

    // 添加选择功能
    const checkbox = cartItemElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", function () {
      item.selected = this.checked;
      cartItemElement.classList.toggle("selected", this.checked);
      updateSelectedCount();
    });

    // 减少数量功能
    cartItemElement.querySelector(".decrease").addEventListener("click", function() {
      if (item.cnt > 1) {
        const oldCnt = item.cnt;
        item.cnt--;
        
         const requestData = {
          data: {
            id: item.id,
            type: 0  // 0表示删除/减少
          }
        };
        
    console.log("减少商品数量，发送给后端的数据:", requestData);

        fetch(`${API_BASE_URL}/addToShoppingList`, {
          method: 'POST',
          headers: API_HEADERS,
          body: JSON.stringify(requestData)
        })
        .then(response => {
          console.log("响应状态:", response.status);
          return response.json().then(data => {
            console.log("完整响应数据:", data);
            return data;
          });
        })
        .then(data => {
          if(data.code === 200) {
            showToast("商品数量减少成功", "success");
            renderCart();
          } else {
            console.error("减少商品失败:", data.msg);
            item.cnt = oldCnt;
            showToast(`操作失败: ${data.msg}`, "error");
            renderCart();
          }
        })
        .catch(error => {
          console.error("减少商品出错:", error);
          item.cnt = oldCnt;
          showToast("网络错误，请重试", "error");
          renderCart();
        });
      } else {
        showToast("商品数量不能少于1", "warning");
      }
    });

    // 增加数量功能
    cartItemElement.querySelector(".increase").addEventListener("click", function() {
      const oldCnt = item.cnt;
      item.cnt++;
      
       const requestData = {
        data: {
          id: item.id,
          type: 1  // 1表示添加/增加
        }
      };
  
  console.log("增加商品数量，发送给后端的数据:", requestData);

      fetch(`${API_BASE_URL}/addToShoppingList`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(requestData)
      })
      .then(response => {
        console.log("响应状态:", response.status);
        return response.json().then(data => {
          console.log("完整响应数据:", data);
          return data;
        });
      })
      .then(data => {
        if(data.code === 200) {
          showToast("商品数量增加成功", "success");
          renderCart();
        } else {
          console.error("增加商品失败:", data.msg);
          item.cnt = oldCnt;
          showToast(`操作失败: ${data.msg}`, "error");
          renderCart();
        }
      })
      .catch(error => {
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
  // 计算所有选中商品的总价（价格 × 数量 cnt）
  const subtotal = cartItems.reduce(
    (sum, item) => {
      if (item.selected) {
        return sum + (item.price * (item.cnt || 1)); // 使用 cnt 计算数量
      }
      return sum;
    },
    0
  );

  const totalElement = document.querySelector(".summary-total .total");
  if (totalElement) {
    totalElement.textContent = `￥${subtotal.toFixed(2)}`;
  } else {
    console.warn('未找到总价元素，请检查HTML结构');
  }
}

// 结算功能
checkoutBtn.addEventListener("click", function () {
  const selectedItems = cartItems.filter((item) => item.selected);

  if (selectedItems.length === 0) {
    alert("请选择要结算的商品！");
    return;
  }

  // 计算选中商品的总价（价格 × 数量 cnt）
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + (item.price * (item.cnt || 1)),
    0
  );

  // 调用提交订单API
  fetch(`${API_BASE_URL}/orderSubmit`, {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify({
      data: {
        ids: selectedItems.map(item => item.id),
        totalPrice: totalPrice // 可选：将计算的总价传给后端
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.code === 200) {
      // 显示成功模态框（含总价信息）
      let orderDetails = `
        <div style="padding:30px;max-width:500px;background:white;border-radius:15px;text-align:center;">
          <i class="fas fa-check-circle" style="font-size:60px;color:#4CAF50;margin-bottom:20px;"></i>
          <h2 style="font-size:28px;margin-bottom:15px;color:#333;">${data.msg}</h2>
          <p style="color:#666;margin-bottom:10px;font-size:18px;">订单总价：￥${totalPrice.toFixed(2)}</p>
          <p style="color:#666;margin-bottom:30px;font-size:18px;">我们将尽快为您准备美食！</p>
          <button style="padding:12px 35px;background:linear-gradient(to right, #ff7c2d, #fcbe11);color:white;border:none;border-radius:30px;font-size:18px;font-weight:bold;cursor:pointer;">查看订单详情</button>
        </div>
      `;

      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";
      modal.innerHTML = orderDetails;

      document.body.appendChild(modal);

      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });

      // 从购物车中移除已购买的商品
      for (let i = cartItems.length - 1; i >= 0; i--) {
        if (cartItems[i].selected) {
          cartItems.splice(i, 1);
        }
      }
      renderCart();
    } else {
      alert("订单提交失败: " + data.msg);
    }
  })
  .catch(error => {
    console.error("提交订单出错:", error);
    alert("提交订单时出错，请重试");
  });
});
// 初始化购物车
renderCart();

//初始化代码
document.addEventListener('DOMContentLoaded', function() {
  console.log('购物车界面已加载，开始初始化...');
  
  // 检查token是否存在
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn('用户未登录，无法获取购物车数据');
    alert("未登录，请先登录！");
    return;
  }
  
  console.log('检测到用户token:', token);
  
  // 初始化获取购物车数据
  fetchCart();
  
});

// 修改fetchCart函数，增加更多调试信息
function fetchCart() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error('获取购物车失败: token不存在');
    alert("未登录，请先登录！");
    return;
  }

  API_HEADERS.token = token;
  console.log("开始调用获取购物车接口...");
  console.log("请求URL:", `${API_BASE_URL}/getShoppingList`);
  console.log("请求方法: GET");
  console.log("请求头:", API_HEADERS);

  fetch(`${API_BASE_URL}/getShoppingList`, {
    method: 'GET',
    headers: API_HEADERS
  })
  .then(response => {
    console.log("获取购物车接口响应状态码:", response.status);
    console.log("响应头:", response.headers);
    return response.json();
  })
  .then(data => {
    console.log("获取购物车接口返回完整数据:", data);
    if (data.code === 200) {
      console.log("成功获取购物车数据，数据量:", data.data.length);
      cartItems = data.data;
      renderCart();
    } else {
      console.error("获取购物车失败:", data.msg);
      alert("获取购物车失败: " + data.msg);
    }
  })
  .catch(error => {
    console.error("获取购物车出错:", error);
    console.error("错误详情:", error.stack);
    alert("获取购物车时出错，请重试");
  });
}