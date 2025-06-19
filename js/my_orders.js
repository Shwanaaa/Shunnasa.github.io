document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const manageBtn = document.getElementById('manageOrdersBtn');
    const orderItems = document.querySelectorAll('.order-item');
    const modal = document.getElementById('confirmationModal');
    const cancelBtn = document.getElementById('cancelDeleteBtn');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    // 状态变量
    let currentOrderToDelete = null;
    let isManaging = false;

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
            e.stopPropagation(); // 防止事件冒泡
            currentOrderToDelete = item; // 保存当前要删除的订单
            showModal(); // 显示确认对话框
        });
    });

    // 3. 显示确认对话框
    function showModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 4. 隐藏确认对话框
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复滚动
        currentOrderToDelete = null; // 清除当前要删除的订单
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
                // 如果没有订单了，退出管理模式
                isManaging = false;
                manageBtn.textContent = '管理订单';
            }
            
            hideModal();
            
            // 这里可以添加AJAX请求来同步服务器数据
            // deleteOrderFromServer(currentOrderToDelete.dataset.orderId);
        }
    });

    // 7. 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // 8. 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            hideModal();
        }
    });
});

// 模拟从服务器删除订单的函数
function deleteOrderFromServer(orderId) {
    console.log('正在删除订单:', orderId);
    // 实际项目中这里应该是AJAX请求
    // fetch(`/api/orders/${orderId}`, { method: 'DELETE' })
    //     .then(response => response.json())
    //     .then(data => console.log('删除成功', data))
    //     .catch(error => console.error('删除失败:', error));
}