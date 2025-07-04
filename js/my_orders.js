document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const manageBtn = document.getElementById('manageOrdersBtn');
    const orderList = document.querySelector('.order-list'); // 修改为类选择器
    const modal = document.getElementById('confirmationModal');
    const cancelBtn = document.getElementById('cancelDeleteBtn');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    // 状态变量
    let currentOrderToDelete = null;
    let isManaging = false;

    // 初始化：获取订单数据
    fetchOrders();
    updateUserInfo();

    // 获取订单数据
    function fetchOrders() {
        // 显示加载状态
        orderList.innerHTML = '<p>加载中...</p>';

        fetch('http://8.134.154.79:8088/meal/order/getHistoryOrders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem("token")
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            if (data.code === 200) {
                console.log('后端返回的数据:', data);
                renderOrders(data.data);
            } else {
                throw new Error(data.msg || '获取订单失败');
            }
        })
        .catch(error => {
            console.error('获取订单失败:', error);
            orderList.innerHTML = `<p>加载失败: ${error.message}</p>`;
            
            // 如果是因为token无效，可以跳转到登录页
            if (error.message.includes('未授权') || error.message.includes('token')) {
                window.location.href = '/login.html';
            }
        });
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

    // 渲染订单列表
    function renderOrders(orders) {
        if (!orders || orders.length === 0) {
            orderList.innerHTML = '<p>暂无历史订单</p>';
            return;
        }

        orderList.innerHTML = '';
        orders.forEach(order => {
            if (!order.name || !order.createTime || !order.price || !order.number) {
                console.warn('订单数据不完整:', order);
                return;
            }

            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.dataset.orderId = order.number;
            
            // 根据返回的数据格式直接使用name字段（已包含菜品信息）
            orderItem.innerHTML = `
                <h4>订单号: ${order.number}</h4>
                <div class="order-info">
                    <div>
                        <p><strong>下单时间: </strong>${order.createTime}</p>
                        <p><strong>菜品: </strong>${order.name}</p>
                    </div>
                    <div>
                        <p><strong>总价: </strong><span style="color: #ff4d4f; font-weight: bold;">¥${order.price.toFixed(2)}</span></p>
                        <p><strong>状态: </strong><span class="order-status status-completed">已完成</span></p>
                    </div>
                </div>
                <button class="delete-btn">删除</button>
            `;
            
            orderList.appendChild(orderItem);
        });

        // 重新绑定事件监听器
        setupEventListeners();
    }

    // 设置事件监听器
    function setupEventListeners() {
        const orderItems = document.querySelectorAll('.order-item');
        
        // 1. 管理订单按钮点击事件
        manageBtn.addEventListener('click', function() {
            isManaging = !isManaging;
            
            // 切换按钮文字
            manageBtn.textContent = isManaging ? '完成管理' : '管理订单';
            
            // 切换所有订单的manage-mode类
            orderItems.forEach(item => {
                if (isManaging) {
                    item.classList.add('manage-mode');
                } else {
                    item.classList.remove('manage-mode');
                }
            });
        });

        // 2. 为每个订单的删除按钮添加点击事件
        orderItems.forEach(item => {
            const deleteBtn = item.querySelector('.delete-btn');
            
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                currentOrderToDelete = item;
                showModal();
            });
        });
    }

    // 3. 显示确认对话框
    function showModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // 4. 隐藏确认对话框
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        currentOrderToDelete = null;
    }

    // 5. 取消删除按钮事件
    cancelBtn.addEventListener('click', hideModal);

    // 6. 确认删除按钮事件
    confirmBtn.addEventListener('click', function() {
        if (currentOrderToDelete) {
            // 执行删除操作
            currentOrderToDelete.remove();
            
            // 检查是否还有订单
            if (document.querySelectorAll('.order-item').length === 0) {
                isManaging = false;
                manageBtn.textContent = '管理订单';
            }
            
            hideModal();
        }
    });

    // // 7. 点击模态框外部关闭
    // modal.addEventListener('click', function(e) {
    //     if (e.target === modal) {
    //         hideModal();
    //     }
    // });

    // // 8. 按ESC键关闭模态框
    // document.addEventListener('keydown', function(e) {
    //     if (e.key === 'Escape' && modal.style.display === 'flex') {
    //         hideModal();
    //     }
    // });
});