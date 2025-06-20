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
const dishes = document.querySelectorAll(".dish-card");

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // 移除所有导航项的 active 类
    menuLinks.forEach((item) => item.classList.remove("active"));

    // 添加 active 类到当前点击的导航项
    link.classList.add("active");

    const category = link.dataset.category;

    if (category === "all") {
      dishes.forEach((dish) => (dish.style.display = "block"));
    } else {
      dishes.forEach((dish) => {
        if (dish.dataset.category === category) {
          dish.style.display = "block";
        } else {
          dish.style.display = "none";
        }
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // 更新用户模块显示
    updateUserInfo();
});

// 更新用户信息
async function updateUserInfo() {
    try {
        const response = await fetch("http://8.134.154.79:8088/meal/user/getUserInfo", {
            method: 'GET',
            headers: {
                "token": localStorage.getItem('token'),
                "Accept": "application/json"
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.code === 0 && result.data) {
                // 更新头部用户信息
                const userElement = document.querySelector('.user span');
                if (userElement) {
                    userElement.textContent = result.data.userName;
                }
                
                // 更新头像（如果有）
                const avatarElement = document.querySelector('.user img');
                if (avatarElement && result.data.avatarUrl) {
                    avatarElement.src = result.data.avatarUrl;
                }
            }
        }
    } catch (error) {
        console.error("更新用户信息失败:", error);
    }
}

// 确保页面加载时更新用户信息
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    updateUserInfo();
});