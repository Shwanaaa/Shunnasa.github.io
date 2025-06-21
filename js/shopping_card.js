// 购物车数据
const cartItems = [
  {
    id: 1,
    name: "老坛酸菜鱼饭",
    price: 85.0,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
    desc: "老坛酸菜搭配嫩滑鱼片，酸辣开胃，搭配香米饭一绝",
    quantity: 1,
    selected: true,
  },
  {
    id: 2,
    name: "黑椒牛柳意面",
    price: 69.0,
    image:
      "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
    desc: "精选牛柳搭配黑椒酱炒制，搭配劲道意面，附赠例汤",
    quantity: 2,
    selected: true,
  },
  {
    id: 3,
    name: "泰式冬阴功汤",
    price: 59.0,
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7b1e16b9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
    desc: "泰国特色香料熬制汤底，搭配鲜虾、蘑菇，酸辣浓郁",
    quantity: 1,
    selected: true,
  },
];

const cartItemsContainer = document.getElementById("cartItems");
const checkoutBtn = document.getElementById("checkoutBtn");
const badge = document.querySelector(".badge");

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
    checkoutBtn.style.display = "none";
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
                    <img src="${item.image}" alt="${
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
                                      item.quantity
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

    // 添加减少数量功能
    cartItemElement
      .querySelector(".decrease")
      .addEventListener("click", function () {
        if (item.quantity > 1) {
          item.quantity--;
          renderCart();
        }
      });

    // 添加增加数量功能
    cartItemElement
      .querySelector(".increase")
      .addEventListener("click", function () {
        item.quantity++;
        renderCart();
      });

    // 添加移除商品功能
    cartItemElement
      .querySelector(".remove-btn")
      .addEventListener("click", function () {
        const index = cartItems.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          cartItems.splice(index, 1);
          renderCart();
        }
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
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + 8 - 20; // 配送费8元，优惠20元

  document.querySelector(
    ".summary-item:first-child .summary-value"
  ).textContent = `￥${subtotal.toFixed(2)}`;
  document.querySelector(".total").textContent = `￥${total.toFixed(2)}`;
}

// 结算功能
checkoutBtn.addEventListener("click", function () {
  const selectedItems = cartItems.filter((item) => item.selected);

  if (selectedItems.length === 0) {
    alert("请选择要结算的商品！");
    return;
  }

  // 创建订单详情
  let orderDetails =
    '<div style="padding:30px;max-width:500px;background:white;border-radius:15px;text-align:center;">';
  orderDetails +=
    '<i class="fas fa-check-circle" style="font-size:60px;color:#4CAF50;margin-bottom:20px;"></i>';
  orderDetails +=
    '<h2 style="font-size:28px;margin-bottom:15px;color:#333;">订单提交成功！</h2>';
  orderDetails +=
    '<p style="color:#666;margin-bottom:30px;font-size:18px;">您的订单已成功提交，我们将尽快为您准备美食</p>';

  orderDetails +=
    '<div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:25px;">';
  orderDetails +=
    '<h3 style="font-size:22px;margin-bottom:15px;color:#333;text-align:left;">订单详情</h3>';

  let total = 0;
  selectedItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    orderDetails += `
                    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;text-align:left;">
                        <div>
                            <strong>${item.name} × ${item.quantity}</strong>
                            <div style="color:#666;font-size:15px;">${
                              item.desc
                            }</div>
                        </div>
                        <div style="font-weight:bold;color:#ff7c2d;">￥${itemTotal.toFixed(
                          2
                        )}</div>
                    </div>
                `;
  });

  orderDetails +=
    '<div style="display:flex;justify-content:space-between;padding:15px 0;font-size:18px;font-weight:bold;border-top:2px solid #eee;margin-top:10px;">';
  orderDetails += "<span>总计：</span>";
  orderDetails += `<span style="color:#ff7c2d;">￥${(total + 8 - 20).toFixed(
    2
  )}</span>`;
  orderDetails += "</div></div>";

  orderDetails +=
    '<button style="padding:12px 35px;background:linear-gradient(to right, #ff7c2d, #fcbe11);color:white;border:none;border-radius:30px;font-size:18px;font-weight:bold;cursor:pointer;">查看订单详情</button>';
  orderDetails += "</div>";

  // 创建模态框
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

  // 点击模态框背景关闭
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
});

// 初始化购物车
renderCart();
