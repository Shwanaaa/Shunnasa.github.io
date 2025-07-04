document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const currentPage = window.location.pathname.split('/').pop();
    
    // 为所有导航链接移除 active 类
    document.querySelectorAll('.nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    
    // 为当前页面对应的链接添加 active 类
    document.querySelectorAll('.nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});