// 切换登录/注册表单
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const formContainer = document.getElementById('formContainer');

loginToggle.addEventListener('click', () => {
    formContainer.classList.remove('register-mode');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
});

registerToggle.addEventListener('click', () => {
    formContainer.classList.add('register-mode');
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
});

// 表单验证
document.getElementById('loginFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // 简单的验证
    if (username.trim() === '') {
        showError('loginUsernameError', '请输入用户名');
        isValid = false;
    } else {
        hideError('loginUsernameError');
    }
    
    if (password.trim() === '') {
        showError('loginPasswordError', '请输入密码');
        isValid = false;
    } else {
        hideError('loginPasswordError');
    }
    
    if (isValid) {
        // 在实际应用中，这里会发送AJAX请求
        alert('登录成功！');
        // 重置表单
        this.reset();
    }
});

document.getElementById('registerFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // 验证用户名
    if (username.trim().length < 4) {
        showError('registerUsernameError', '用户名至少需要4个字符');
        isValid = false;
    } else {
        hideError('registerUsernameError');
    }
    
    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('registerEmailError', '请输入有效的邮箱地址');
        isValid = false;
    } else {
        hideError('registerEmailError');
    }
    
    // 验证电话
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phone)) {
        showError('registerPhoneError', '请输入有效的电话号码');
        isValid = false;
    } else {
        hideError('registerPhoneError');
    }
    
    // 验证密码
    if (password.length < 6) {
        showError('registerPasswordError', '密码至少需要6个字符');
        isValid = false;
    } else {
        hideError('registerPasswordError');
    }
    
    // 验证确认密码
    if (password !== confirmPassword) {
        showError('registerConfirmPasswordError', '两次密码输入不一致');
        isValid = false;
    } else {
        hideError('registerConfirmPasswordError');
    }
    
    if (isValid) {
        // 在实际应用中，这里会发送AJAX请求
        alert('注册成功！欢迎使用美味订餐系统');
        // 重置表单
        this.reset();
        // 切换到登录表单
        formContainer.classList.remove('register-mode');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}
